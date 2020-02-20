import React, { Component } from 'react'

import PropTypes from 'prop-types'

class MoveUAV extends Component {
  constructor(props) {
    super(props)
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

MoveUAV.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default MoveUAV
