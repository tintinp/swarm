import React, { Component } from 'react'
import { keys, map } from 'ramda'

import PropTypes from 'prop-types'

class MoveUAV extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedID: ''
    }
  }

  incrementPosition() {
    const uav = this.props.uavs[this.state.selectedID]
    return {
      lat: uav.position.lat + 0.01,
      lon: uav.position.lon + 0.01
    }
  }

  onChange = (event) => {
    this.setState({ selectedID: event.target.value })
  }

  onClick = () => {
    if (this.state.selectedID !== '') {
      const newPosition = this.incrementPosition()
      this.props.updateUAVPosition(this.state.selectedID, newPosition)
    }
  }

  mapKeysToOptions = () => {
    return map((id) => {
      return (
        <option key={id} value={id}>
          {id}
        </option>
      )
    }, keys(this.props.uavs))
  }

  render() {
    return (
      <div>
        <select name="uavs" id="uav-select" value={this.state.selectedID} onChange={this.onChange}>
          <option value="">--Please choose an UAV--</option>
          {this.mapKeysToOptions()}
        </select>
        <button className="incr" onClick={this.onClick}>
          Move UAV
        </button>
      </div>
    )
  }
}

MoveUAV.propTypes = {
  uavs: PropTypes.object.isRequired,
  updateUAVPosition: PropTypes.func.isRequired
}

export default MoveUAV
