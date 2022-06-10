import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {MissionSubmitDTOSchema} from '../schemas/MissionSchema'
import {Mission, MissionSubmission} from '../interfaces/Mission';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import * as turf from '@turf/helpers'
import {firestore} from 'firebase-admin';
import path = require('path');
import {IMedia} from '../interfaces';
import {getLandmarkArray} from '../ml/landmark';

export const submitMission = functions.https.onCall(async (data, ctx) => {
  // if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can submit mission')
  // const uid = ctx.auth.uid
  const uid = "7Ppj332zk9fEn845lqhJtib1fEHL"

  const {error: errorIn, value: dataIn} = MissionSubmitDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  // const currentTimeUTC = admin.firestore.Timestamp.now()

  // const {missionId, geo: currentLocation, imagePath} = dataIn

  const _missionGet = await (await admin.firestore().collection('missions').doc(dataIn.missionId).get()).data()
  const mission = _missionGet as Mission

  // FIXME: validate mission please, use joi.alternative for geoSchema
  // const {value: mission, error: missionError} = MissionSchema.validate(_missionGet)

  // if (missionError != null) {
  //   functions.logger.error("Mission wrong shape, submit", missionError)
  //   throw new functions.https.HttpsError('internal', "Something is wrong with the mission, try again later", missionError)
  // }


  // WARNING: TURF assume cordinate in [lon, lat] but we asssume it is in [lat, lon]
  // annoying problem, no convention

  // const geofenceTurf = turf.
  let turfUserCord: any
  if (dataIn.geo) {
    turfUserCord = turf.point([dataIn.geo[1], dataIn.geo[0]])
  }

  let turfGeofence: any;
  if (mission.geofence) {
    turfGeofence = turf.polygon([
      mission.geofence?.map(it => {
        const x=it as unknown as firestore.GeoPoint
        return [x.longitude, x.latitude]
      })
    ])
  }

  let fulfilled = false;
  let imageAdded: IMedia | undefined;
  if (mission.kind == 'geofence') {
    if (!turfUserCord && !turfGeofence) throw new functions.https.HttpsError('invalid-argument', "Mission of type 'geofence' require you to send current user location")
    const within = booleanPointInPolygon(turfUserCord!, turfGeofence!)
    if (within) fulfilled = true




  } else if (mission.kind == 'geofence+picture') {
    const CHECK_TOP_N = 3

    if (!turfUserCord && !turfGeofence) throw new functions.https.HttpsError('invalid-argument', "Mission of type 'geofence+any' require you to send current user location")
    if (!dataIn.imagePath)  throw new functions.https.HttpsError('invalid-argument', "Mission of type 'geofence+picture' require you to send an image")
    if (mission._class_id == undefined || mission._class_id == null)   throw new functions.https.HttpsError('internal', "mission need a _class_id argument")

    const fullFilePath = `userupload/${uid}/${dataIn.imagePath}`
    const fileExist = await admin.storage().bucket().file(fullFilePath).exists()
    if (!fileExist[0]) throw new functions.https.HttpsError('invalid-argument', "image you sent not exist")

    const fileMime = await admin.storage().bucket().file(fullFilePath).getMetadata()
    const contentType = fileMime[0]['contentType']
    
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(contentType)) {
      throw new functions.https.HttpsError('invalid-argument', "image must be one of image/jpeg image/png or image/jpg")
    }

    const dest = `mediafiles/${uid}/${dataIn.imagePath}`
    await admin.storage().bucket().file(fullFilePath).move(dest)

    const _p = path.parse(dest)
    const fileNameWithoutExt =_p.name

    // Newer content image with thumbnail
    const biggerFilePath = `mediafiles/${uid}/${fileNameWithoutExt}_1080x1080.jpeg`
    const _ciThumb = admin.storage().bucket().file(`mediafiles/${uid}/${fileNameWithoutExt}_200x200.jpeg`)
    const _ciMain = admin.storage().bucket().file(biggerFilePath)

    imageAdded = {
      kind: 'image',
      mediaThumbnailUrl: _ciThumb.publicUrl(),
      mediaUrl: _ciMain.publicUrl(),
    }


    const lmArray = await getLandmarkArray(biggerFilePath)
    if (!lmArray) throw new functions.https.HttpsError('internal', "failed connecting to landmark model")
    let found = false
    for (let i = 0; i < CHECK_TOP_N; i++) {
      if (lmArray[i].id == mission._class_id) {
        found = true
      }
    }
    if (!found) {
      throw new functions.https.HttpsError('invalid-argument', "your image doesn't indicate you're at the correct location")
    }
    
    const within = booleanPointInPolygon(turfUserCord!, turfGeofence!)
    if (within) fulfilled = true
  } else {
    functions.logger.error("Mission isn't supported", mission)
    throw new functions.https.HttpsError('internal', "This mission is invalid", mission)
  }

  if (fulfilled) {
    const submissionSave: MissionSubmission = {
      missionId: dataIn!.missionId,
      rewarded: [mission.reward],
      submittedAt: firestore.Timestamp.now(),
    }
    if (dataIn!.geo) submissionSave.geo = dataIn!.geo
    if (dataIn!.imagePath) submissionSave._imagePath = dataIn!.imagePath
    if (imageAdded) submissionSave.image = imageAdded
    await admin.firestore().collection("users").doc(uid).collection("badges").doc(dataIn!.missionId).set(submissionSave)
    return submissionSave
  } else {
    throw new functions.https.HttpsError('cancelled', "mission not fulfilled")
  }
});