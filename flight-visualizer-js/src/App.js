import './App.css'

import React, { Component } from 'react'

import AddUAVContainer from './containers/AddUAVContainer'
import FlightMapContainer from './containers/FlightMapContainer'

class App extends Component {
  render() {
    return (
      <div>
        Flight Visualizer JS
        <FlightMapContainer />
        <AddUAVContainer />
      </div>
    )
  }
}

export default App
