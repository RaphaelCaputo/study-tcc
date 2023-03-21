import { unWrap, getErrorResponse } from '~/utils/fetchUtils'
export default function (context, inject) {
  const appId = 'VPXUMQ6W1L'
  const apiKey = '9963406e97d6222757466a6ade2027d9'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getUser,
    getSubject,
    getSubjectByUserId,
  })

  async function getUser(userId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/users/${userId}`,
          {
            headers,
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getSubject(subjectId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/subjects/${subjectId}`,
          {
            headers,
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getSubjectByUserId(userId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/subjects/query`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              filters: `userId:${userId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }
}
