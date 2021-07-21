const Admin = require('../model/Admin')
const Client = require('../model/Clients')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function convertData(data){
  let resultConvert = data.map(client => {
          
    return {
      id : client.id,
      cpf : jwt.verify(client.cpf, process.env.SECRET),
      celular : jwt.verify(client.celular, process.env.SECRET),
      email : jwt.verify(client.email, process.env.SECRET),
      carreira : jwt.verify(client.carreira, process.env.SECRET),
      valor_beneficio : jwt.verify(client.valor_beneficio, process.env.SECRET),
      status: client.status,
      servico: client.servico,
      created_at: client.created_at
    }
  })

  return resultConvert
}

module.exports = {
  logar: function (req, res) {
    return res.render('login')
  },
  login: async function (req, res) {

    const selectedAdmin = await Admin.findOne({ username: req.body.username })
    if (!selectedAdmin) return res.send("Usuário ou senha inexistente")


    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedAdmin.password)
    if (!passwordAndUserMatch) return res.send("Usuário ou senha inexistente")

    const token = jwt.sign({ _id: selectedAdmin.id }, process.env.TOKEN_SECRET, { expiresIn: 86400 })

    // res.header("Access-Control", token)
    return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
  },
  save: async function (req, res) {
    const selectedAdmin = await Admin.findOne({ username: req.body.username })
    if (selectedAdmin) return res.send("Usuário existente")

    const admin = new Admin({
      name: 'Desenvolvedor',
      username: 'shymarrai',
      password: bcrypt.hashSync('senha123'),
      email: 'icestonebruno@gmail.com',
      number: '5521976738943',
      token_api: 'teste',
    })
    try {

      const savedAdmin = await admin.save()
      res.redirect('/login')
    } catch (error) {
      res.send('erro')
    }

  },
  admin: async function (req, res) {
    const token = req.params.token
    const username = req.params.username
  
    try{
      const selectedAdmin = await Admin.findOne({ username })
      if(!selectedAdmin) return res.redirect('/login')

      let resultConvert = ''
      res.render('admin', { token, selectedAdmin, resultConvert})
  
    }catch{
      res.redirect('/login')
    }
  
  },
  updateSite: async function (req, res) {
    const token = req.params.token
    const username = req.params.username
    const email = req.body.email
    const zap = req.body.zap

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if(!userVerified) return res.redirect('/login')

      const selectedAdmin = await Admin.findOne({ username })

      const admin = {
        email: email,
        number: zap,
      }
      let doc = await Admin.updateOne({_id: selectedAdmin.id},admin);
      return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
    }catch(error) {
      console.log(error)
      res.render(error)
    }
  },
  updateUser: async function (req, res) {
    const token = req.params.token
    const username = req.params.username
    const newUsername = req.body.username
    const newPassword = req.body.password

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if(!userVerified) return res.redirect('/login')

      const selectedAdmin = await Admin.findOne({ username })

      const admin = {
        username: newUsername,
        password: bcrypt.hashSync(newPassword),
      }
      let doc = await Admin.updateOne({_id: selectedAdmin.id},admin);
      return res.redirect('/login')
    }catch(error) {
      console.log(error)
      res.render(error)
    }
  },
  searchClient: async function (req, res) {
    const campo = req.body.campo
    const value = req.body.value
    const token = req.params.token
    const username = req.params.username
    
    
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!userVerified) return res.redirect('/login')

    const selectedAdmin = await Admin.findOne({ username })

    
    if(campo == 'todos'){
      try{


        const result = await Client.find({}).sort({"_id" : -1})
        let resultConvert = convertData(result)
        res.render('admin', { token, selectedAdmin, resultConvert})
      }catch(e){
        console.log(e)
        return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
      }
    }else{
      try{
        const filtro =  campo === "id" ? {"_id": value} :
        campo === "cpf" ? {"cpf": jwt.sign(value, process.env.SECRET)} : 
        campo === "celular" ? {"celular": jwt.sign(value, process.env.SECRET)} : 
        campo === "email" ? {"email": jwt.sign(value, process.env.SECRET)} : 
        campo === "carreira" ? {"carreira": jwt.sign(value, process.env.SECRET)} : 
        campo === "valor_beneficio" ? {"valor_beneficio": jwt.sign(value, process.env.SECRET)} : 
        campo === "status" ? {"status": value} : 
        campo === "servico" ? {"servico": value} : {}

        const result = await Client.find(filtro).sort({"_id" : -1})
        let resultConvert = convertData(result)

        res.render('admin', { token, selectedAdmin, resultConvert})
      }catch(e){
        console.log(e)
        return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
      }
    }
  }
}