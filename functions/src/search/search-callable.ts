import * as functions from 'firebase-functions'
import {SearchReqDTOSchema} from '../schemas'
import {typeClient} from '../typesense'

export const searchQuery = functions.https.onCall(async (data, ctx) => {
  const {error: errorIn, value: dataIn} = SearchReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Search required a particular argument", errorIn)

  const {perPage: per_page, page} = dataIn
  const paginationQuery = {per_page, page};

  if (dataIn.searchKind == 'users') {
    return typeClient.collections('users').documents().search({
      ...paginationQuery,
      q: dataIn.q ?? '',
      query_by: 'description,username',
    });
  } else if (dataIn.searchKind == 'bottles') {
    return typeClient.collections('bottles').documents().search({
      ...paginationQuery,
      q: dataIn.q ?? '',
      query_by: 'contentText',
    });
  }

  functions.logger.error(dataIn)
  throw new functions.https.HttpsError('unimplemented', `${dataIn.searchKind} isn't implemented yet`)
})