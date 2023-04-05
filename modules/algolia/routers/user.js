import bcrypt from 'bcrypt'
import { rejectHitBadRequest, rejectHitError, sendJSON } from '../../helpers'

export default (apis) => {
  return async function getUserRoute(req, res, next) {
    const body = req.body
    const userData = await apis.user.getByEmail(body.email)
    console.log('userData', userData)

    if (userData.status !== 200) {
      rejectHitError(userData, res)
      return
    }

    if (userData.json.hits.length > 0) {
      rejectHitBadRequest(res)
      return
    }

    const payload = await makeUserPayload(body)
    apis.user.create(payload)
    sendJSON(payload, res)
  }

  async function makeUserPayload(body) {
    const saltRounds = 10
    const hash = await bcrypt.hash(body.password, saltRounds)

    return {
      name: body.name,
      email: body.email,
      password: hash,
      joined: new Date().toISOString(),
    }
  }
}
