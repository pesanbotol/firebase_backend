import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserProfile } from '../interfaces/User'

/**
 * When a user deleted its account, its profile will also be deleted
 * but! we have no endpoint to delete account yet, so, this will never be called
 * we definitely should think more about this
 */
export const deleteProfile = functions.auth.user().onDelete((user) => {
  // const currentTime = Date.now();
  const db = admin.firestore()
  void db.collection('users').doc(user.uid).delete()
  functions.logger.info(`Deleted user with id ${user.uid}`)
})

/**
 * When a new user registered, create a profile account
 */
export const createProfile = functions.auth.user().onCreate((user) => {
  const db = admin.firestore()
  const currentTime = new Date()

  const newProfile: UserProfile = {
    registeredAt: currentTime,
    description: 'halo'
  }
  void db.collection('users').doc(user.uid).set(newProfile)
  functions.logger.info('Eyooo')
})
