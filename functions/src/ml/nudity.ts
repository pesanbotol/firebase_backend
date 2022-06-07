import axios from 'axios';
import * as admin from 'firebase-admin'
import {logger} from 'firebase-functions/v1';

if (!process.env.ML_NUDITY_ENDPOINT) {
  logger.warn("ML_NUDITY_ENDPOINT endpoint is not set")
}

export const isDepictNudity = async (fullImagePathStorage: string) => {
  try {
    if (!process.env.ML_NUDITY_ENDPOINT) {
      logger.error("ML_NUDITY_ENDPOINT endpoint is not set")
      // If this configuration is not set, send error to log and fail gracefully
      return false
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

    const ML_NUDITY_ENDPOINT = process.env.ML_NUDITY_ENDPOINT

    const res = await axios.post(ML_NUDITY_ENDPOINT, {
      'url': publicUrl
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Again, assume it's safe, not ideal
    const isNudity = res.data['depict_nudity'] ?? false

    // if (!isPublic) {
    //   // If the file was private, make it public temporarily and then make it private again
    //   // better solution would be to use signed url, but hey, it doesn't work in emulator
    //   toDetect.makePrivate()
    // }
    return isNudity
  } catch (error) {
    logger.error("isDepictNudity fail for some reason after all that fail safe", error)
    return false // assume safe in case of spectacular unforseen amajing error happen
  }
}