import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {UserProfile} from '../interfaces/User'
import {UserProfileSchema} from '../schemas/UserSchema'

/**
 * Seed profile in `firestore`
 */
export const seedProfile = functions.https.onCall((data, ctx) => {
  // const db = admin.firestore()

  // functions.logger.info('Mulai seeding user profile')
  // // for (let index = 0; index < 100.length; index++) {
  // //   const element = 100[index];

  // // }

  // const user: UserProfile = {
  //   registeredAt: new Date(),
  //   description: "dsaofsirh",
  //   displayName: "sdaks",
  //   username: "oeiujr"
  // }
  // var {value, error} = UserProfileSchema.validate(user);
  // if (error) {
  //   // ada error
  //   console.log(error);
    
  // }
  // void db.collection('users').doc('iejhufvghi13ew').set(user)

  // functions.logger.info('Seledai seeding user profile')
  // return true
})
