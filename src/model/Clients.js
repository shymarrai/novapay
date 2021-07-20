const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  cpf: {type: String, required: true},
  celular: {type: String, required: true},
  email: {type: String},
  carreira: String,
  valor_beneficio: String,
  status: {type:String, default: "Em Análise"},
  servico: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Client', clientSchema)