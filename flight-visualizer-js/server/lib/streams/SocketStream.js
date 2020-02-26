import { Duplex } from 'stream'
import Joi from '@hapi/joi'
import SocketIO from 'socket.io'

const SOCKET_STREAM_SCHEMA = Joi.object({
  httpServer: Joi.object().required()
})

const UAV_SCHEMA = Joi.object({
  id: Joi.string().required(),
  position: {
    lat: Joi.number().required(),
    lon: Joi.number().required()
  }
})

class SocketStream extends Duplex {
  constructor(options, context) {
    super(options)

    const { error, value } = SOCKET_STREAM_SCHEMA.validate(options)

    if (error) {
      context.logger.error(error.message)
      throw error
    }

    options = value
    this.httpServer = options.httpServer
    this.io = SocketIO(this.httpServer)
    this.listening = false
    this.reading = false
    this.messages = []
    this.logger = context.logger

    this.configure()
  }

  configure() {
    this.io.on('connection', (socket) => {
      this.logger.info('Client connected:' + socket.id)
      socket.on('disconnect', () => {
        this.logger.info('Client disconnected:', socket.id)
      })
    })
  }

  _read() {
    if (!this.listening) {
      this.listening = true
    }
    this.reading = true
    this.reading = this.pushMessages()
  }

  pushMessages() {
    let done = false
    while (!done) {
      if (this.messages.length === 0) {
        return true
      }
      const chunk = this.messages.shift()
      if (!this.push(chunk)) {
        done = true
      }
    }
    return false
  }

  _write(chunk, encoding, callback) {
    this.parseMessage(chunk)
    callback()
  }

  parseMessage(raw) {
    try {
      const message = JSON.parse(raw)
      const { error, value } = UAV_SCHEMA.validate(message)
      if (error) {
        throw error
      }
      this.io.emit('updateUAV', value)
    } catch (err) {
      this.logger.error('Might be malformed JSON from UDP')
      this.logger.error(err.message)
    }
  }

  async start() {}

  async stop() {
    return new Promise((resolve) => {
      this.io.close(() => {
        this.logger.info('Socket IO stopped listening')
        return resolve()
      })
    })
  }
}

export default SocketStream
