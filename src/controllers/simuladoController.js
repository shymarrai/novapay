const Simulado = require('../model/Simulado')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

module.exports = {
  saveSimulado: async function (req,res){    
    if(req.body.email == "" || req.body.celular == "" || req.body.cpf == "" || req.body.carreira == ""  || req.body.valor_beneficio == "" ) return res.redirect('/')
    if(req.body.accepted !== "accepted") return res.redirect('/')
    if(req.body.accepted === undefined || req.body.accepted === null || req.body.accepted == '') return res.redirect('/')
    
    const simulado = new Simulado({
      cpf: jwt.sign(req.body.cpf, process.env.SECRET),
      celular: jwt.sign(req.body.celular, process.env.SECRET),
      email: jwt.sign(req.body.email, process.env.SECRET),
      carreira: jwt.sign(req.body.carreira, process.env.SECRET),
      valor_beneficio: jwt.sign(req.body.valor, process.env.SECRET),
    })
    try {

      const savedSimulado = await simulado.save()
      
      res.send(savedSimulado)
    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  },
  search: async function (req,res){    
    if(req.body.cpf_consulta == "" ) return res.redirect('/simulado')
    if(req.body.accepted !== "accepted") return res.redirect('/acompanhar_proposta')
    if(req.body.accepted === undefined || req.body.accepted === null || req.body.accepted == '') return res.redirect('/acompanhar_proposta')

    try {
      const createdClient = await Simulado.findOne({ cpf:  jwt.sign(req.body.cpf_consulta, process.env.SECRET) })
      res.send(createdClient.status)
    } catch (error) {
      console.log(error)
      return res.redirect('/simulado')
    }
  }
}