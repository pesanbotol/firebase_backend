import { DocumentSnapshot } from 'firebase-functions/v1/firestore'

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
  fieldsToExtract: string[]
): any => {
  const data = firestoreDocumentSnapshot.data()

  // using flat to flatten nested objects
  // https://typesense.org/docs/0.22.2/api/collections.html#indexing-nested-fields
  const flattened : any = flat(
    Object.fromEntries(Object.entries(data!).map(([key, value]) => [key, mapValue(value)])),
    { safe: true }
  )

  let entries = Object.entries(flattened);
  if (fieldsToExtract.length > 0) {
    entries = entries.filter(([key]) => fieldsToExtract.includes(key))
  }
  const typesenseDocument = Object.fromEntries(entries)
  
  typesenseDocument.id = firestoreDocumentSnapshot.id
  return typesenseDocument
}

export const unflatten: any = (data: any) => {
  var result = {}
  for (var i in data) {
    var keys = i.split('.')
    keys.reduce(function(r: any, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
    }, result)
  }
  return result
}