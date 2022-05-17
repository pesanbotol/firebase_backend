import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as authsTrigger from './auth'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'
import { onFirestoreTriggerBackfillIndex } from './typesense/backfillToTypesenseFromFirestore'
import { onWriteUpdateTypesenseIndex } from './typesense/indexToTypesenseOnFirestoreWrite'
import * as typesenseCollectionsTrigger from './typesense/collectionSchemas'

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true, env: process.env })
  response.send('Hello from Firebase 3! ')
})

export const auth = authsTrigger
export const bottle = {
  callableBottle
}
export const typesense = {
  onFirestoreTriggerBackfillIndex,
  onWriteUpdateTypesenseIndex,
  typesenseCollectionsTrigger
}
export const seeder = callableSeeder
