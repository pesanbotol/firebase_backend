import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

/**
 * Untuk memastikan username tidak duplicate
 * Sementara hapus dulu karena ribet di mvp
 */
export const onProfileWrite = functions.firestore.document('users/{userId}')
  .onWrite(async (snapshot, context) => {
    const db = admin.firestore()

    if (snapshot.before.data() == null) {
      // Create
      // When a new user registered, a new profile will be created
      // and the username will be marked as unavailable in pool of username

      /**
       * NOPE, username would be added in `auth on ureate user`
       */

      // const userProfileRef = db.collection('users').doc(context.params.userId)
      // void db.collection('usernames').doc(snapshot.after.get('username')).set({
      //   uid: userProfileRef
      // })
    } else if (snapshot.after.data() == null) {
      // Delete
      // When a user profile's deleted, their username will be
      // put back to the username pool
      await db.collection('usernames').doc(snapshot.before.get('username')).delete()
    } else {
      // Update
      const oldUsername: string = snapshot.before.get('username')
      const newUsername: string = snapshot.after.get('username')
      const uid: string = context.params.userId

      functions.logger.info(`Updating ${oldUsername} to ${newUsername}`)

      await db.runTransaction(async (tr) => {
        // Open the old username for grab
        tr.delete(db.collection('usernames').doc(oldUsername))

        // Flag the new username as taken
        tr.create(db.collection('usernames').doc(newUsername), {
          uid
        })
      })
    }
  })
