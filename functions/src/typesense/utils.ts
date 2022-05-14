import { DocumentSnapshot } from 'firebase-functions/v1/firestore'

import { TypesenseConfig as config } from './config'
import * as admin from 'firebase-admin'
import * as flat from 'flat'

const mapValue: any = (value: any) => {
  if (value instanceof admin.firestore.Timestamp) {
    // convert date to Unix timestamp
    // https://typesense.org/docs/0.22.2/api/collections.html#indexing-dates
    return Math.floor(value.toDate().getTime() / 1000)
  } else if (value instanceof admin.firestore.GeoPoint) {
    return [value.latitude, value.longitude]
  } else if (value instanceof admin.firestore.DocumentReference) {
    return null
  } else if (Array.isArray(value)) {
    return value.map(mapValue)
  } else if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, mapValue(value)]))
  } else {
    return value
  }
}

/**
 * @param {DocumentSnapshot} firestoreDocumentSnapshot
 * @param {Array} fieldsToExtract
 * @return {Object} typesenseDocument
 */
export const typesenseDocumentFromSnapshot = (
  firestoreDocumentSnapshot: DocumentSnapshot,
  fieldsToExtract = config.firestoreCollectionFields
) => {
  const data = firestoreDocumentSnapshot.data()

  let entries = Object.entries(data!)

  if (fieldsToExtract.length > 0) {
    entries = entries.filter(([key]) => fieldsToExtract.includes(key))
  }

  // using flat to flatten nested objects
  // https://typesense.org/docs/0.22.2/api/collections.html#indexing-nested-fields
  const typesenseDocument: any = flat(
    Object.fromEntries(entries.map(([key, value]) => [key, mapValue(value)])),
    { safe: true }
  )
  typesenseDocument.id = firestoreDocumentSnapshot.id
  return typesenseDocument
}
