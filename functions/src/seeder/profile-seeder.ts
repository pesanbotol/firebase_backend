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
    const email = faker.internet.email()
    const password = "password"

    const user = await admin.auth().createUser({email, password})
    db.collection("users").doc(user.uid).set({
      username: faker.internet.userName(),
      displayName: faker.name.firstName() + " " + faker.name.lastName()
    })

    const createPostNum = Math.floor(Math.random() * 2)
    for (let i = 0; i < createPostNum; i++) {
      await db.collection('bottles').add({
        kind: "text",
        contentText: faker.lorem.words(6),
        createdAt: faker.date.between(new Date(2022, 5, 11, 0, 0, 0), new Date(2022, 5, 13, 0, 0, 0)),
        uid: user.uid,
        geo: [
          getRandomFloat(6.0, -11.0, 6),
          getRandomFloat(95.0, 141, 6),
        ]
      })
    }
  }

  functions.logger.info('Selesai seeding user profile');
});