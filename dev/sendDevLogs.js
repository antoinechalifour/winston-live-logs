const faker = require('faker')
const winston = require('winston')
const CustomHttpTransport = require('./CustomHttpTransport')

const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT

const codes = ['auth', 'notes', 'users']
const loggers = codes.map(
  code => new winston.Logger({
    transports: [
      new CustomHttpTransport({
        host,
        port,
        path: `/logs/${code}`,
        name: code
      })
    ]
  })
)

setInterval(() => {
  const logger = loggers[Math.floor(Math.random(loggers.length))]

  let level
  let log
  const random = Math.random()
  if (random < 0.1) {
    level = 'error'
    log = new Error(faker.lorem.sentence())
  } else if (random < 0.2) {
    level = 'warn'
    log = faker.lorem.sentences(4)
  } else if (random < 0.5) {
    level = 'debug'
    log = faker.lorem.words(2)
  } else {
    level = 'info'
    log = faker.lorem.sentence()
  }

  logger[level](log)
}, 1000)
