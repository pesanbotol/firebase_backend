interface TypesenseConfigInterface {
  firestoreCollectionPath: string
  // firestoreCollectionFields: string[]
  typesenseHosts: string[]
  typesensePort: number
  typesenseProtocol: string
  // typesenseCollectionName: string
  typesenseAPIKey: string
  typesenseBackfillTriggerDocumentInFirestore: string
  typesenseBackfillBatchSize: number
}

export const TypesenseConfig: TypesenseConfigInterface = {
  firestoreCollectionPath: process.env.FIRESTORE_COLLECTION_PATH ?? 'users',
  // firestoreCollectionFields:
  //   (process.env.FIRESTORE_COLLECTION_FIELDS ?? 'username,description')
  //     .split(',')
  //     .map((f) => f.trim())
  //     .filter((f) => f),
  typesenseHosts:
    (process.env.TYPESENSE_HOSTS ?? 'localhost').split(',').map((e) => e.trim()),
  typesensePort: process.env.TYPESENSE_PORT !== undefined ? Number.parseInt(process.env.TYPESENSE_PORT) : 8108,
  typesenseProtocol: process.env.TYPESENSE_PROTOCOL ?? 'http',
  // typesenseCollectionName: process.env.TYPESENSE_COLLECTION_NAME ?? 'users',
  typesenseAPIKey: process.env.TYPESENSE_API_KEY ?? 'Hu52dwsas2AdxdE',
  typesenseBackfillTriggerDocumentInFirestore: 'typesense_sync/backfill',
  typesenseBackfillBatchSize: 1000
}
