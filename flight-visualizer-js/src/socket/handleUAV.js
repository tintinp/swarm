import { changeUAVPosition } from '../redux/actions/uavActions'

const handleUAV = ({ dispatch, socket }) => {
  socket.on('updateUAV', (uav) => {
    dispatch(changeUAVPosition({ id: uav.id, position: uav.position }))
  })
}

export default handleUAV
