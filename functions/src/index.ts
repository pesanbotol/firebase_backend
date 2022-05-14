import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as authTrigger from './auth/auth-trigger'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'
import { onFirestoreTriggerBackfillIndex } from './typesense/backfillToTypesenseFromFirestore'
import { onWriteUpdateTypesenseIndex } from './typesense/indexToTypesenseOnFirestoreWrite'

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase 3!')
})

export const auth = {
  authTrigger
}
export const bottle = {
  callableBottle
}
export const typesense = {
  onFirestoreTriggerBackfillIndex,
  onWriteUpdateTypesenseIndex,
}
export const seeder = callableSeeder
