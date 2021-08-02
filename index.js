const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes')
require('dotenv').config()
const server = express();

const HOST = '0.0.0.0';

//conexão com o banco de dados
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    if (error) { console.log(error) }

    else { console.log('Mongo Connected') }

  })
  // habilitando uma função deprecated do mongoose para update
  mongoose.set('useFindAndModify', false);  

  //escolhendo template engine
  server.set('view engine', 'ejs')
  
  //habilitador os arquivos static
  server.use(express.static("public"))
  
  //usar o req.body
  server.use(express.urlencoded({ extend: true }))
  
  //routes
  server.use(routes)

  //ouvindo a porta
  server.listen(process.env.PORT, HOST)