import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {MissionSchema, MissionSubmissionSchema, MissionSubmitDTOSchema} from '../schemas/MissionSchema'


export const submitMission = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can submit mission')
  const uid = ctx.auth.uid

  const {error: errorIn, value: dataIn} = MissionSubmitDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  const currentTimeUTC = admin.firestore.Timestamp.now()

  // const {missionId, geo: currentLocation, imagePath} = dataIn

  const _missionGet = await admin.firestore().collection('missions').doc(dataIn.missionId).get()
  const {value: mission, error: missionError} = MissionSchema.validate(_missionGet)

  if (missionError != null) {
    functions.logger.error("Mission wrong shape, submit", missionError)
    throw new functions.https.HttpsError('internal', "Something is wrong with the mission, try again later", missionError)
  }

  if (mission.kind == 'geofence') {

  } else if (mission.kind == 'geofence+picture') {

  } else {
    functions.logger.error("Mission isn't supported", mission)
    throw new functions.https.HttpsError('internal', "This mission is invalid", missionError)
  }
});