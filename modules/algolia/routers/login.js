import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { rejectHitBadRequest, rejectHitError, sendJSON } from '../../helpers'

export default (apis) => {
  return async function getLoginRoute(req, res, next) {
    const body = req.body
    const userData = await apis.user.getByEmail(body.email)

    if (userData.status !== 200) {
      rejectHitError(userData, res)
      return
    }

    if (userData.json.hits.length > 0) {
      const { password, ...user } = userData.json.hits[0]
      const comparePassword = await bcrypt.compare(body.password, password)

      if (comparePassword) {
        const payload = makeUserPayload(user)
        sendJSON(payload, res)
      } else {
        rejectHitBadRequest(res)
      }
    } else {
      rejectHitBadRequest(res)
    }
  }

  function makeUserPayload(user) {
    const token = jwt.sign(user, process.env.JWT_SECRET)

    return {
      token,
    }
  }
}
