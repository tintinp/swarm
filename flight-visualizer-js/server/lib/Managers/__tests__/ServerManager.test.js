describe('ServerManager', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('Should instantiate without error', async () => {
    const ServerManager = require('../ServerManager').default

    const context = { debug: true, logger: console }
    const result = new ServerManager(
      {
        port: 5000
      },
      context
    )
    expect(result).toBeInstanceOf(ServerManager)
  })
})
