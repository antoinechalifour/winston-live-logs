const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const ip = require('ip')
const socketIo = require('socket.io')
const uuid = require('node-uuid')

const app = express()
const port = process.env.PORT || 6000

const server = app
  .use(cors())
  .use(bodyParser.json())
  .post('/logs/:code', (req, res) => {
    console.log(req.body)
    const data = Object.assign(
      {},
      req.body,
      { code: req.params.code, id: uuid.v4() }
    )
    io.emit('logs:new', data)
  })
  .listen(port, () => {
    console.log('Server running.')
    console.log('Send your logs to:')
    console.log(`* http://localhost:${port}`)
    console.log(`* http://${ip.address()}:${port}`)
    console.log('Live preview at:')
    console.log(`* http://${ip.address()}:${Number(port) + 1}`)
  })

const io = socketIo(server)
