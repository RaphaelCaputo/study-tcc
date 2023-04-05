import fetch from 'node-fetch'
import { getHeaders } from '../../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig)
  return {
    login: async (payload) => {
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
  }
}
