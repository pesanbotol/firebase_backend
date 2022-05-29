import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Bottle, BottleGetResDTO } from '../interfaces'
import { BottleSchema, BottleCreateReqDTOSchema, BottleGetResDTOSchema } from '../schemas/BottleSchema'
import { IndexByGeocordReqDTOSchema } from '../schemas'
import { typeClient } from '../typesense'

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
    uid
  }
  if (_movedImagePath !== undefined) {
    toCreate._contentImagePath = _movedImagePath
    const _f = admin.storage().bucket().file(_movedImagePath)
    await _f.makePublic()
    toCreate.contentImageUrl = admin.storage().bucket().file(_movedImagePath).publicUrl()
  }

  const { error: errorTobeOut, value: dataTobeOut } = BottleSchema.validate(toCreate)
  if (errorTobeOut != null) throw new functions.https.HttpsError('unknown', "can't create the bottle due to internal unknown error", errorIn)

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

export const indexBottleByGeocord = functions.https.onCall(async (data, ctx) => {
  if (ctx.auth == null) throw new functions.https.HttpsError('unauthenticated', 'only authenticated user can list message')

  const { error: errorIn, value: dataIn } = IndexByGeocordReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  functions.logger.info(dataIn)

  const postRes = await typeClient.collections<BottleGetResDTO>('bottles').documents().search({
    q: '',
    query_by: 'contentText'
  })
  const postHit = postRes.hits ?? []

  // TODO: Create a root level schema validation, don't validate bottle manually
  const bottleRes = await Promise.all(postHit.map(async (it) => {
    // FIXME: This shit is really not efficient
    const user = await (await admin.firestore().collection('users').doc(it.document.uid).get()).data()
    return {
      ...it.document,
      user
    }
  }))
  const results = {
    bottle: bottleRes,
    trend: [],
    bottleRecommended: []
  }

  console.log('AA', JSON.stringify(results))

  return {
    data: results
  }
})
