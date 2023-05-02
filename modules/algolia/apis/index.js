import userApi from './user'
import loginApi from './login'
import subjectApi from './subject'
import chapterApi from './chapter'

export default (algoliaConfig) => {
  return {
    user: userApi(algoliaConfig),
    login: loginApi(algoliaConfig),
    subject: subjectApi(algoliaConfig),
    chapter: chapterApi(algoliaConfig),
  }
}
