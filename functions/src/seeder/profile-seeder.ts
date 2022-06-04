import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {UserProfile} from '../interfaces/User';
import {faker} from '@faker-js/faker';
import {UserProfileSchema} from '../schemas';

/**
 * Seed profile in `firestore`
 */
export const seedProfile = functions.https.onCall((data, ctx) => {
  const db = admin.firestore()

  functions.logger.info('Mulai seeding user profile');

  for (let i = 0; i < 10; i++) {
    const user: UserProfile = {
      registeredAt: new Date(),
      description: faker.random.words(5),
      username: faker.random.words(1),
    }

    const {error, value} = UserProfileSchema.validate(user);
    if (error == null) {
      db.collection('users').add(value);
    }
  }

  functions.logger.info('Selesai seeding user profile');
});