#!/usr/bin/env node

const { FlightVisualizerServer, normalizePort } = require('..')
const Pino = require('pino')
const Yargs = require('yargs')
const config = Yargs.env(false)
  .option('udp', {
    alias: 'u',
    default: '10.42.0.255:50000',
    describe: 'udp address:port'
  })
  .option('port', {
    alias: 'p',
    default: 5000,
    describe: 'server port'
  })
  .help('h').argv

const logger = Pino()

const main = async () => {
  const [address, port] = config.udp.split(':')
  const flightVisualizerServer = new FlightVisualizerServer(
    {
      udpBroadcast: {
        address: address,
        port: port
      },
      port: normalizePort(config.port)
    },
    { logger: logger }
  )

  flightVisualizerServer.start().catch((err) => {
    logger.error(err.message)
    process.exit(1)
  })

  process.on('SIGINT', () => {
    // Set timeout in case things are not shut down properly
    const timer = setTimeout(() => {
      process.exit(1)
    }, 10000)

    flightVisualizerServer
      .stop()
      .then(() => {
        clearTimeout(timer)
        process.exit(1)
      })
      .catch((err) => {
        logger.error(err)
        process.exit(1)
      })
  })

  process.on('SIGTERM', () => {
    process.exit(1)
  })

  process.on('SIGQUIT', () => {
    process.exit(1)
  })
}

module.exports = main()
