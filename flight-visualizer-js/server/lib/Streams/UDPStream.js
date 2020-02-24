import { Duplex } from 'stream'
import Joi from '@hapi/joi'
import dgram from 'dgram'

const UDP_STREAM_SCHEMA = Joi.object({
  bind: {
    address: Joi.string().default('localhost'),
    exclusive: Joi.boolean(),
    fd: Joi.number().integer(),
    mode: Joi.string()
      .valid('unicast', 'broadcast', 'multicast')
      .required(),
    multicast: {
      interface: Joi.string(),
      loopback: Joi.boolean(),
      ttl: Joi.number().integer()
    },
    port: Joi.number().integer()
  },
  cast: {
    address: Joi.string().required(),
    port: Joi.number()
      .integer()
      .required()
  },
  ipv6Only: Joi.boolean(),
  lookup: Joi.func(),
  recvBufferSize: Joi.number(),
  reuseAddr: Joi.boolean(),
  sendBufferSize: Joi.number(),
  type: Joi.string()
    .valid('udp4', 'udp6')
    .required()
})

class UDPStream extends Duplex {
  constructor(options, context) {
    super(options)

    const { error } = UDP_STREAM_SCHEMA.validate(options)

    if (error) {
      context.logger.error(error.message)
      throw error
    }

    Object.assign(this, options)
    this.socket = undefined
    this.messages = []
    this.reading = false
    this.connected = false
    this.logger = context.logger
  }

  _write(chunk, encoding, callback) {
    callback()
  }

  _read() {
    this.reading = true
    this.reading = this.pushMessages()
  }

  pushMessages() {}

  pushMessage() {}

  async start() {
    this.socket = dgram.createSocket({
      ipv6Only: this.ipv6Only,
      lookup: this.lookup,
      recvBufferSize: this.recvBufferSize,
      reuseAddr: this.reuseAddr,
      sendBufferSize: this.sendBufferSize,
      type: this.type
    })

    await this.bindSocket()
  }

  async bindSocket() {}

  setCast(newCast) {
    this.cast.address = newCast.address
    this.cast.port = newCast.port
  }

  getCast() {
    return this.cast
  }

  _final(callback) {
    this.socket.close(callback)
  }
}

export default UDPStream
