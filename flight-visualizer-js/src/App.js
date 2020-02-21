import './App.css'

import React, { Component } from 'react'

import AddUAVContainer from './containers/AddUAVContainer'
import FlightMapContainer from './containers/FlightMapContainer'
import MoveUAVContainer from './containers/MoveUAVContainer'

class App extends Component {
  render() {
    return (
      <div>
        Flight Visualizer JS
        <FlightMapContainer />
        <AddUAVContainer />
        <MoveUAVContainer />
      </div>
    )
  }
}

export default App
