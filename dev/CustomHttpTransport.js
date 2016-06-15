const utils = require('util')
const axios = require('axios')
const winston = require('winston')

const CustomHttpLogger = function ({
  name,
  level = 'debug',
  host = 'localhost',
  port = 80,
  path = '/logs'
}) {
  this.name = name || 'CustomHttpLogger'
  this.level = level
  this.host = host
  this.port = port
  this.path = path
}

utils.inherits(CustomHttpLogger, winston.Transport)

CustomHttpLogger.prototype.log = function (level, message, meta, callback) {
  let err

  if (meta instanceof Error) {
    err = {
      stack: meta.stack,
    }
  }

  message = message || meta.message

  const data = Object.assign(
    {},
    meta,
    err,
    { level, message, timestamp: new Date }
  )

  axios.post(`http://${this.host}:${this.port}${this.path}`, data)

  callback(null, true)
}

module.exports = CustomHttpLogger
