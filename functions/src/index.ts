import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as authTrigger from './auth/auth-trigger'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'
// import * as typesenseTrigger from './typesense/backfillToTypesenseFromFirestore'
import {typeClient} from './typesense'

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase 3!')
})

export const hx = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send(typeClient.collections('users').documents().search({q: '', query_by: 'description'}))
})

export const auth = {
  authTrigger
}
export const bottle = {
  callableBottle
}
import {onFirestoreTriggerBackfillIndex , ey} from './typesense/backfillToTypesenseFromFirestore'
import {onWriteUpdateTypesenseIndex} from './typesense/indexToTypesenseOnFirestoreWrite'
export const typesense = {
  onFirestoreTriggerBackfillIndex,
  onWriteUpdateTypesenseIndex,
  ey
}
export const seeder = callableSeeder
