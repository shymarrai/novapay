
function SelectMenu(buttonSelect){
  const buttonSite = document.getElementById('buttonMenuSite')
  const buttonClient = document.getElementById('buttonMenuCliente')
  const buttonUser = document.getElementById('buttonMenuUsuario')
  
  const container_site = document.getElementById('container-admSite')
  const container_client = document.getElementById('container-admCliente')
  const container_user = document.getElementById('container-admUser')
  
  const title = document.getElementById('title')

  if(buttonSelect.value === 'site'){
    // RETIRA O SELECTED DOS OUTROS BUTTONS
    buttonClient.classList.remove('selected')
    buttonUser.classList.remove('selected')

    // ADICIONA O SELECTED NO BUTTON E MOSTRA A DIV DO SITE
    buttonSelect.classList.add('selected')
    container_site.classList.remove('disabled')

    // RETIRA AS DIVS Q NAO SAO SITE
    container_client.classList.add('disabled')
    container_user.classList.add('disabled')

    title.innerText = 'Admin do Site'

  }else if(buttonSelect.value === 'clients'){
    buttonSite.classList.remove('selected')
    buttonUser.classList.remove('selected')
    
    buttonClient.classList.add('selected')
    container_client.classList.remove('disabled')

    container_site.classList.add('disabled')
    container_user.classList.add('disabled')

    title.innerText = 'Admin de Clientes'
  }else if(buttonSelect.value === 'user'){
    buttonSite.classList.remove('selected')
    buttonClient.classList.remove('selected')
    
    buttonUser.classList.add('selected')
    container_user.classList.remove('disabled')

    container_site.classList.add('disabled')
    container_client.classList.add('disabled')
    title.innerText = 'Admin de Usuário'
  }
}

function sizeOfThings(){
  var windowWidth = window.innerWidth;
  
  var screenWidth = screen.width;
  if(screenWidth<=  900){
    document.querySelector('.sidebar').classList.add("disabled")
  }


};

sizeOfThings();

function selectDisable(select){
  let pesquisa = document.getElementById("value")
  let campo = document.getElementById("campo")
  let divSelect = document.getElementById("select-search")
  let divBlank = document.getElementById("select-blank")

  
  if(select.value == "todos"){
    pesquisa.disabled = true
    divBlank.innerHTML = ''
  }else if(select.value == "servico" || select.value == "carreira" || select.value == "status"){
    divSelect.classList.remove("disabled")
    pesquisa.classList.add("disabled")

    if(campo.value == "servico"){
      divBlank.innerHTML = ''
      const listStatus = ["Simular Empréstimo", "Solicitar Limite"]
      
        listStatus.map(function(name, i) {
          divBlank.innerHTML += `<option value='${name}'>${name}</option>`
        })      
      
    }
    if(campo.value == "status"){
      divBlank.innerHTML = ''
      const listStatus = ['Em Análise', 'Aprovado', 'Reprovado']
      
        listStatus.map(function(name, i) {
          divBlank.innerHTML += `<option value='${name}'>${name}</option>`
        })      
      
    }
    if(campo.value == "carreira"){
      divBlank.innerHTML = ''
      const listStatus = ['Servidor Federal', 'Servidor Estadual', 'Servidor Municipal', 'Servidor GDF', 'Forças Armadas', 'Pensionistas', 'Aposentado', 'Empresário', 'Autônomo', 'Estagiário', 'Funcionário de Empresa Privada']
      
        listStatus.map(function(name, i) {
          divBlank.innerHTML += `<option value='${name}'>${name}</option>`
        })      
      
    }
    
  }else{
    divSelect.classList.add("disabled")
    pesquisa.classList.remove("disabled")
    divBlank.innerHTML = ''
    pesquisa.value = ''
    pesquisa.disabled = false
    

    if(campo.value == 'cpf'){ 
      pesquisa.setAttribute("onkeypress", "mask(this, mCPF)");
      pesquisa.setAttribute("maxlength", "14");
    }

    if(campo.value == 'celular'){ 
      pesquisa.setAttribute("onkeypress", "mask(this, mphoneC)");
    }

    if(campo.value == 'valor_beneficio'){ 
      pesquisa.setAttribute("onkeypress", "formatarMoeda(this)");
    }

  }



}

function copy(campo){
  const value = document.getElementById(`${campo}`).value
  navigator.clipboard.writeText(value);
}

function menuToggle(){
  document.querySelector('.sidebar').classList.toggle("disabled");
}