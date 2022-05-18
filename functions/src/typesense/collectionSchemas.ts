import * as functions from 'firebase-functions'
import {typesenseCollections} from './config'
import {typeClient} from './typesenseClient'

export const createCollections = functions.https.onCall(async (data, context) => {
  for (const collectionName in typesenseCollections) {
    const schema = typesenseCollections[collectionName]
    functions.logger.info(`creating typesense collection for ${schema.name}`)

    const data = await typeClient.collections().create(schema)
    functions.logger.info('Succesfully created index', data)
  }

  return;
})

export const dropAllCollections = functions.https.onCall(async (data, context) => {
  const existing = await typeClient.collections().retrieve();

  for (const it of existing) {
    functions.logger.info(`dropping typesense collection for ${it.name}`)

    const data = await typeClient.collections(it.name).delete()
    functions.logger.info(`Succesfully deleted index of ${data.name}`, data)
  }

  return;
})
