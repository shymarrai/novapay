const express = require('express')

const ClientController = require('../controllers/ClientController')
const AdminController = require('../controllers/AdminController')

const Admin = require('../model/Admin')
require('dotenv').config()
const server = express()

server.use(express.json())
server.use(express.urlencoded())

const selectedAdmin = async () => { 
  return await Admin.findOne({}).sort({"_id" : -1})
}


server.get('/', async (req, res) => {
  let admin = await selectedAdmin()
  res.render('index', { zap: admin.number})
})



server.get('/simulado', async (req, res) => {
  let admin = await selectedAdmin()

  res.render('simulado',{ zap: admin.number})
})
server.post('/simulado', ClientController.saveSimulado)


server.get('/acompanhar_proposta', async (req, res) => {
  let admin = await selectedAdmin()
  res.render('proposta',{ zap: admin.number})
})
server.post('/acompanhar_proposta', ClientController.search)


server.get('/limite_de_compra', async (req, res) => {
  let admin = await selectedAdmin()
  res.render('limite',{ zap: admin.number})
})
server.post('/limite_de_compra', ClientController.saveLimite )



server.get('/contato', async (req, res) => {
  let admin = await selectedAdmin()
  res.render('contato',{ zap: admin.number})
})

server.post('/send', AdminController.sendMail )

server.get('/politica', async (req, res) => {
  let admin = await selectedAdmin()
  res.render('politica',{ zap: admin.number})
})




// AREA DE ADMINISTRADOR
server.get('/logout', (req, res) => {
    return res.redirect('/login')
})

server.get('/login', AdminController.logar)
server.post('/login', AdminController.login)
server.get('/save', AdminController.save)



server.get('/admin/:token/:username', AdminController.admin)

server.post('/admin/:token/site/:username', AdminController.updateSite)
server.post('/admin/:token/user/:username', AdminController.updateUser)
server.post('/admin/:token/search/:username', AdminController.searchClient)

server.get('/admin/:token/excluir/:username/:value', AdminController.deleteClient)
server.post('/admin/:token/alterar/:username/:value', AdminController.alterClient)


server.get('/admin/:token/get/:username/:value', AdminController.getClient)
server.get('/admin/:token/:username/all', AdminController.allClient)



module.exports = server