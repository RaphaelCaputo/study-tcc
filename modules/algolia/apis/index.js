import userApi from './user'
import loginApi from './login'

export default (algoliaConfig) => {
  return {
    user: userApi(algoliaConfig),
    login: loginApi(algoliaConfig),
  }
}
