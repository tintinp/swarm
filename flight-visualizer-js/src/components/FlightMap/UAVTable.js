import React, { Component } from 'react'
import { keys, map } from 'ramda'

import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  table: {
    minWidth: 650
  }
}

class UAVTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes, uavs } = this.props

    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Latitude</TableCell>
                <TableCell align="right">Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map((id) => {
                return (
                  <TableRow key={id}>
                    <TableCell align="right">{id}</TableCell>
                    <TableCell align="right">{uavs[id].position.lat}</TableCell>
                    <TableCell align="right">{uavs[id].position.lon}</TableCell>
                  </TableRow>
                )
              }, keys(uavs))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

UAVTable.propTypes = {
  classes: PropTypes.object.isRequired,
  uavs: PropTypes.object.isRequired
}

export default withStyles(styles)(UAVTable)
