import UAVS from '../components/UAVS/UAVS'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  uavs: state.uavs
})

const UAVSContainer = connect(mapStateToProps, null)(UAVS)

export default UAVSContainer
