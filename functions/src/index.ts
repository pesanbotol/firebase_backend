import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import {JobSchema} from "./schemas/IndexByGeoposSchema";
admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase 3!");
});

export const createProfile = functions.auth.user().onCreate((user) => {
  const currentTime = Date.now();
  db.collection("users").doc(user.uid).set({
    registeredAt: currentTime,
  });
  functions.logger.info("Eyooo");
});

// exports.addMessage = functions.https.onCall((data) => {
//   const res = JobSchema.validate(data);
//   return res;
// });

export const deleteProfile = functions.auth.user().onDelete((user) => {
  // const currentTime = Date.now();
  db.collection("users").doc(user.uid).delete();
  functions.logger.info(`Deleted user with id ${user.uid}`);
});
