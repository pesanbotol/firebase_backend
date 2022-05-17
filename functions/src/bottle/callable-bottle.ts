import * as functions from 'firebase-functions'
import { Bottle } from '../interfaces'
import { BottleSchema, BottleCreateDTOSchema } from '../schemas/BottleSchema'

/**
 * Create a new bottled message, either image or text
 * add addtional metadata and save it to database
 *
 * @param data check on BottleCreateDOI
 */
export const createBottle = functions.https.onCall((data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can create message')

  const { error: errorIn, value: dataIn } = BottleCreateDTOSchema.validate(data)
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

  return { x: { errorTobeOut, dataTobeOut } }
})
