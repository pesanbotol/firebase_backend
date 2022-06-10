import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserProfileSchema, UserUpdateProfileSchema } from '../schemas'

const _getProfileByUid = async (uid: string) => {
  const db = admin.firestore()

  const userProfile = await (await db.collection('users').doc(uid).get()).data()
  if (!userProfile) return null

  const aggregator = await (await db.collection('users').doc(uid).collection('meta').doc('aggregator').get()).data()
  const socials = await (await db.collection('users').doc(uid).collection('meta').doc('socials').get()).data()

  const missions_get = await (await db.collection('users').doc(uid).collection('badges').get())
  const missions = missions_get.docs.map((it) => it.data())

  const badges = missions.map((it) => it.rewarded[0])

  const _tobe = {
    ...userProfile,
    meta: {
      aggregator,
      socials,
      missions,
      badges,
    }
  }

  const {value, error} = UserProfileSchema.validate(_tobe)
  if (error) {
    functions.logger.warn(error)
  }
  return value
}

export const myProfile = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can see their profile')

  const uid = ctx.auth.uid
  const profile = await _getProfileByUid(uid)

  return {
    data: profile
  }
})

export const profileByUid = functions.https.onCall(async (data, ctx) => {
  const uid = data.uid
  if (!uid) throw new functions.https.HttpsError('invalid-argument', 'you need to supply uid')
  
  const profile = await _getProfileByUid(uid)

  return {
    data: profile
  }
})

export const updateProfile = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can see their profile')
  const db = admin.firestore()

  const uid = ctx.auth.uid
  const userRef = db.collection('users').doc(uid)

  const { value: dataIn, error: errorIn } = UserUpdateProfileSchema.validate(data)
  if (errorIn != null) {
    throw new functions.https.HttpsError('invalid-argument', JSON.stringify(errorIn))
  }

  // TODO: Add type
  const socialUpdate: any = {
    facebook: dataIn.facebook,
    twitter: dataIn.twitter,
    instagram: dataIn.instagram
  }

  // TODO: Add type
  const profileUpdate: any = {
    displayName: dataIn.displayName,
    description: dataIn.description
  }

  // Remove undefined from object
  Object.keys(socialUpdate).forEach(key => socialUpdate[key] === undefined && delete socialUpdate[key]) // eslint-disable-line 
  Object.keys(profileUpdate).forEach(key => profileUpdate[key] === undefined && delete profileUpdate[key]) // eslint-disable-line 

  try {
    void await db.runTransaction(async (tr) => {
      if (Object.keys(profileUpdate).length > 0) { tr.set(userRef, profileUpdate, { merge: true }) }

      if (Object.keys(socialUpdate).length > 0) { tr.set(userRef.collection('meta').doc('socials'), socialUpdate, { merge: true }) }
    })

    return {
      data: 'ok'
    }
  } catch (error) {
    functions.logger.error(error)
    throw new functions.https.HttpsError('internal', 'failed to update social and profile')
  }
})
