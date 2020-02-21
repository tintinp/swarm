import 'leaflet/dist/leaflet.css'

import { Map, TileLayer } from 'react-leaflet'
import React, { Component } from 'react'
import { keys, map } from 'ramda'

import PropTypes from 'prop-types'
import UAVSContainer from '../../containers/UAVSContainer'

const DEFAULT_VIEWPORT = {
  center: [51.505, -0.09],
  zoom: 13
}

class FlightMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      draggable: true,
      marker: {
        lat: 51.505,
        lon: -0.09
      },
      viewport: DEFAULT_VIEWPORT
    }
  }

  render() {
    const { uavs } = this.props
    return (
      <div>
        <Map className="map" viewport={this.state.viewport}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UAVSContainer />
        </Map>
        <ul>
          ID: Position
          {map((key) => {
            return (
              <div key={key}>
                {key}: {uavs[key].position.lat}, {uavs[key].position.lat}
              </div>
            )
          }, keys(uavs))}
        </ul>
      </div>
    )
  }
}

FlightMap.propTypes = {
  uavs: PropTypes.object.isRequired
}

export default FlightMap
