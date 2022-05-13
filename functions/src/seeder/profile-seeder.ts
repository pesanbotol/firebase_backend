import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

/**
 * Seed profile in `firestore`
 */
export const seedProfile = functions.https.onCall((data, ctx) => {
  const db = admin.firestore()

  functions.logger.info('Mulai seeding user profile')
  void db.collection('users').doc('random uid disini').set({
    // isi profile si user disini
  })

  functions.logger.info('Seledai seeding user profile')
  return true
})
