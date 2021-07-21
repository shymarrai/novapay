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
    const teste = req.body.teste
    console.log(teste)
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
        console.log('aq')
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
      res.redirect(`/admin/${token}/excluir/${username}/${value}`)
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
    
    const style = `  
    background-color: var(--azul);
    border: none;
    height: 6vh;
    width: 30%;
    margin: 0 auto;
    color: var(--branco);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    `
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!userVerified) return res.redirect('/login')

    const selectedAdmin = await Admin.findOne({ username })
    try{
      await Client.findByIdAndDelete(value)
      const result = await Client.find({}).sort({"_id" : -1})
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
  }
}