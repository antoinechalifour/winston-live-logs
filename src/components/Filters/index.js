import React, { Component } from 'react'

export default class Filters extends Component {
  constructor(props) {
    super(props)

    this.levels = {}

    this.onLevelClick = this.onLevelClick.bind(this)
  }

  onLevelClick (e, level) {
    const { updateLevelFilter } = this.props

    updateLevelFilter(level, e.target.checked)
  }

  render () {
    const style = require('./filters.css')
    const { codes, levels } = this.props

    return (
      <div className={style['filters-box']}>
        <div className={style['filter-wrapper']}>
          <div>Levels</div>
          <div className={style.filters}>
            {levels.map(level => (
              <div key={level}>
                <label>{level}</label>
                <input
                  type='checkbox'
                  value={level}
                  ref={e => this.levels[level] = e}
                  onClick={(e) => this.onLevelClick(e, level)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={style['filter-wrapper']}>
          <div>Codes</div>
          <div className={style.filters}>
            {codes.map(code => (
              <div key={code}>
                <label>{code}</label>
                <input type='checkbox' value={code} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
