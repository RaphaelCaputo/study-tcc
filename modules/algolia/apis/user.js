import fetch from 'node-fetch'
import { getHeaders } from '../../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig)
  return {
    create: async (payload) => {
      try {
        console.log('payload', payload)
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users`,
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
    update: async (userId, payload) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${userId}`,
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
    getByEmail: async (email) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/query`,
            {
              headers,
              method: 'POST',
              body: JSON.stringify({
                filters: `email:${email}`,
                attributesToRetrieve: ['objectID', 'name', 'email', 'password'],
                attributesToHighlight: [],
              }),
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    getById: async (userId) => {
      try {
        return unWrap(
          await fetch(
            `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${userId}`,
            {
              headers,
            }
          )
        )
      } catch (error) {
        return getErrorResponse(error)
      }
    },
  }
}
