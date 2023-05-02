import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'

export default (apis) => {
  return async (req, res) => {
    console.log('REQUEST TO SUBJECT')
    const body = req.body
    if (req.method === 'DELETE') {
      // const homeId = req.url.replace(/\//g, '')
      // return await deleteHome(req.identity, homeId, res)
    }

    if (req.method === 'GET') {
      console.log('GET in Subject')
      return await getSubjectsByUser(body.userId, res)
    }

    if (req.method === 'POST') {
      console.log('POST in Subject')
      if (hasBadBody(req)) {
        return rejectHitBadRequest(res)
      }

      await createSubject(body, res)
      return
    }
    rejectHitBadRequest(res)
  }

  // async function deleteHome(identity, homeId, res){
  //     await Promise.all([
  //         apis.homes.delete(homeId),
  //         apis.user.removeHome(identity, homeId)
  //     ])
  //     sendJSON({}, res)
  // }

  async function getSubjectsByUser(userId, res) {
    const payload = (await apis.subject.getByUserId(userId)).json.hits
    sendJSON(payload, res)
  }

  async function createSubject(body, res) {
    const { userId } = body
    const payload = {
      ...body,
      chapters: [],
    }
    const response = await apis.subject.create(payload)
    if (!response.ok) {
      res.statusCode = 500
      res.end()
      return
    }

    console.log('create response', response)
    const user = (await apis.user.getById(userId)).json

    console.log('create user', user)
    if (user.subjectIds) {
      user.subjectIds.push(response.json.objectID)
    } else {
      user.subjectIds = [response.json.objectID]
    }

    await apis.user.update(userId, user)
    sendJSON(response.json, res)
  }
}
