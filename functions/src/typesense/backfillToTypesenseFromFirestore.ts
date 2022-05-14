import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {TypesenseConfig as config} from './config'
import {DocumentSnapshot} from 'firebase-functions/v1/firestore'
import * as utils from './utils'
import {typeClient} from './typesenseClient'

const validateBackfillRun = (snapshot: functions.Change<DocumentSnapshot>) => {
  if (![true, 'true'].includes(snapshot.after.get('trigger'))) {
    functions.logger.error(
      'Skipping backfill. `trigger: true` key ' +
      `was not found in Firestore document ${config.typesenseBackfillTriggerDocumentInFirestore}.`)
    return false
  }
  return true
}

export const onFirestoreTriggerBackfillIndex = functions.handler.firestore.document
  .onWrite(async (snapshot, context) => {
    functions.logger.log("eeeee");

    functions.logger.info('Backfilling ' +
      `${config.firestoreCollectionFields.join(',')} fields in Firestore documents ` +
      `from ${config.firestoreCollectionPath} ` +
      `into Typesense Collection ${config.typesenseCollectionName} ` +
      `on ${config.typesenseHosts.join(',')}`)

    if (!validateBackfillRun(snapshot)) {
      return false
    }

    const querySnapshot =
      await admin.firestore().collection(config.firestoreCollectionPath!).get()
    let currentDocumentNumber = 0
    let currentDocumentsBatch: any[] = []

    querySnapshot.forEach(async (firestoreDocument) => {
      currentDocumentNumber += 1
      currentDocumentsBatch.push(utils.typesenseDocumentFromSnapshot(firestoreDocument))

      if (currentDocumentNumber === config.typesenseBackfillBatchSize) {
        try {
          await typeClient
            .collections(encodeURIComponent(config.typesenseCollectionName!))
            .documents()
            .import(currentDocumentsBatch)
          currentDocumentsBatch = []
          functions.logger.info(`Imported ${currentDocumentNumber} documents into Typesense`)
        } catch (error) {
          functions.logger.error('Import error', error)
        }
      }
    })
    if (currentDocumentsBatch.length > 0) {
      try {
        await typeClient
          .collections(encodeURIComponent(config.typesenseCollectionName!))
          .documents()
          .import(currentDocumentsBatch)
        functions.logger.info(`Imported ${currentDocumentNumber} documents into Typesense`)
      } catch (error) {
        functions.logger.error('Import error', error)
      }
    }

    functions.logger.info('Done backfilling to Typesense from Firestore')
    return;
  })

