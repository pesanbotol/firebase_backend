import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Bottle, BottleGetResDTO } from '../interfaces'
import { BottleSchema, BottleCreateReqDTOSchema, BottleGetResDTOSchema } from '../schemas/BottleSchema'
import { IndexByGeocordReqDTOSchema, UserProfileSummaryGetSchema } from '../schemas'
import { typeClient } from '../typesense'
import * as path from 'path'
import {unflatten} from '../typesense/utils'
import {isDepictNudity} from '../ml/nudity'
import {MissionSchema} from '../schemas/MissionSchema'

/**
 * Create a new bottled message, either image or text
 * add addtional metadata and save it to database
 *
 * @param data check on BottleCreateReqDTO
 * @returns BottleGetResDTO
 */
export const createBottle = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can create message')
  const uid = ctx.auth.uid

  const { error: errorIn, value: dataIn } = BottleCreateReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  const currentTimeUTC = admin.firestore.Timestamp.now()

  const storage = admin.storage()

  /** Moving files uploaded from user uploaded dir to a secured dir */
  let _movedImagePath: string | undefined
  if (dataIn.contentImagePath !== undefined) {
    const fullFilePath = `userupload/${ctx.auth.uid}/${dataIn.contentImagePath}`
    const fileNameWExt = dataIn.contentImagePath

    // If a contentImagePath is provided, check if the path exists
    const fileExist = await storage.bucket().file(fullFilePath).exists()

    if (!fileExist[0]) {
      // The file path doesn't exist
      throw new functions.https.HttpsError('invalid-argument', "the contentImagePath you specified doesn't exist")
    } else {
      const fileMime = await storage.bucket().file(fullFilePath).getMetadata()
      const contentType = fileMime[0]['contentType']
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(contentType)) {
        throw new functions.https.HttpsError('invalid-argument', "image must be one of image/jpeg image/png or image/jpg")
      }

      // Check for nudity
      if (await isDepictNudity(fullFilePath)) {
        // Reject
        throw new functions.https.HttpsError('invalid-argument', "Nudity picture detected, post creation rejected")
      }

      const dest = `mediafiles/${ctx.auth.uid}/${fileNameWExt}`

      await storage.bucket().file(fullFilePath).move(dest)
      _movedImagePath = dest
    }
  }

  // Merge user generated data with additional metadata
  // Remove `contentImagePath` since we no longer use it
  const { contentImagePath, ...removedUnnecessaryUserSuppliedData } = dataIn

  // TODO: Use better js syntax, undefined
  const toCreate: Bottle = {
    ...removedUnnecessaryUserSuppliedData,
    createdAt: currentTimeUTC,
    uid,
  }
  if (_movedImagePath !== undefined) {
    const _p = path.parse(_movedImagePath)
    const fileNameWithoutExt =_p.name

    // Newer content image with thumbnail
    const biggerFilePath = `mediafiles/${uid}/${fileNameWithoutExt}_1080x1080.jpeg`
    const _ciThumb = admin.storage().bucket().file(`mediafiles/${uid}/${fileNameWithoutExt}_200x200.jpeg`)
    const _ciMain = admin.storage().bucket().file(biggerFilePath)
    // _ciMain.makePublic()
    // _ciThumb.makePublic()

    // Old content image path, BACKWARD COMPATIBILITY, use bigger version
    toCreate._contentImagePath = biggerFilePath
    // const _f = admin.storage().bucket().file(_movedImagePath)
    // await _f.makePublic()
    toCreate.contentImageUrl = admin.storage().bucket().file(biggerFilePath).publicUrl()

    toCreate.contentImage = {
      kind: 'image',
      mediaThumbnailUrl: _ciThumb.publicUrl(),
      mediaUrl: _ciMain.publicUrl(),
    }
  }

  const { error: errorTobeOut, value: dataTobeOut } = BottleSchema.validate(toCreate)
  if (errorTobeOut != null) throw new functions.https.HttpsError('unknown', "can't create the bottle due to internal unknown error", errorTobeOut)

  const db = admin.firestore()
  const res = await db.collection('bottles').add(dataTobeOut)
  // TODO: Error handling
  const createdDoc = (await res.get()).data()

  await db.runTransaction(async (tr) => {
    const userProfileRef = db.collection('users').doc(uid)
    const metaAggProfileRef = userProfileRef.collection('meta').doc('aggregator')
    const agg = (await tr.get(metaAggProfileRef)).data()
    const curPostCount: number = agg?.postCount

    tr.update(metaAggProfileRef, {
      postCount: curPostCount + 1
    })
  })

  db.collection('users').doc(uid).collection('meta').doc('aggregator')

  const { error: errorRes, value: dataRes } = BottleGetResDTOSchema.validate(createdDoc)
  if (errorRes != null) {
    functions.logger.warn('createBottle', errorRes, dataRes)
  }

  return {
    data: dataRes
  }
})

export const bottleById = functions.https.onCall(async (data, ctx) => {
  const id = data.id
  if (!id) throw new functions.https.HttpsError('invalid-argument', "you need to supply bottle's id")
  const _bottles = await admin.firestore().collection('bottles').get()
  return _bottles.docs.map((it) => it.data())
})

export const bottlesByUserUid = functions.https.onCall(async (data, ctx) => {
  const uid = data.uid
  if (!uid) throw new functions.https.HttpsError('invalid-argument', "you need to supply user's uid")
  const _bottles = await admin.firestore().collection('bottles').where("uid", "==", uid).get()
  return _bottles.docs.map((it) => it.data())
})

export const indexBottleByGeocord = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can list message')

  const { error: errorIn } = IndexByGeocordReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  // functions.logger.info(dataIn)

  //#region "Bottle index"
  // TODO: Create a root level schema validation, don't validate bottle manually
  const postRes = await typeClient.collections<BottleGetResDTO>('bottles').documents().search({
    q: '',
    query_by: 'contentText'
  })
  const postHit = postRes.hits ?? []
  const bottleRes = await Promise.all(postHit.map(async (it) => {
    // FIXME: This shit is really not efficient
    const userData = await (await admin.firestore().collection('users').doc(it.document.uid).get()).data()
    const {value: user, error: errorUserData} = UserProfileSummaryGetSchema.validate(userData, {stripUnknown: true})
    if (errorUserData) {
      functions.logger.warn(errorUserData)
    }

    const queryUnflatten = unflatten(it.document)
    let {value: bottleUnflatten, error: errorBottle} = BottleGetResDTOSchema.validate(queryUnflatten)
    if (errorBottle) {
      functions.logger.warn("indexBottleByGeocord-error", errorBottle)
    }

    // TODO: Fixme, this shouldn't be added manually
    bottleUnflatten!['createdAt'] = queryUnflatten.createdAt;

    return {
      ...bottleUnflatten,
      user
    }
  }))
  //#endregion

  //#region "Mission Index"
  const missionRes = await typeClient.collections<BottleGetResDTO>('missions').documents().search({
    q: '',
    query_by: 'description',
    filter_by: 'enable:=true'
  })
  const missionsHit = missionRes.hits ?? []
  const missionsRes = await Promise.all(missionsHit.map(async (it) => {
    const {value, error} = MissionSchema.validate(it.document, {stripUnknown: true})
    if (error) {
      functions.logger.warn("Mission index error", error)
    }

    return {
      ...value,
      createdAt: it.document.createdAt
    }
  }))
  //#endregion

  const results = {
    bottle: bottleRes,
    missions: missionsRes,
    trend: [],
    bottleRecommended: []
  }

  // console.log('AA', JSON.stringify(results))

  return {
    data: results
  }
})
