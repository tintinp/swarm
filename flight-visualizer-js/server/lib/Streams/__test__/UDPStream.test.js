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
})
