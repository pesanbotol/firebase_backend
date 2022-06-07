import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import * as authsTrigger from './auth'
import * as callableBottle from './bottle/callable-bottle'
import * as callableSeeder from './seeder/index'
import {onFirestoreTriggerBackfillIndex} from './typesense/backfillToTypesenseFromFirestore'
import {onWriteUsersUpdateTypesenseIndex, onWriteBottlesUpdateTypesenseIndex} from './typesense/indexToTypesenseOnFirestoreWrite'
import * as typesenseCollectionsTrigger from './typesense/collectionSchemas'
import * as searchsTrigger from './search/search-callable'
import axios from 'axios'
import * as FormData from 'form-data'
import * as fs from 'fs'
import {Readable} from 'stream'

admin.initializeApp()

export const helloWorld = functions.https.onCall((data, context) => {
  functions.logger.info('I am healthy')
  return {
    ok: true
  }
})

export const authTrigger = authsTrigger
export const bottle = {
  callableBottle
}
export const typesense = {
  onFirestoreTriggerBackfillIndex,
  onWriteUsersUpdateTypesenseIndex,
  onWriteBottlesUpdateTypesenseIndex,
  typesenseCollectionsTrigger
}
export const seeder = callableSeeder
export const searchTrigger = searchsTrigger


// /**
//  * Only allow this in development
//  */
export const sendCloudStorage2ML = functions.https.onCall(async (dataIn, context) => {
  if (process.env.NODE_ENV != 'development') {
    throw new functions.https.HttpsError('unknown', "only in development")
  }

  const toDetect = await admin.storage().bucket().file('mediafiles/7Ppj332zk9fEn845lqhJtib1fEHL/blank_1080x1080.jpeg')
  const st = await toDetect.download()

  console.log({st: st[0]});
  

  // const st = fs.createReadStream("/Users/hariangr/Downloads/Indonesian_Landmark/Train/8/img1227.jpg")
  // console.log({st});
  const x = Readable.from(st[0])

  

  const data = new FormData();
  // data.append('file', fs.createReadStream('/Users/hariangr/Documents/MyFiles/Developer/Bangkit/ml/notebook/samples/Asli NSFW (2).png'));
  data.append('file', st, "entah.jpg")

  var config = {
    method: 'post',
    url: 'http://127.0.0.1:8080/nudity',
    headers: {
      ...data.getHeaders()
    },
    data: data
  };

  axios(config)
    .then(function (response: any) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
      console.log(error);
    });

  return {
    ok: true,
    // res: a.data,
  }
})
