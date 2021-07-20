function accepted(){
  const wanning = document.querySelector('footer')
  wanning.classList.add('disabled')
}

function menu(){
  const menu_hamburger_abrir = document.querySelector('#menu-abrir')
  const menu_hamburger_fechar = document.querySelector('#menu-fechar')
  const menu = document.querySelector('.menu')

  menu_hamburger_abrir.classList.toggle("disabled");
  menu_hamburger_fechar.classList.toggle("disabled");
  menu.classList.toggle("disabled");

}
var clients = document.querySelectorAll('.msg')
clients = [...clients]

for(let i = 1; i < clients.length; i++) {
  clients[i].classList.add('disabled')
}



function controlsBefore(index){
  for(let i = 0; i < clients.length; i++) {
    if(i == index && i - 1 >= 0){
      clients[index].classList.remove('enable')
      clients[index].classList.add('disabled')

      clients[index - 1].classList.add('enable')
      clients[index -1].classList.remove('disabled')
    }
  }
}

function controlsAfter(index){
  for(let i = 0; i < clients.length; i++) {
    if(i == index && i + 1< clients.length){

      clients[index].classList.remove('enable')
      clients[index].classList.add('disabled')

      clients[index + 1].classList.add('enable')
      clients[index + 1].classList.remove('disabled')
    }
  }
}