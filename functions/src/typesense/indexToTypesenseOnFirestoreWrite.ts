import * as functions from 'firebase-functions'
import { fieldsToExtractForCollection } from './config'
import { typeClient } from './typesenseClient'
import * as utils from './utils'

const _higherOrderIndexer = (collectionName: string) => async (snapshot: functions.Change<functions.firestore.DocumentSnapshot>, context: functions.EventContext) => {
  const fieldToExtractForCollection = fieldsToExtractForCollection(collectionName)

  if (snapshot.before.data() == null) {
    // Create
    const typesenseDocument = utils.typesenseDocumentFromSnapshot(snapshot.after, fieldToExtractForCollection)
    functions.logger.info(`Creating ${collectionName} document ${JSON.stringify(typesenseDocument)}`)
    return await typeClient
      .collections(encodeURIComponent(collectionName))
      .documents()
      .create(typesenseDocument)
  } else if (snapshot.after.data() == null) {
    // Delete
    const documentId = snapshot.before.id
    functions.logger.info(`Deleting ${collectionName} document ${documentId}`)
    return await typeClient
      .collections(encodeURIComponent(collectionName))
      .documents(documentId)
      .delete()
  } else {
    // Update
    const typesenseDocument = utils.typesenseDocumentFromSnapshot(snapshot.after, fieldToExtractForCollection)
    functions.logger.info(`Upserting ${collectionName} document ${JSON.stringify(typesenseDocument)}`)
    return await typeClient
      .collections(encodeURIComponent(collectionName))
      .documents()
      .upsert(typesenseDocument)
  }
}

export const onWriteUsersUpdateTypesenseIndex = functions.firestore.document('users/{userId}')
  .onWrite(_higherOrderIndexer('users'))

export const onWriteBottlesUpdateTypesenseIndex = functions.firestore.document('bottles/{bottleId}')
  .onWrite(_higherOrderIndexer('bottles'))
