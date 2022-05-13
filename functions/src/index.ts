import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// Init `admin` before importing these
import * as authTrigger from './auth/auth-trigger'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'

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
export const seeder = callableSeeder
