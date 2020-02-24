describe('SocketStream', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('Should instantiate without error', async () => {
    const SocketStream = require('../SocketStream').default

    const context = { debug: true, logger: console }
    const socketStream = new SocketStream(
      {
        httpServer: {}
      },
      context
    )
    expect(socketStream).toBeInstanceOf(SocketStream)
  })
})
