import * as functions from 'firebase-functions'
import { TypesenseConfig as config } from './config'
import { typeClient } from './typesenseClient'
import * as utils from './utils'

export const onWriteUpdateTypesenseIndex = functions.firestore.document('users/{userId}')
  .onWrite(async (snapshot, context) => {
    if (snapshot.before.data() == null) {
      // Create
      const typesenseDocument = utils.typesenseDocumentFromSnapshot(snapshot.after)
      functions.logger.debug(`Creating document ${JSON.stringify(typesenseDocument)}`)
      return await typeClient
        .collections(encodeURIComponent(config.typesenseCollectionName))
        .documents()
        .create(typesenseDocument)
    } else if (snapshot.after.data() == null) {
      // Delete
      const documentId = snapshot.before.id
      functions.logger.debug(`Deleting document ${documentId}`)
      return await typeClient
        .collections(encodeURIComponent(config.typesenseCollectionName))
        .documents(documentId)
        .delete()
    } else {
      // Update
      const typesenseDocument = utils.typesenseDocumentFromSnapshot(snapshot.after)
      functions.logger.debug(`Upserting document ${JSON.stringify(typesenseDocument)}`)
      return await typeClient
        .collections(encodeURIComponent(config.typesenseCollectionName))
        .documents()
        .upsert(typesenseDocument)
    }
  })
