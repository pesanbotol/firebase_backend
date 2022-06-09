import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as authsTrigger from './auth'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'
import {onFirestoreTriggerBackfillIndex} from './typesense/backfillToTypesenseFromFirestore'
import {onWriteUsersUpdateTypesenseIndex, onWriteMissionsUpdateTypesenseIndex, onWriteBottlesUpdateTypesenseIndex} from './typesense/indexToTypesenseOnFirestoreWrite'
import * as typesenseCollectionsTrigger from './typesense/collectionSchemas'
import * as searchsTrigger from './search/search-callable'
// import * as storagesTrigger from './storage/trigger'

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
  onWriteUsersUpdateTypesenseIndex,
  onWriteMissionsUpdateTypesenseIndex,
  onWriteBottlesUpdateTypesenseIndex,
  typesenseCollectionsTrigger
}
export const seeder = callableSeeder
export const searchTrigger = searchsTrigger
// export const storageTrigger = storagesTrigger