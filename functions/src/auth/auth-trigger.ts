import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

export const deleteProfile = functions.auth.user().onDelete((user) => {
  // const currentTime = Date.now();
  void db.collection('users').doc(user.uid).delete()
  functions.logger.info(`Deleted user with id ${user.uid}`)
})

export const createProfile = functions.auth.user().onCreate((user) => {
  const currentTime = Date.now()
  void db.collection('users').doc(user.uid).set({
    registeredAt: currentTime
  })
  functions.logger.info('Eyooo')
})
