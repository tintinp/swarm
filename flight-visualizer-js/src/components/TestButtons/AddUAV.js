import React, { Component } from 'react'

import PropTypes from 'prop-types'

class AddUAV extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currID: ''
    }
  }

  handleChange = (event) => {
    this.setState({ currID: event.target.value })
  }

  onClick = () => {
    if (this.state.currID !== '') {
      this.props.addDefaultUAV(this.state.currID)
      this.setState({ currID: '' })
    }
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.currID} onChange={this.handleChange} />
        <button className="incr" onClick={this.onClick}>
          Add UAV
        </button>
      </div>
    )
  }
}

AddUAV.propTypes = {
  addDefaultUAV: PropTypes.func.isRequired
}

export default AddUAV
