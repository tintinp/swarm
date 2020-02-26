import handleUAV from './handleUAV'
import io from 'socket.io-client'
import { normalizePort } from '../utils'

const createSocket = ({ dispatch }) => {
  const port = normalizePort(process.env.PORT || '5000')
  const uri = 'http://localhost:' + port
  const socket = io.connect(uri)
  handleUAV({ dispatch, socket })
}

export default createSocket
