import * as functions from 'firebase-functions'
import {SearchReqDTOSchema} from '../schemas'
import {typeClient} from '../typesense'


export const searchQuery = functions.https.onCall(async (data, ctx) => {
  const { error: errorIn, value: dataIn } = SearchReqDTOSchema.validate(data)
  if (errorIn != null) throw new functions.https.HttpsError('invalid-argument', "Search required a particular argument", errorIn)

  if (dataIn.searchKind == 'user') {
    typeClient.collections('users').documents().search({
      q: dataIn.q,
      query_by: 'description,username'
    });
  }

  functions.logger.info(dataIn)
})