const express = require('express')
require('dotenv').config()
const server = express()

server.use(express.json())
server.use(express.urlencoded())

server.get('/', (req, res) => {
  res.render('index')
})
server.get('/simulado', (req, res) => {
  res.render('simulado')
})
module.exports = server