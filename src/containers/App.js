import React, { Component } from 'react'
import io from 'socket.io-client'
import Layout from '../components/Layout'

const serverHost = __SERVER_HOST__ // eslint-disable-line
const serverPort = __SERVER_PORT__ // eslint-disable-line

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logs: [],
      filterCode: '',
      filterLevel: {},
      codes: new Set(),
      levels: new Set()
    }

    this.updateLevelFilter = this.updateLevelFilter.bind(this)
    this.updateCodeFilter = this.updateCodeFilter.bind(this)
  }

  updateCodeFilter (code, active) {
    console.log(filter)
  }

  updateLevelFilter (level, active) {
    const newFilter = Object.assign({}, this.state.filterLevel, { [level]: active })
    this.setState({ filterLevel: newFilter })
  }

  componentDidMount () {
    const serverUri = `http://${serverHost}:${serverPort}`
    const socket = io(serverUri)

    socket.on('logs:new', data => {
      const currentLogs = this.state.logs
      const currentCodes = this.state.codes
      const currentLevels = this.state.levels

      this.setState({
        logs: [data, ...currentLogs],
        codes: new Set([data.code, ...currentCodes]),
        levels: new Set([data.level, ...currentLevels])
      })
    })
  }

  render () {
    const { logs, levels, codes, filterLevel } = this.state
    let logsToDisplay

    const isFiltered = Object.keys(filterLevel)
      .reduce((concat, key) => concat || filterLevel[key], false)
    if (isFiltered) {
      logsToDisplay = logs.filter(l => filterLevel[l.level])
    } else {
      logsToDisplay = logs
    }

    return (
      <Layout
        logs={logsToDisplay}
        levels={Array.from(levels).sort()}
        codes={Array.from(codes).sort()}
        updateCodeFilter={this.updateCodeFilter}
        updateLevelFilter={this.updateLevelFilter}
      />
    )
  }
}
