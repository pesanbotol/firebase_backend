import * as functions from 'firebase-functions'
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections'
import { typeClient } from './typesenseClient'

export const createUsersCollections = functions.https.onRequest((request, response) => {
  const usersSchema: CollectionCreateSchema = {
    name: 'users',
    fields: [
      { name: 'description', type: 'string' }
    ]
    // 'default_sorting_field': 'ratings_count'
  }

  typeClient.collections().create(usersSchema)
    .then(function (data) {
      console.log('Succesfully created index', data)
    })
})
