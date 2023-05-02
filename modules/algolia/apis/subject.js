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
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/subjects`,
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
    update: async (subjectId, payload) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/subjects/${subjectId}`,
            {
              headers,
              method: 'PUT',
              body: JSON.stringify(payload),
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    getById: async (subjectId) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/subjects/${subjectId}`,
            {
              headers,
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    getByUserId: async (userId) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/subjects/query`,
            {
              headers,
              method: 'POST',
              body: JSON.stringify({
                filters: `userId:${userId}`,
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
