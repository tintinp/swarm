import './App.css'
import 'leaflet/dist/leaflet.css'

import React, { Component } from 'react'

import FlightMap from './components/FlightMap'

class App extends Component {
  render() {
    return (
      <div>
        Flight Visualizer JS
        <FlightMap />
      </div>
    )
  }
}

export default App
