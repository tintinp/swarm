import FlightMap from '../components/FlightMap/FlightMap'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  uavs: state.uavs
})

const FlightMapContainer = connect(mapStateToProps, null)(FlightMap)

export default FlightMapContainer
