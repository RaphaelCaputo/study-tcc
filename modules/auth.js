import cookie from 'cookie'

export default function () {
  const authConfig = this.options.publicRuntimeConfig.auth

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api', handler)
  })

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/admin', (req, res, next) => {
      res.spa = true
      next()
    })
  })

  // async
  function handler(req, res, next) {
    console.log(req.originalUrl)
    if (req.originalUrl !== '/api/login') {
      const idToken = cookie.parse(req.headers.cookie)[authConfig.cookieName]
      console.log(idToken)
      if (!idToken && req.originalUrl !== '/api/login') return rejectHit(res)
    }

    // const ticket = await getUser(idToken)
    // if(!ticket) return rejectHit(res)
    // console.log(ticket)
    next()
  }

  function rejectHit(res) {
    res.statusCode = 401
    res.end()
  }
}
