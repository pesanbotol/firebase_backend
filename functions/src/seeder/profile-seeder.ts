import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// import {UserCreateProfile} from '../interfaces/User';
import {faker} from '@faker-js/faker';
// import {UserProfileSchema} from '../schemas';

/**
 * Seed profile in `firestore`
 */
export const seedProfile = functions.https.onCall((data, ctx) => {
  // const db = admin.firestore()

  functions.logger.info('Mulai seeding user profile');

  for (let i = 0; i < 20; i++) {
    // const user: UserCreateProfile = {
    //   registeredAt: new Date(),
    //   description: faker.random.words(5),
    //   username: faker.random.words(1),
    //   displayName: faker.random.words(2),
    // }
    const email = faker.internet.email()
    const password = "password"

    // const {error, value} = UserProfileSchema.validate(user);
    // if (error == null) {
      // db.collection('users').add(value);
      admin.auth().createUser({email, password})
    // }
  }

  functions.logger.info('Selesai seeding user profile');
});