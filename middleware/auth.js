import jsCookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function ({ $config, redirect, store }) {
  const idToken = jsCookie.get($config.auth.cookieName)

  if (!idToken) {
    redirect({ name: 'login' })
  }

  const decodedToken = jwt.decode(idToken)
  store.commit('user/user', decodedToken)
}
