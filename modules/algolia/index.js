import bodyParser from 'body-parser'
import userRouter from './routers/user'
import loginRouter from './routers/login'
import subjectRouter from './routers/subject'
import chapterRouter from './routers/chapter'
import getApis from './apis'

export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia
  const apis = getApis(algoliaConfig)

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json())
    app.use('/api/user', userRouter(apis))
    app.use('/api/login', loginRouter(apis))
    app.use('/api/subject', subjectRouter(apis))
    app.use('/api/chapter', chapterRouter(apis))
  })
}
