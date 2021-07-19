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