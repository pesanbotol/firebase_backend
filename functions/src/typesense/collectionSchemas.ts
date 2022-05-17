import * as functions from 'firebase-functions'
import {typesenseCollections} from './config'
import {typeClient} from './typesenseClient'

export const createCollections = functions.https.onRequest(async (request, response) => {
  for (const collectionName in typesenseCollections) {
    const schema = typesenseCollections[collectionName]
    functions.logger.info(`creating typesense collection for ${schema.name}`)

    await typeClient.collections().create(schema)
      .then(function (data) {
        functions.logger.info('Succesfully created index', data)
      })
  }
})
