import { SocketStream, UDPStream } from './streams'

import Joi from '@hapi/joi'
import { ServerManager } from './managers'

const FLIGHT_VISUALIZER_SERVER_SCHEMA = Joi.object({
  udpBroadcast: {
    address: Joi.string().required(),
    port: Joi.number().required()
  },
  port: Joi.number().required()
})

class FlightVisualizerServer {
  constructor(options, context) {
    const { error, value } = FLIGHT_VISUALIZER_SERVER_SCHEMA.validate(options)

    if (error) {
      context.logger.error(error.message)
      throw error
    }

    Object.assign(this, value)
    this.serverManager = new ServerManager(
      {
        port: this.port
      },
      context
    )
    this.socketStream = new SocketStream(
      {
        httpServer: this.serverManager.getServer()
      },
      context
    )
    this.updStream = new UDPStream(
      {
        bind: {
          mode: 'broadcast'
        },
        cast: {
          address: '10.42.0.255',
          port: 50000
        },
        reuseAddr: true,
        type: 'udp4'
      },
      context
    )

    this.logger = context.logger
  }

  async start() {
    await Promise.all([this.startServerManager(), this.startSocketStream(), this.startUDPStream()])

    this.updStream.pipe(this.socketStream)
    this.socketStream.pipe(this.updStream)
  }

  async stop() {
    this.updStream.unpipe(this.socketStream)
    this.socketStream.unpipe(this.updStream)
    await Promise.all([this.stopServerManager(), this.stopSocketStream(), this.stopUDPStream()])
  }

  async startServerManager() {
    try {
      this.logger.info('Starting ServerManager')
      await this.serverManager.start()
      this.logger.info('ServerManager STARTED')
    } catch (err) {
      this.logger.error('FAILED TO START ServerManager')
      throw err
    }
  }

  async startSocketStream() {
    try {
      this.logger.info('Starting SocketStream')
      await this.socketStream.start()
      this.logger.info('SocketStream STARTED')
    } catch (err) {
      this.logger.error('FAILED TO START SocketStream')
      throw err
    }
  }

  async startUDPStream() {
    try {
      this.logger.info('Starting UDPStream')
      await this.updStream.start()
      this.logger.info('UDPStream STARTED')
    } catch (err) {
      this.logger.error('FAILED TO START UDPStream')
      throw err
    }
  }

  async stopServerManager() {
    try {
      this.logger.info('Stopping ServerManager')
      await this.serverManager.stop()
      this.logger.info('ServerManager STOPPED')
    } catch (err) {
      this.logger.error('FAILED TO STOP ServerManager')
      throw err
    }
  }

  async stopSocketStream() {
    try {
      this.logger.info('Stopping SocketStream')
      await this.socketStream.stop()
      this.logger.info('SocketStream STOPPED')
    } catch (err) {
      this.logger.error('FAILED TO STOP SocketStream')
      throw err
    }
  }

  async stopUDPStream() {
    try {
      this.logger.info('Stopping UDPStream')
      await this.updStream.stop()
      this.logger.info('UDPStream STOPPED')
    } catch (err) {
      this.logger.error('FAILED TO STOP UDPStream')
      throw err
    }
  }
}

export default FlightVisualizerServer
