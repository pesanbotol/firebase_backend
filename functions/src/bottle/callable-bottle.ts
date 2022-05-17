import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Bottle } from '../interfaces'
import { BottleSchema, BottleGetResDTOSchema, BottleCreateReqDTOSchema } from '../schemas/BottleSchema'

/**
 * Create a new bottled message, either image or text
 * add addtional metadata and save it to database
 *
 * @param data check on BottleCreateReqDTO
 * @returns BottleGetResDTO
 */
export const createBottle = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can create message')

  const { error: errorIn, value: dataIn } = BottleCreateReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  const currentTimeUTC = new Date()
  const uid = ctx.auth.uid

  // Merge user generated data with additional metadata
  const toCreate: Bottle = {
    ...dataIn,
    createdAt: currentTimeUTC,
    uid
  }

  const { error: errorTobeOut, value: dataTobeOut } = BottleSchema.validate(toCreate)
  if (errorTobeOut != null) throw new functions.https.HttpsError('unknown', "can't create the bottle due to internal unknown error", errorIn)

  const db = admin.firestore()
  const res = await db.collection('bottles').add(dataTobeOut);
  const createdDoc = (await res.get()).data()

  const {error: errorRes, value: dataRes} = BottleGetResDTOSchema.validate(createdDoc)
  if (errorRes) {
    functions.logger.warn('createBottle', errorRes, dataRes)
  }

  functions.logger.info(admin.firestore.FieldValue.serverTimestamp())

  return {
    data: dataRes,
  };
})
