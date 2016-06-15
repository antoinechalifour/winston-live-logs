import React, { Component } from 'react'
import Filters from '../Filters'
import LogsList from '../LogsList'

export default class Layout extends Component {
  render () {
    const style = require('./layout.css')

    return (
      <div>
        <div className={style.filters}>
          <Filters {...this.props} />
        </div>
        <div className={style.logs}>
          <LogsList {...this.props} />
        </div>
      </div>
    )
  }
}
