import SocketIO from 'socket.io'

const createSocketServer = ({ http, logger }) => {
  const io = SocketIO(http)

  io.on('connection', (socket) => {
    logger.info('Client connected:' + socket.id)
    socket.on('disconnect', () => {
      logger.info('Client disconnected:', socket.id)
    })
  })
}

export default createSocketServer
