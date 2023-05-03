import fetch from 'node-fetch'
import { getHeaders } from '../../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig)
  return {
    create: async (payload) => {
      console.log('payload', payload)
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/chapters`,
            {
              headers,
              method: 'POST',
              body: JSON.stringify(payload),
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    getById: async (identity) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/chapters/${identity.id}`,
            {
              headers,
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    getBySubjectId: async (userId, subjectId) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/chapters/query`,
            {
              headers,
              method: 'POST',
              body: JSON.stringify({
                filters: `userId:${userId}, subjectId:${subjectId}`,
                attributesToRetrieve: ['*'],
                attributesToHighlight: [],
              }),
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
  }
}
