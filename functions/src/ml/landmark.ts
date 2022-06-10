import axios from 'axios';
import * as admin from 'firebase-admin'
import {logger} from 'firebase-functions/v1';

if (!process.env.ML_LANDMARK_ENDPOINT) {
  logger.warn("ML_LANDMARK_ENDPOINT endpoint is not set")
}

export const getLandmarkArray = async (fullImagePathStorage: string):Promise<null | Array<{id: number, name: string, rank: number}>>  => {
  try {
    if (!process.env.ML_LANDMARK_ENDPOINT) {
      logger.error("ML_LANDMARK_ENDPOINT endpoint is not set")
      // If this configuration is not set, send error to log and fail gracefully
      return null
    }

    const toDetect = await admin.storage().bucket().file(fullImagePathStorage)

    if (!(await toDetect.exists())) {
      logger.warn(`file at ${fullImagePathStorage} doesn't exist yet it's send by somewhere`)
    }

    // Fail safe, assume it's safe if it's not public (NOT IDEAL ALERT)
    // const isPublic = toDetect.isPublic()

    // if (!isPublic) {
    //   logger.warn("file isn't public, making it temporarily public") // NOT IDEAL
    //   // await toDetect.makePublic()
    // }

    const publicUrl = await toDetect.publicUrl()

    const ML_LANDMARK_ENDPOINT = process.env.ML_LANDMARK_ENDPOINT

    const res = await axios.post(ML_LANDMARK_ENDPOINT, {
      'url': publicUrl
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Again, assume it's safe, not ideal
    const scores = res.data['scores'] ?? []

    // if (!isPublic) {
    //   // If the file was private, make it public temporarily and then make it private again
    //   // better solution would be to use signed url, but hey, it doesn't work in emulator
    //   toDetect.makePrivate()
    // }
    if (scores.length > 0) {
      return scores
    } else {
      return null
    }
  } catch (error) {
    logger.error("getLandmarkArray fail for some reason after all that fail safe", error)
    return null // assume safe in case of spectacular unforseen amajing error happen
  }
}