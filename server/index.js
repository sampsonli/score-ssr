import Nuxt from 'nuxt'
import express from 'express'
import forwardRequest from 'forward-request'
import compression from 'compression'
import path from 'path'

// import api from './api'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use((req, resp, next) => {
    if (req.originalUrl.indexOf('/ews') === 0) {
        forwardRequest({
            req,
            resp,
            host: 'ews.500.com',
            ip: '43.247.69.20',
            path: req.originalUrl.replace('/ews', '')
        })
    } else {
        next()
    }
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
// app.use(compression())
app.use((req, resp, next) => {
    if (~req.originalUrl.indexOf('.')) {
        next()
    } else {
        nuxt.renderRoute(req.originalUrl).then(({html, error}) => {
            if (error) {
                next()
            } else {
                resp.send(html)
            }
        }).catch(() => next())
    }
})

app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
    nuxt.build()
  .catch((error) => {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
  })
}

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
