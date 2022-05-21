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

  const { error: errorIn, value: dataIn } = BottleCreateReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Data supplied isn't in the correct shape", errorIn)

  const currentTimeUTC = admin.firestore.Timestamp.now()

  const storage = admin.storage()

  /** Moving files uploaded from user uploaded dir to a secured dir */
  let _movedImagePath: string | undefined;
  if (dataIn.contentImagePath) {
    const fullFilePath = `/userupload/${ctx.auth.uid}/${dataIn.contentImagePath}`
    const fileNameWExt = dataIn.contentImagePath;

    // If a contentImagePath is provided, check if the path exists
    if (!await storage.bucket().file(fullFilePath).exists()) {
      // The file path doesn't exist
      throw new functions.https.HttpsError('invalid-argument', "the contentImagePath you specified doesn't exist")
    } else {
      const dest = `mediafiles/${ctx.auth.uid}/${fileNameWExt}`
      await storage.bucket().file(fullFilePath).move(dest)
      _movedImagePath = dest
    }
  }

  const uid = ctx.auth.uid

  // Merge user generated data with additional metadata
  // Remove `contentImagePath` since we no longer use it
  const {contentImagePath, ...removedUnnecessaryUserSuppliedData} = dataIn

  // TODO: Use better js syntax, undefined
  let toCreate: Bottle = {
    ...removedUnnecessaryUserSuppliedData,
    createdAt: currentTimeUTC,
    uid,
  }
  if (_movedImagePath) {
    toCreate._contentImagePath = _movedImagePath
  }

  const { error: errorTobeOut, value: dataTobeOut } = BottleSchema.validate(toCreate)
  if (errorTobeOut != null) throw new functions.https.HttpsError('unknown', "can't create the bottle due to internal unknown error", errorIn)

  const db = admin.firestore()
  const res = await db.collection('bottles').add(dataTobeOut)
  const createdDoc = (await res.get()).data()

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
  const results = {
    bottle: postHit.map((it) => {
      let _contentImageUrl: string | undefined = undefined;
      if (it.document._contentImagePath) {
        _contentImageUrl = admin.storage().bucket().file(it.document._contentImagePath).publicUrl();
      }

      // TODO: Consider moving public url to firestore document instead of reloading it each time
      const oneBottle = {...it.document, _contentImageUrl}
      const {error, value} = BottleGetResDTOSchema.validate(oneBottle)
      if (error) {
        functions.logger.error("a get result returned to user isn't in proper format", error)
      }
      return value
    }),
    trend: [],
    bottleRecommended: []
  }

  console.log("AA", JSON.stringify(results));

  return {
    data: results
  }
})
