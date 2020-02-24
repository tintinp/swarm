describe('UDPStream', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('Should instantiate without error', async () => {
    const UDPStream = require('../UDPStream').default

    const context = { debug: true, logger: console }
    const result = new UDPStream(
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
    expect(result).toBeInstanceOf(UDPStream)
  })

  test('Should start UDP server without error', async () => {
    const UDPStream = require('../UDPStream').default

    const context = { debug: true, logger: console }
    const udpStream = new UDPStream(
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
    const result = await udpStream.start()

    // must end stream (also udp server) for jest
    udpStream.end()
    expect(result).toBe(undefined)
  })
})
