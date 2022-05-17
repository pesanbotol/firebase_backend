import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as authsTrigger from './auth'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'
import { onFirestoreTriggerBackfillIndex } from './typesense/backfillToTypesenseFromFirestore'
import { onWriteUpdateTypesenseIndex } from './typesense/indexToTypesenseOnFirestoreWrite'
import * as typesenseCollectionsTrigger from './typesense/collectionSchemas'

admin.initializeApp()

export const helloWorld = functions.https.onCall((data, context) => {
  functions.logger.info('I am healthy')
  return {
    ok: true
  }
})

export const authTrigger = authsTrigger
export const bottle = {
  callableBottle
}
export const typesense = {
  onFirestoreTriggerBackfillIndex,
  onWriteUpdateTypesenseIndex,
  typesenseCollectionsTrigger
}
export const seeder = callableSeeder
