const express = require('express')
const ClientController = require('../controllers/ClientController')
const AdminController = require('../controllers/AdminController')
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
server.post('/simulado', ClientController.saveSimulado)


server.get('/acompanhar_proposta', (req, res) => {
  res.render('proposta')
})
server.post('/acompanhar_proposta', ClientController.search)


server.get('/limite_de_compra', (req, res) => {
  res.render('limite')
})
server.post('/limite_de_compra', ClientController.saveLimite )



server.get('/contato', (req, res) => {
  res.render('contato')
})
server.get('/politica', (req, res) => {
  res.render('politica')
})

server.get('/login', AdminController.logar)
server.post('/login', AdminController.login)
server.get('/save', AdminController.save)



server.get('/admin/:token/:username', AdminController.admin)


server.post('/admin/:token/site/:username', AdminController.updateSite)
server.post('/admin/:token/user/:username', AdminController.updateUser)


module.exports = server