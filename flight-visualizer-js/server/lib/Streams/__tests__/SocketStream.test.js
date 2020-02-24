describe('SocketStream', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('Should instantiate without error', async () => {
    const SocketStream = require('../SocketStream').default

    const context = { debug: true, logger: console }
    const result = new SocketStream(
      {
        httpServer: {}
      },
      context
    )
    expect(result).toBeInstanceOf(SocketStream)
  })
})
