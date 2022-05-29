import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {UserUpdateProfileSchema} from '../schemas'

export const myProfile = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can see their profile')
  const db = admin.firestore()

  const uid = ctx.auth.uid;
  const userProfile = await (await db.collection("users").doc(uid).get()).data()
  const aggregator = await (await db.collection("users").doc(uid).collection('meta').doc('aggregator').get()).data()
  const socials = await (await db.collection("users").doc(uid).collection('meta').doc('socials').get()).data()
  
  const results = {
    ...userProfile,
    meta: {
      aggregator,
      socials,
    }
  }

  return {
    data: results
  }
})

export const updateProfile = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can see their profile')
  const db = admin.firestore()

  const uid = ctx.auth.uid;
  const userRef = db.collection("users").doc(uid)

  const {value: dataIn, error: errorIn} = UserUpdateProfileSchema.validate(data);
  if (errorIn) {
    throw new functions.https.HttpsError('invalid-argument', JSON.stringify(errorIn))
  }

  // TODO: Add type
  const socialUpdate: any = {
    facebook: dataIn.facebook,
    twitter: dataIn.twitter,
    instagram: dataIn.instagram,
  }

  // TODO: Add type
  const profileUpdate: any = {
    displayName: dataIn.displayName,
    description: dataIn.description,
  }

  // Remove undefined from object
  Object.keys(socialUpdate).forEach(key => socialUpdate[key] === undefined && delete socialUpdate[key])
  Object.keys(profileUpdate).forEach(key => profileUpdate[key] === undefined && delete profileUpdate[key])

  try {
    void await db.runTransaction(async (tr) => {
      if (Object.keys(profileUpdate).length > 0) 
        tr.set(userRef, profileUpdate, {merge: true})
      
      if (Object.keys(socialUpdate).length > 0) 
        tr.set(userRef.collection('meta').doc('socials'), socialUpdate, {merge: true})
    })
    
    return {
      data: 'ok'
    }
  } catch (error) {
    functions.logger.error(error)
    throw new functions.https.HttpsError('internal', "failed to update social and profile")
  }
})
