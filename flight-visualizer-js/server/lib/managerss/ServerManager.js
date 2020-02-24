import Joi from '@hapi/joi'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import { createServer } from 'http'
import express from 'express'
import { join } from 'path'
import morgan from 'morgan'

const SERVER_MANAGER_SCHEMA = Joi.object({
  port: Joi.number().required()
})

// const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

class ServerManager {
  constructor(options, context) {
    const { error, value } = SERVER_MANAGER_SCHEMA.validate(options)

    if (error) {
      context.logger.error(error.message)
      throw error
    }

    options = value
    this.app = express()
    this.server = createServer(this.app)
    this.port = options.port
    this.logger = context.logger

    this.configure()
  }

  configure() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(express.static(join(__dirname, '../../public')))

    // Catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404))
    })

    // Error handler
    this.app.use((err, req, res, next) => {
      if (res.headersSent) {
        return next(err)
      }

      res.status(err.status || 500)
      res.render('error', { error: err })
    })
  }

  async start() {
    return new Promise((resolve, reject) => {
      this.server.listen(this.port, (err) => {
        if (err) {
          this.logger.error(err.message)
          return reject(err)
        }
        this.logger.info(`listening on *:${this.port}`)
        resolve()
      })
    })
  }

  async stop() {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        return resolve()
      }
      this.server.close((error) => {
        if (error) {
          return reject(error)
        }
        this.logger.info(`Server stopped listenning to port ${this.port}`)
        return resolve()
      })
    })
  }

  getServer() {
    return this.server
  }
}

export default ServerManager
