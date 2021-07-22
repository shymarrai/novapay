const Admin = require('../model/Admin')
const Client = require('../model/Clients')
const mail = require('./mail')
const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
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
      username: 'adm',
      password: bcrypt.hashSync('senha123'),
      email: 'novapay@gmail.com',
      number: '5519999117248',
      emailHost: 'smtp.gmail.com',
      emailPort: '465',
      emailPass: jwt.sign('senha123', process.env.SECRET),
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
    const host = req.body.emailHost
    const port = req.body.emailPort
    const emailPass = req.body.emailPass
    const zap = req.body.zap

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if(!userVerified) return res.redirect('/login')

      const selectedAdmin = await Admin.findOne({ username })

      const admin = {
        email: email,
        emailHost: host,
        emailPort: port,
        emailPass: jwt.sign(emailPass, process.env.SECRET),
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
  },
  alterClient: async function (req, res) {
    const value = req.params.value
    const token = req.params.token
    const username = req.params.username

    const cpf = req.body.cpf
    const celular = req.body.celular
    const email = req.body.email
    const carreira = req.body.carreira
    const valor_beneficio = req.body.valor_beneficio
    const status = req.body.status
    const servico = req.body.servico

    // BOTAO DELATAR OU ALTERAR
    const action = req.body.action
    
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!userVerified) return res.redirect('/login')

    const selectedAdmin = await Admin.findOne({ username })

    if(action === 'Deletar'){
      return res.redirect(`/admin/${token}/excluir/${username}/${value}`)
    }

    try{
      const client = {
        cpf: jwt.sign(cpf, process.env.SECRET),
        celular: jwt.sign(celular, process.env.SECRET),
        email: jwt.sign(email, process.env.SECRET),
        carreira: jwt.sign(carreira, process.env.SECRET),
        valor_beneficio: jwt.sign(valor_beneficio, process.env.SECRET),
        status: status,
        servico: servico,
      }
      let doc = await Client.updateOne({"_id": value},client);
      const result = await Client.find({}).sort({"_id" : -1})
      let resultConvert = convertData(result)
      res.render('admin', { token, selectedAdmin, resultConvert})
    }catch(e){
      console.log(e)
      return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
    }

  },
  deleteClient: async function (req, res){
    const value = req.params.value
    const token = req.params.token
    const username = req.params.username
    
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!userVerified) return res.redirect('/login')

    const selectedAdmin = await Admin.findOne({ username })
    try{
      await Client.findByIdAndDelete(value)
      const result = await Client.find({}).sort({"_id" : -1})
      if(!result) return res.redirect(`/admin/${token}/${selectedAdmin.username}`)

      let resultConvert = convertData(result)
      res.render('admin', { token, selectedAdmin, resultConvert})

    }catch(e){
      console.log(e)
      return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
    }
  },
  getClient: async function (req, res){
    const value = req.params.value
    const token = req.params.token
    const username = req.params.username
    
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!userVerified) return res.redirect('/login')

    const selectedAdmin = await Admin.findOne({ username })
    try{
      const result = await Client.find({"_id": value}).sort({"_id" : -1})
      let resultConvert = convertData(result)
      res.json(resultConvert)
    }catch(e){
      console.log(e)
      return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
    }
  },
  allClient: async function (req, res) {
    const value = req.params.value
    const token = req.params.token
    const username = req.params.username
    
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!userVerified) return res.redirect('/login')

    const selectedAdmin = await Admin.findOne({ username })
    try{
      const result = await Client.find({}).sort({"_id" : -1})
      let resultConvert = convertData(result)
      res.json(resultConvert)

    }catch(e){
      console.log(e)
      return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
    }
  },
  sendMail: async function (req, res) {
  const emailClient = req.body.emailClient
  const nameClient = req.body.nameClient
  const telefoneClient = req.body.telefoneClient
  const messageClient = req.body.message


    if(emailClient == '' || nameClient == '' || telefoneClient == '' || messageClient == '') return res.redirect(`/`)

  const selectedAdmin = async () => { 
    return await Admin.findOne({}).sort({"_id" : -1})
  }

  const admin = await selectedAdmin()

  const user = admin.email
  const pass = jwt.verify(admin.emailPass, process.env.SECRET)

  const transporter = nodemailer.createTransport({
    host: admin.emailHost,
    port: admin.emailPort,
    auth: {
      user: user,
      pass: pass
    }
  });

  console.log(`SECRET: ${process.env.SECRET}`)
  console.log(`USER: ${user}`)
  console.log(`PASS: ${pass}`)
  console.log(`CLIENT: ${emailClient}`)
  console.log(`admin.emailHost: ${admin.emailHost}`)
  console.log(`admin.emailPort: ${admin.emailPort}`)
  transporter.sendMail({
    from: user,
    to: user,
    replyTo: emailClient,
    cc: emailClient,
    subject: `Contato com: NOVAPAY: `,
    html: mail.body(messageClient,nameClient, telefoneClient, emailClient)

    }).then(info => {
      console.log(`Enviado: payload-> \n ${info}`)
      res.redirect('/contato')
    }).catch(err => {
      res.send(err)
    })
  }

}