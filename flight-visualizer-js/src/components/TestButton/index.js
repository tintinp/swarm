import React, { Component } from 'react'

class TestButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        lat: 51.505,
        lon: -0.09
      }
    }
  }

  handleChangePosition() {
    this.setState((prevState) => {
      const newPos = {
        lat: prevState.position.lat + 0.01,
        lon: prevState.position.lon + 0.01
      }
      return { position: newPos }
    })
  }

  render() {
    return (
      <div>
        <button className="incr" onClick={this.handleChangePosition}>
          Change position
        </button>
      </div>
    )
  }
}

export default TestButton
