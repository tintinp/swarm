import Pino from 'pino'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import { createServer } from 'http'
import createSocketServer from './socket'
import express from 'express'
import { join } from 'path'
import morgan from 'morgan'
import { normalizePort } from './utils'

const logger = Pino()
const app = express()
const http = createServer(app)
createSocketServer({ http, logger })

// const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(__dirname, '../public')))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  // render the error page
  res.status(err.status || 500)
  res.render('error', { error: err })
})

const port = normalizePort(process.env.PORT || '5000')

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})

module.exports = app
