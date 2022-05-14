// const functions = require('firebase-functions')
// const config = require('./config')
// const typesense = require('./typesenseClient')
// const utils = require('./utils')

import * as functions from 'firebase-functions'
import {TypesenseConfig as config} from './config'
import {typeClient} from './typesenseClient'
import * as utils from './utils'

// export const onWriteUpdateTypesenseIndex = functions.handler.firestore.document
// export const onWriteUpdateTypesenseIndex = functions.handler.firestore.document
export const onWriteUpdateTypesenseIndex = functions.firestore.document('users/{userId}')
  .onWrite((snapshot, context) => {
    functions.logger.log("eeee", snapshot)

    if (snapshot.before.data() == null) {
      functions.logger.log("eeee1")
      // Create
      const typesenseDocument = utils.typesenseDocumentFromSnapshot(snapshot.after)
      functions.logger.debug(`Creating document ${JSON.stringify(typesenseDocument)}`)
      functions.logger.log("eeee2")
      return typeClient
        .collections(encodeURIComponent(config.typesenseCollectionName!))
        .documents()
        .create(typesenseDocument)
    } else if (snapshot.after.data() == null) {
      // Delete
      functions.logger.log("eeee3")
      const documentId = snapshot.before.id
      functions.logger.debug(`Deleting document ${documentId}`)
      return typeClient
        .collections(encodeURIComponent(config.typesenseCollectionName!))
        .documents(documentId)
        .delete()
    } else {
      // Update
      functions.logger.log("eeee4")
      const typesenseDocument = utils.typesenseDocumentFromSnapshot(snapshot.after)
      functions.logger.debug(`Upserting document ${JSON.stringify(typesenseDocument)}`)
      return typeClient
        .collections(encodeURIComponent(config.typesenseCollectionName!))
        .documents()
        .upsert(typesenseDocument)
    }
  })
