import './App.css'

import React, { Component } from 'react'

import FlightMap from './components/FlightMap'
import TestButton from './components/TestButton'

class App extends Component {
  render() {
    return (
      <div>
        Flight Visualizer JS
        <FlightMap />
        <TestButton />
      </div>
    )
  }
}

export default App
