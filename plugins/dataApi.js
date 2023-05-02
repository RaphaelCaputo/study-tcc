import { unWrap, getErrorResponse } from '~/utils/fetchUtils'
export default function ({ $config }, inject) {
  const headers = {
    'X-Algolia-API-Key': $config.algolia.key,
    'X-Algolia-Application-Id': $config.algolia.appId,
  }

  inject('dataApi', {
    getUser,
    getSubject,
    getSubjectByUserId,
    getChaptersBySubjectId,
  })

  async function getUser(userId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/${userId}`,
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
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/subjects/${subjectId}`,
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
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/subjects/query`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              filters: `userId:${userId}`,
              attributesToHighlight: [],
            }),
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getChaptersBySubjectId(subjectId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/chapters/${subjectId}`,
          {
            headers,
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }
}
