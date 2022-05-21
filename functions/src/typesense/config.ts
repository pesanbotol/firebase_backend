import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections'

interface TypesenseConfigInterface {
  // firestoreCollectionPath: string
  // firestoreCollectionFields: string[]
  typesenseHosts: string[]
  typesensePort: number
  typesenseProtocol: string
  // typesenseCollectionName: string
  typesenseAPIKey: string
  typesenseBackfillTriggerDocumentInFirestore: string
  typesenseBackfillBatchSize: number
}

export const typesenseCollections: Record<string, CollectionCreateSchema> = {
  users: {
    name: 'users',
    fields: [
      { name: 'description', type: 'string', optional: true },
      { name: 'username', type: 'string' }
    ]
    // 'default_sorting_field': 'ratings_count'
  },
  bottles: {
    name: 'bottles',
    fields: [
      { name: 'kind', type: 'string' },
      { name: 'contentText', type: 'string', optional: true },
      { name: '_contentImagePath', type: 'string', optional: true },
      { name: 'contentImageUrl', type: 'string', optional: true, index: false },
      { name: 'geo', type: 'geopoint' }
    ]
    // 'default_sorting_field': 'ratings_count'
  }
}

type collectionNameType = keyof typeof typesenseCollections
/**
 * Utility untuk ngambil semua field as string[] dari collection
 * @param collectionName nama collection
 * @returns
 */
export const fieldsToExtractForCollection = (collectionName: collectionNameType): string[] => typesenseCollections[collectionName].fields.map(it => it.name)

export const TypesenseConfig: TypesenseConfigInterface = {
  // firestoreCollectionPath: process.env.FIRESTORE_COLLECTION_PATH ?? 'users',
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
