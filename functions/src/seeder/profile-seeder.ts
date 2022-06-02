//import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserProfile } from '../interfaces/User';
//import { UserProfileSchema } from '../schemas/UserSchema'
// import { UpdateBuilder } from 'firebase-functions/v1/remoteConfig'
import { faker } from '@faker-js/faker';



const serviceAccount = require("c:/PROJECTS/pesanbotol/firebase_backend/functions/semiotic-joy-349807-firebase-adminsdk-vfw4s-c27b7cda42.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://semiotic-joy-349807-default-rtdb.asia-southeast1.firebasedatabase.app"
});

/**
 * Seed profile in `firestore`
 */
//export const seedProfile = functions.https.onCall((data, ctx) => {
  const db = admin.firestore()

//functions.logger.info('Mulai seeding user profile');
   
   // for (let index = 0; index < 100; index++) {
   // const element = 100[index];

 // users data
   const users: UserProfile = {
     registeredAt: new Date(),
     description: faker.random.words(5),
     username: faker.random.words(1),
   }

  //error validation
  function validate(users: UserProfile): string {
    if (!users.username){
      return 'username tidak boleh kosong'
    }
    if (!users.description){
      return 'description tidak boleh kosong'
    }

    return '';
  }

  const userValidate = validate(users);
  

  if (userValidate == ''){

    db.collection('users').doc(faker.datatype.uuid()).set(users);

    //const docUser = db.collection("users").get();
    //void db.collection('usernames').doc(users.username).set(docUser)
    
    console.log('data user berhasil ditambahkan')
  } else {
    console.error(userValidate);
  }

 // users.importDocuments(admin).then(() => {
 //   console.log("Successfully imported documents.");
 // });

//functions.logger.info('Selesai seeding user profile');

