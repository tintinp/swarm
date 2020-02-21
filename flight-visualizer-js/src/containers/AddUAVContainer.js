import AddUAV from '../components/TestButtons/AddUAV'
import { addUAV } from '../redux/actions/uavActions'
import { connect } from 'react-redux'

const DEFAULT_POSITION = {
  lat: 51.505,
  lon: -0.09
}

const mapDispatchToProps = (dispatch) => ({
  addDefaultUAV: (id) => {
    dispatch(addUAV({ id, position: DEFAULT_POSITION }))
  }
})

export default connect(null, mapDispatchToProps)(AddUAV)
