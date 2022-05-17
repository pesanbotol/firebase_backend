import * as functions from 'firebase-functions'
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections'
import { typeClient } from './typesenseClient'

export const createUsersCollections = functions.https.onRequest(async (request, response) => {
  const schema: CollectionCreateSchema = {
    name: 'users',
    fields: [
      { name: 'description', type: 'string' }
    ]
    // 'default_sorting_field': 'ratings_count'
  }

  await typeClient.collections().create(schema)
    .then(function (data) {
      console.log('Succesfully created index', data)
    })
})

export const createBottleCollections = functions.https.onRequest(async (request, response) => {
  const schema: CollectionCreateSchema = {
    name: 'bottles',
    fields: [
      { name: 'kind', type: 'string' },
      { name: 'content', type: 'string' },
      { name: 'geo', type: 'geopoint' }
    ]
    // 'default_sorting_field': 'ratings_count'
  }

  await typeClient.collections().create(schema)
    .then(function (data) {
      console.log('Succesfully created index', data)
    })
})
