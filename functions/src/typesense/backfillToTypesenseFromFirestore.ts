import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { fieldsToExtractForCollection, typesenseCollections, TypesenseConfig as config } from './config'
import { DocumentSnapshot } from 'firebase-functions/v1/firestore'
import * as utils from './utils'
import { typeClient } from './typesenseClient'

const validateBackfillRun = (snapshot: functions.Change<DocumentSnapshot>): boolean => {
  if (![true, 'true'].includes(snapshot.after.get('trigger'))) {
    functions.logger.error(
      'Skipping backfill. `trigger: true` key ' +
      `was not found in Firestore document ${config.typesenseBackfillTriggerDocumentInFirestore}.`)
    return false
  }
  return true
}

export const onFirestoreTriggerBackfillIndex = functions.firestore.document(config.typesenseBackfillTriggerDocumentInFirestore)
  .onWrite(async (snapshot) => {
    for (const collectionName in typesenseCollections) {
      const schema = typesenseCollections[collectionName]

      functions.logger.info('Backfilling ' +
        `${schema.fields.map((it) => it.name).join(',')} fields in Firestore documents ` +
        `from ${collectionName} ` +
        `into Typesense Collection ${schema.name} ` +
        `on ${config.typesenseHosts.join(',')}`)

      if (!validateBackfillRun(snapshot)) {
        return false
      }

      // NOTE!: Disini diasumsikan bahwa nama collection di typesense sama dengan nama collection di firestore
      const querySnapshot: admin.firestore.QuerySnapshot<admin.firestore.DocumentData> =
        await admin.firestore().collection(collectionName).get()

      // console.log(`something something: ${querySnapshot.docs.length}`)

      let currentDocumentNumber = 0
      let currentDocumentsBatch: any[] = []

      for (const firestoreDocument of querySnapshot.docs) {
        currentDocumentNumber += 1
        currentDocumentsBatch.push(utils.typesenseDocumentFromSnapshot(firestoreDocument, fieldsToExtractForCollection(collectionName)))
        console.log('entah entah', firestoreDocument, currentDocumentsBatch)

        if (currentDocumentNumber === config.typesenseBackfillBatchSize) {
          try {
            await typeClient
              .collections(encodeURIComponent(collectionName))
              .documents()
              .import(currentDocumentsBatch)
            currentDocumentsBatch = []
            functions.logger.info(`Imported ${currentDocumentNumber} documents into Typesense`)
          } catch (error) {
            functions.logger.error('Import error', error)
          }
        }
      }

      if (currentDocumentsBatch.length > 0) {
        try {
          await typeClient
            .collections(encodeURIComponent(collectionName))
            .documents()
            .import(currentDocumentsBatch)
          functions.logger.info(`Imported ${currentDocumentNumber} documents into Typesense`)
        } catch (error) {
          functions.logger.error('Import error', error)
        }
      }

      functions.logger.info('Done backfilling to Typesense from Firestore')
    }
    return
  })
