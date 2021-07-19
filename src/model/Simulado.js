const mongoose = require('mongoose')

const simuladoSchema = new mongoose.Schema({
  cpf: {type: String, required: true},
  celular: {type: String, required: true},
  email: {type: String},
  carreira: String,
  valor_beneficio: String,
  status: {type:String, default: "Em Análise"},
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Simulado', simuladoSchema)