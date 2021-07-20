const Client = require('../model/Clients')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

module.exports = {
  saveSimulado: async function (req,res){    
    if(req.body.email == "" || req.body.celular == "" || req.body.cpf == "" || req.body.carreira == ""  || req.body.valor_beneficio == "" ) return res.redirect('/')
    if(req.body.accepted !== "accepted") return res.redirect('/')
    if(req.body.accepted === undefined || req.body.accepted === null || req.body.accepted == '') return res.redirect('/')
    
    const client = new Client({
      cpf: jwt.sign(req.body.cpf, process.env.SECRET),
      celular: jwt.sign(req.body.celular, process.env.SECRET),
      email: jwt.sign(req.body.email, process.env.SECRET),
      carreira: jwt.sign(req.body.carreira, process.env.SECRET),
      valor_beneficio: jwt.sign(req.body.valor, process.env.SECRET),
      servico: "Simular Empréstimo"
    })
    try {

      const savedClient = await client.save()
      
      const message = ["Seus dados foram salvos com sucesso!😄","Aguarde que entraremos em contato com mais informações!😄"]
      const title = "Parabéns!"
      const urlDirection = "/"
      const urlText = "Voltar"
      res.render("message",{title,message,urlDirection,urlText})

    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  },
  saveLimite: async function (req, res){
    if(req.body.email == "" || req.body.celular == "" || req.body.cpf == "" || req.body.carreira == ""  || req.body.valor_beneficio == "" ) return res.redirect('/')
    if(req.body.accepted !== "accepted") return res.redirect('/')
    if(req.body.accepted === undefined || req.body.accepted === null || req.body.accepted == '') return res.redirect('/')
    const client = new Client({
      cpf: jwt.sign(req.body.cpf, process.env.SECRET),
      celular: jwt.sign(req.body.celular, process.env.SECRET),
      email: jwt.sign(req.body.email, process.env.SECRET),
      carreira: jwt.sign(req.body.carreira, process.env.SECRET),
      valor_beneficio: jwt.sign(req.body.valor, process.env.SECRET),
      servico: "Solicitar Limite"
    })
    try {

      const savedClient = await client.save()
      
      const message = ["Seus dados foram salvos com sucesso!😄","Aguarde que entraremos em contato com mais informações!😄"]
      const title = "Parabéns!"
      const urlDirection = "/"
      const urlText = "Voltar"
      res.render("message",{title,message,urlDirection,urlText})

    } catch (error) {
      console.log(error)
      return res.redirect('/')
    }
  },
  search: async function (req,res){    
    if(req.body.cpf_consulta == "" ) return res.redirect('/acompanhar_proposta')
    if(req.body.accepted !== "accepted") return res.redirect('/acompanhar_proposta')
    if(req.body.accepted === undefined || req.body.accepted === null || req.body.accepted == '') return res.redirect('/acompanhar_proposta')

    try {
      const createdClient = await Client.find({ cpf:  jwt.sign(req.body.cpf_consulta, process.env.SECRET) })

      const message = createdClient.map(function(client, i){
        let email = jwt.verify(client.email, process.env.SECRET)
        let celular = jwt.verify(client.celular, process.env.SECRET)
        let cpf = jwt.verify(client.cpf, process.env.SECRET)
        return {
          cpf: `${cpf.substr(0, 3)}.***.***-**`,
          email: `${email.substr(0, 1)}*****${email.substr(email.indexOf("@"), email.length)}`,
          celular: `(**) ***** - ${celular.substr(celular.length - 4, celular.length)}`,
          carreira: jwt.verify(client.carreira, process.env.SECRET),
          valor_beneficio: `R$ ${jwt.verify(client.valor_beneficio, process.env.SECRET)}`,
          status: client.status,
          servico: client.servico
        }
      })
      const title = "Resultado da Consulta!"
      const urlDirection = "/"
      const urlText = "Voltar"

      res.render("resultado",{title,message,urlDirection,urlText})
    } catch (error) {
      console.log(error)
      return res.redirect('/simulado')
    }
  }

}