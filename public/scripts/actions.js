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

  const button = document.getElementById('proximo1')
  const campo = document.getElementById('cpf')
  const campoNumbers = campo.value.replace(/[^\d]+/g,'')
  

  if(campo.value.length === 14 && validarCPF(campoNumbers)){
    button.disabled = false
    campo.style.border = '3px solid #61b161';
  }else{
    button.disabled = true
    campo.style.border = '3px solid tomato';
  }
  
}

function pass(div_atual, div_proxima){
  
  div_atual.classList.remove('animate__bounceInRight')
  div_atual.classList.add('animate__bounceOutLeft')
  
  setTimeout(() => {
    div_atual.classList.remove('enable')
    div_atual.classList.add('disable')
  }, 600)
  setTimeout(() => {
    div_proxima.classList.remove('disable')
    div_proxima.classList.add('enable')
    div_proxima.classList.add('animate__bounceInRight')
  }, 600)
  

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

function verifyPassQuestionButton3(){
  const carreira = document.querySelector('#carreira');
  const button3 = document.getElementById("proximo3")

  if(carreira.value !== ''){
    button3.disabled = false
  }
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




function verifyConsult(){
  const cpf = document.getElementById('cpf_consulta')
  const consultar = document.getElementById('consultar')
  const accepted = document.getElementById('accepted')

  const campoNumbers = cpf.value.replace(/[^\d]+/g,'')
  
  if(cpf.value.length === 14 && validarCPF(campoNumbers)){
    cpf.style.border = '3px solid #61b161';
    if(accepted.checked){
      consultar.disabled = false
    }
  }else{
    cpf.style.border = '3px solid tomato';
    consultar.disabled = true
  }  

  if(!accepted.checked){
    consultar.disabled = true
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



  function validarCPF(cpf) {	
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999")
        return false;		
    // Valida 1o digito	
    add = 0;	
    for (i=0; i < 9; i ++)		
      add += parseInt(cpf.charAt(i)) * (10 - i);	
      rev = 11 - (add % 11);	
      if (rev == 10 || rev == 11)		
        rev = 0;	
      if (rev != parseInt(cpf.charAt(9)))		
        return false;		
    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
      add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
      rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
      return false;		
    return true;   
  }