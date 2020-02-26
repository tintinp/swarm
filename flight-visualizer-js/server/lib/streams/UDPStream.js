// Courtesy of Brian Neisler's UDPStream. This is a modification of it.

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
    port: Joi.number()
      .integer()
      .default('50000')
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

    const { error, value } = UDP_STREAM_SCHEMA.validate(options)

    if (error) {
      context.logger.error(error.message)
      throw error
    }

    Object.assign(this, value)
    this.socket = undefined
    this.messages = []
    this.reading = false
    this.listening = false
    this.connected = false
    this.logger = context.logger
  }

  _read() {
    if (!this.listening) {
      this.addSocketListeners()
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

  addSocketListeners() {
    this.listening = true
    this.socket.once('close', () => {
      this.emit('end')
    })
    this.socket.once('error', () => {
      this.emit('end')
    })
    this.socket.on('message', (msg, rinfo) => {
      this.logger.debug(`UDP message received from ${rinfo.address}:${rinfo.port}`)
      this.messages.push(msg)
      if (this.messages.length >= 1000) {
        this.messages.shift()
        this.logger.warn('Dropped incoming UDP message because the message queue is too long')
      }
      if (this.reading) {
        this.reading = this.pushMessages()
      }
    })
  }

  _write(chunk, encoding, callback) {
    // Write back to UDP Server
    // TODO TIN: Define behavior when writing back to UDP server
    callback()
  }

  _writev(chunks, callback) {
    // const { length } = chunks
    // const i = 0
    // while (i < length) {
    //   const { chunk, encoding } = chunks[i]
    //   const message = Buffer.from(chunk, encoding)
    //   // Only send the latest message so that we don't burst the traffic
    //   if (i === length - 1) {
    //     this.sendMessage(message)
    //   }
    // }
    // if (length > 1) {
    //   this.logger.debug(`Dropped ${length - 1} UDP messages`)
    // }
    callback()
  }

  sendMessage(message) {
    if (!this.connected) {
      this.emit('connected')
      this.connected = true
    }
    // this.logger.info(`UDP message sent ${message}`)
    this.socket.send(message, 0, message.length, this.cast.port, this.cast.address)
  }

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

  async bindSocket() {
    return new Promise((resolve, reject) => {
      const bindErrorListener = (error) => {
        return reject(error)
      }
      this.socket.on('error', bindErrorListener)
      this.socket.bind(this.bind, () => {
        const address = this.socket.address()
        this.logger.info(`UDP listening on ${address.address}:${address.port}`)
        this.socket.removeListener('error', bindErrorListener)
        const { mode } = this.bind

        if (mode === 'multicast') {
          // set up for multicast
          const { multicast } = this.bind
          try {
            this.socket.addMembership(multicast.address, multicast.interface)
            this.socket.setMulticastTTL(multicast.ttl)
            this.socket.setMulticastLoopback(multicast.loopback ? true : false)
          } catch (error) {
            return reject(error)
          }
        } else if (mode === 'broadcast') {
          this.logger.info('Set UDP socket for broadcast')
          this.socket.setBroadcast(true)
        }

        // this.socket.setSendBufferSize(UDP_MESSAGE_SIZE)
        return resolve()
      })
    })
  }

  async stop() {
    return new Promise((resolve) => {
      this.socket.close(() => {
        this.logger.info('UDP socket stopped listening')
        return resolve()
      })
    })
  }

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
