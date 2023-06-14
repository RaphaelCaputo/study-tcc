import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'

export default (apis) => {
  return async (req, res) => {
    console.log('REQUEST TO CHAPTER')
    const body = req.body
    if (req.method === 'DELETE') {
      // const homeId = req.url.replace(/\//g, '')
      // return await deleteHome(req.identity, homeId, res)
    }

    if (req.method === 'GET') {
      console.log('GET in CHAPTER')
      return await getChaptersBySubjectId(body.userId, body.subjectId, res)
    }

    if (req.method === 'POST') {
      console.log('POST in CHAPTER')
      if (hasBadBody(req)) {
        return rejectHitBadRequest(res)
      }

      await createChapter(body, res)
      return
    }

    if (req.method === 'PUT') {
      console.log('PUT in CHAPTER')
      if (hasBadBody(req)) {
        return rejectHitBadRequest(res)
      }

      await updateChapter(body, res)
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

  async function getChaptersBySubjectId(userId, subjectId, res) {
    const payload = (await apis.chapter.getBySubjectId(userId, subjectId)).json
      .hits
    sendJSON(payload, res)
  }

  async function createChapter(body, res) {
    const { subjectId } = body
    const payload = {
      ...body,
    }
    const response = await apis.chapter.create(payload)
    if (!response.ok) {
      res.statusCode = 500
      res.end()
    }

    console.log('create response', response)
    const subject = (await apis.subject.getById(subjectId)).json

    console.log('get subject', subject)
    if (subject.chapters) {
      subject.chapters.push(response.json.objectID)
    } else {
      subject.chapters = [response.json.objectID]
    }

    const updatedSubj = await apis.subject.update(subjectId, subject)
    console.log('updated subject', updatedSubj)
    sendJSON(response.json, res)
  }

  async function updateChapter(body, res) {
    const { id } = body
    const payload = {
      ...body,
    }

    const response = await apis.chapter.update(id, payload)
    if (!response.ok) {
      res.statusCode = 500
      res.end()
    }
    sendJSON(response.json, res)
  }
}
