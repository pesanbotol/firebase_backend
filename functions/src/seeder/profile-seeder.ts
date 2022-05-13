import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

/**
 * Seed profile in `firestore`
 */
export const seedProfile = functions.https.onCall((data, ctx) => {
  functions.logger.info('Mulai seeding user profile')
  void db.collection('users').doc('random uid disini').set({
    // isi profile si user disini
  })

  functions.logger.info('Seledai seeding user profile')
  return true
})
