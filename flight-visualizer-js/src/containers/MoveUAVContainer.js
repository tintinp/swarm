import MoveUAV from '../components/TestButtons/MoveUAV'
import { changeUAVPosition } from '../redux/actions/uavActions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  uavs: state.uavs
})

const mapDispatchToProps = (dispatch) => ({
  updateUAVPosition: (id, position) => {
    dispatch(changeUAVPosition({ id, position: position }))
  }
})

const MoveUAVContainer = connect(mapStateToProps, mapDispatchToProps)(MoveUAV)

export default MoveUAVContainer
