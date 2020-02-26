import { Marker, Popup } from 'react-leaflet'
import React, { Component } from 'react'
import { keys, map, values } from 'ramda'

import L from 'leaflet'
import PropTypes from 'prop-types'
import markerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png'
import markerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png'

const myIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: markerShadow,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
})

class UAVS extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  mapUAVs = () => {
    return map((id) => {
      return (
        <Marker key={id} icon={myIcon} position={values(this.props.uavs[id].position)}>
          <Popup>ID: {id}</Popup>
        </Marker>
      )
    }, keys(this.props.uavs))
  }

  render() {
    return <div>{this.mapUAVs()}</div>
  }
}

UAVS.propTypes = {
  uavs: PropTypes.object.isRequired
}

export default UAVS
