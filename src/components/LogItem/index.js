import React, { Component } from 'react'
import classnames from 'classnames'
import moment from 'moment'

export default class LogItem extends Component {
  renderStack () {
    const style = require('./log-item.css')
    const { stack } = this.props

    if (typeof stack === 'undefined') {
      return null
    }

    return (
      <pre className={style.stack}>
        {stack}
      </pre>
    )
  }

  render () {
    const style = require('./log-item.css')
    const { level, message, code, timestamp } = this.props

    const stackContent = this.renderStack()

    return (
      <div className={classnames(style.log, style[`log--${level}`])}>
        <div className={style.header}>
          <h1>{code}</h1>
          <p className={style.date}>{moment(timestamp).fromNow()} ({moment(timestamp).format('X')})</p>
        </div>
        <div className={style.content}>
          <p>{message}</p>
          {stackContent}
        </div>
      </div>
    )
  }
}
