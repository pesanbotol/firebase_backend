import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { BottleCreateDOISchema, BottleSchema } from './schemas/BottleSchema'
import { Bottle } from './interfaces'
admin.initializeApp()
const db = admin.firestore()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase 3!')
})

export const createProfile = functions.auth.user().onCreate((user) => {
  const currentTime = Date.now()
  void db.collection('users').doc(user.uid).set({
    registeredAt: currentTime
  })
  functions.logger.info('Eyooo')
})

/**
 * Create a new bottled message, either image or text
 * add addtional metadata and save it to database
 *
 * @param data check on BottleCreateDOI
 */
export const createBottle = functions.https.onCall((data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can create message')

  const { error: errorIn, value: dataIn } = BottleCreateDOISchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  const currentTimeUTC = new Date()
  const uid = ctx.auth.uid

  // Merge user generated data with additional metadata
  const toCreate: Bottle = {
    ...dataIn,
    created_at: currentTimeUTC,
    uid
  }

  const { error: errorTobeOut, value: dataTobeOut } = BottleSchema.validate(toCreate)
  if (errorTobeOut != null) throw new functions.https.HttpsError('unknown', "can't create the bottle due to internal unknown error", errorIn)

  return { x: { errorTobeOut, dataTobeOut } }
})

export const deleteProfile = functions.auth.user().onDelete((user) => {
  // const currentTime = Date.now();
  void db.collection('users').doc(user.uid).delete()
  functions.logger.info(`Deleted user with id ${user.uid}`)
})
