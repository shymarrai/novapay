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
server.get('/contato', (req, res) => {
  res.render('contato')
})
server.get('/politica', (req, res) => {
  res.render('politica')
})
server.get('/acompanhar_proposta', (req, res) => {
  res.render('proposta')
})
server.get('/limite_de_compra', (req, res) => {
  res.render('limite')
})




module.exports = server