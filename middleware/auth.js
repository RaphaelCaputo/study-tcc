import jsCookie from 'js-cookie'

export default function ({ $config, redirect }) {
  if (!jsCookie.get($config.auth.cookieName)) {
    redirect({ name: 'login' })
  }
}
