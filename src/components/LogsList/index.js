import React, { Component } from 'react'
import LogItem from '../LogItem'

export default class LogsList extends Component {
  render () {
    const style = require('./logs-list.css')
    const { logs } = this.props

    return (
      <div>
        <h1>Logs list</h1>
        <div className={style.list}>
          {logs.map(log => (
            <LogItem
              key={log.id}
              {...log}
            />
          ))}
        </div>
      </div>
    )
  }
}
