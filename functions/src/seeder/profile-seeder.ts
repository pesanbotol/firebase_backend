import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {faker} from '@faker-js/faker';

function getRandomFloat(min: number, max: number, decimals: number): number {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

/**
 * Seed profile in `firestore`
 */
export const seedProfile = functions.https.onCall(async (data, ctx) => {
  const db = admin.firestore()

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
    const user = await admin.auth().createUser({email, password})
    db.collection("users").doc(user.uid).set({
      username: faker.internet.userName(),
      displayName: faker.name.firstName() + " " + faker.name.lastName()
    })

    const createPostNum = Math.floor(Math.random() * 5)
    for (let i = 0; i < createPostNum; i++) {
      await db.collection('bottles').add({
        kind: "text",
        contentText: faker.lorem.words(6),
        createdAt: faker.date.between(new Date(2022, 5, 11, 0, 0, 0), new Date(2022, 5, 13, 0, 0, 0)),
        geo: [
          getRandomFloat(6.0, -11.0, 6),
          getRandomFloat(95.0, 141, 6),
        ]
      })
    }
    // }
  }

  functions.logger.info('Selesai seeding user profile');
});