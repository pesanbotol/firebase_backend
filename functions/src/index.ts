import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase 3!");
});

import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
export const createUserProfile = functions.auth.user().onCreate((user) => {
  const currentTime = Date.now();
  db.collection("users").doc(user.uid).set({
    registeredAt: currentTime,
  });
  functions.logger.info("Eyooo");
});

