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