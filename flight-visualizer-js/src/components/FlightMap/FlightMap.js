import 'leaflet/dist/leaflet.css'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import React, { Component } from 'react'
import { keys, map, values } from 'ramda'

import L from 'leaflet'
import PropTypes from 'prop-types'
import markerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png'
import markerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png'

const DEFAULT_VIEWPORT = {
  center: [51.505, -0.09],
  zoom: 13
}

const myIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: markerShadow,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
})

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
          <Marker
            draggable={this.state.draggable}
            icon={myIcon}
            onDragend={this.updateMarkerPosition}
            ref={this.refmarker}
            position={values(this.state.marker)}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
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
