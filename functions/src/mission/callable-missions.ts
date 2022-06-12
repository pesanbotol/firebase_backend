import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {MissionSubmitDTOSchema} from '../schemas/MissionSchema'
import {Mission} from '../interfaces/Mission';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import * as turf from '@turf/helpers'
import {firestore} from 'firebase-admin';

export const submitMission = functions.https.onCall(async (data, ctx) => {
  // if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can submit mission')
  // const uid = ctx.auth.uid

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

  // console.log({mission, turfGeofence, turfUserCord});

  if (mission.kind == 'geofence') {
    if (!turfUserCord && !turfGeofence) {
      throw new functions.https.HttpsError('invalid-argument', "Mission of type 'geofence' require you to send current user location")
    }
    return booleanPointInPolygon(turfUserCord!, turfGeofence!)
  } else if (mission.kind == 'geofence+picture') {
    if (!turfUserCord && !turfGeofence) {
      throw new functions.https.HttpsError('invalid-argument', "Mission of type 'geofence+any' require you to send current user location")
    }

  } else {
    functions.logger.error("Mission isn't supported", mission)
    throw new functions.https.HttpsError('internal', "This mission is invalid", mission)
  }
  return;
});