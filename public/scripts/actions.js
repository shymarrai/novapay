function menu(){
  const menu_hamburger_abrir = document.querySelector('#menu-abrir')
  const menu_hamburger_fechar = document.querySelector('#menu-fechar')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')

  menu_hamburger_abrir.classList.toggle("disabled");
  menu_hamburger_fechar.classList.toggle("disabled");
  menu.classList.toggle("disabled");




}