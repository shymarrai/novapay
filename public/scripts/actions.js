const div_cpf = document.getElementById('div_cpf')
const div_contato = document.getElementById('div_contato')
const div_carreira = document.getElementById('div_carreira')
const div_beneficio = document.getElementById('div_beneficio')

function menu(){
  const menu_hamburger_abrir = document.querySelector('#menu-abrir')
  const menu_hamburger_fechar = document.querySelector('#menu-fechar')
  const menu = document.querySelector('.menu')

  menu_hamburger_abrir.classList.toggle("disabled");
  menu_hamburger_fechar.classList.toggle("disabled");
  menu.classList.toggle("disabled");

}

div_cpf.classList.add('enable')
div_contato.classList.add('disable')
div_carreira.classList.add('disable')
div_beneficio.classList.add('disable')

function verifyPassQuestionButton1(){

  const button1 = document.getElementById('proximo1')
  const campoCpf = document.getElementById('cpf')

  if(campoCpf.value.length === 14){
    button1.disabled = false
    campoCpf.style.border = '3px solid #61b161';
  }else{
    button1.disabled = true
    campoCpf.style.border = '3px solid tomato';
  }
  
}

function passQuestionButton1(){
  
  div_cpf.classList.remove('enable')
  div_cpf.classList.add('disable')
  
  
  div_contato.classList.remove('disable')
  div_contato.classList.add('enable')

}













function verifyPassQuestionButton2(){
  const button2 = document.getElementById('proximo2')
  const celular = document.getElementById('celular')
  const email = document.getElementById('email')
  const verifyEmail = validacaoEmail(email)
  const msgemail = document.getElementById("msgemail")
  
  if(msgemail.innerHTML.indexOf('verifique')){
    msgemail.innerHTML = `Esse será o nosso principal canal de comunicação com você, portanto,
          é muito importante que esteja correto..
          <br />O Email é opcional.<br/>`
  }

  if(verifyEmail === false){
    msgemail.innerHTML =  msgemail.innerHTML+"<br/>Email inválido, por favor verifique"
    email.style.border = '3px solid tomato';
  }else if(verifyEmail === true){
    email.style.border = '3px solid #61b161';
    msgemail.innerHTML = `Esse será o nosso principal canal de comunicação com você, portanto,
    é muito importante que esteja correto..
    <br />O Email é opcional.<br/>`
  }

  if(celular.value.length === 15 && celular.value[5] === '9'){
    celular.style.border = '3px solid #61b161'
    button2.innerText = "Próximo"
  }

  if(celular.value.length === 15 && celular.value[5] === '9' && verifyEmail === true){
    button2.disabled = false
    celular.style.border = '3px solid #61b161';
    button2.innerText = "Próximo"
  }else if(celular.value[5] !== '9'){
    
    button2.innerText = "O número do celular com o DDD precisa ter 11 dígitos"

    button2.disabled = true
    celular.style.border = '3px solid tomato';
  }else if(verifyEmail !== true && celular.value.length !== 15){
    button2.innerText = "Próximo"
    celular.style.border = '3px solid tomato';
    button2.disabled = true
  }


  
}



function passQuestionButton2(){
  
  div_contato.classList.remove('enable')
  div_contato.classList.add('disable')
  
  
  div_carreira.classList.remove('disable')
  div_carreira.classList.add('enable')

}




function verifyPassQuestionButton3(){
  const carreira = document.querySelector('#carreira');
  const button3 = document.getElementById("proximo3")

  if(carreira.value !== ''){
    button3.disabled = false
  }
}

function passQuestionButton3(){
  div_carreira.classList.remove('enable')
  div_carreira.classList.add('disable')
  
  div_beneficio.classList.remove('disable')
  div_beneficio.classList.add('enable')

}




function verifyPassFormAccepted(){
  const valor = document.querySelector('#valor');
  const accepted = document.querySelector('#accepted');
  const buttonEnviar = document.getElementById("enviar")
  
  if(valor.value !== '' && valor.value !== ' ' && accepted.checked ){
    buttonEnviar.disabled = false
  }else{
    buttonEnviar.disabled = true
  }
}





function sendForm(){
  const cpf = document.getElementById('cpf')
  const celular = document.getElementById('celular')
  const email = document.getElementById('email')
  const carreira = document.getElementById('carreira')
  const valor = document.getElementById('valor')
  const politica = document.getElementById('politica')
  const buttonEnviar = document.getElementById("enviar")

  if(politica.innerHTML.indexOf('carreira') || politica.innerHTML.indexOf('cpf') || politica.innerHTML.indexOf('contato') || politica.innerHTML.indexOf('valor')){
    politica.innerHTML = `Ao continuar você aceita as nossas
    <a href='/politica' target='_blank'>Políticas de Privacidade</a>`
  }
  if((celular.value == '' || celular.length < 11) || email.value == '' || email.indexOf('@') || email.indexOf('.com') ){
    politica.innerHTML = politica.innerHTML+"<br/> Falta informação de contato, por favor verifique 🙂"
    buttonEnviar.disabled = true
  }

  if(carreira.value == '' || carreira.length < 0){
    politica.innerHTML = politica.innerHTML+"<br/> Falta informação de carreira, por favor verifique 🙂"
    buttonEnviar.disabled = true
  }

  if(valor.value == '' || valor.length < 0){
    politica.innerHTML = politica.innerHTML+"<br/> Falta informação de valor, por favor verifique 🙂"
    buttonEnviar.disabled = true
  }

  if(cpf.value == '' || cpf.length < 0){
    politica.innerHTML = politica.innerHTML+"<br/> Falta informação de cpf, por favor verifique 🙂"
    buttonEnviar.disabled = true
  }

}



function accepted(){
  const wanning = document.querySelector('footer')
  wanning.classList.add('disabled')
}

function validacaoEmail(field) {
  usuario = field.value.substring(0, field.value.indexOf("@"));
  dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
  
  if ((usuario.length >=1) &&
      (dominio.length >=3) &&
      (usuario.search("@")==-1) &&
      (dominio.search("@")==-1) &&
      (usuario.search(" ")==-1) &&
      (dominio.search(" ")==-1) &&
      (dominio.search(".")!=-1) &&
      (dominio.indexOf(".") >=1)&&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return true
    }
    else{

    return false
    }
  }



