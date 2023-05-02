import jsCookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function ({ $config, redirect, store }) {
  const idToken = jsCookie.get($config.auth.cookieName)

  if (!idToken) {
    store.commit('auth/user', null)
    redirect({ name: 'login' })
  }

  const decodedToken = jwt.decode(idToken)
  store.commit('auth/user', decodedToken)
}
