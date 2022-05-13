import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase 3!')
})

import * as authTrigger from './auth/auth-trigger'
export const auth = {
  authTrigger
}

import * as callableBottle from './bottle/callable-bottle'
export const bottle = {
  callableBottle
}