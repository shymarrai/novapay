const Admin = require('../model/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



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


      res.render('admin', { token, selectedAdmin})
  
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
        password: newPassword,
      }
      let doc = await Admin.updateOne({_id: selectedAdmin.id},admin);
      return res.redirect(`/admin/${token}/${selectedAdmin.username}`)
    }catch(error) {
      console.log(error)
      res.render(error)
    }
  }
}