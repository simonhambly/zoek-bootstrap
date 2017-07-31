// @flow
import domready from 'domready'

const toggleMenu = (targetSelector, menuOpenClass) => () => {
// const toggleMenu = (targetSelector: string, menuOpenClass: string) => () => {
  var target = document.querySelector(targetSelector)
  if (!target) return;
  target.classList.toggle(menuOpenClass);
}

function setupMenuToggle(toggleSelector, changeHandler){
// function setupMenuToggle(toggleSelector:string, changeHandler){
  var menuToggle = document.querySelector(toggleSelector)
  if (!menuToggle) return;
  menuToggle.addEventListener('change', changeHandler)
}

function menuToggle (menuOpenClass, targetSelector, toggleSelector) {
// function menuToggle (menuOpenClass: string, targetSelector: string, toggleSelector: string) {
  domready(setupMenuToggle(toggleSelector, toggleMenu(targetSelector, menuOpenClass)))
}

export default menuToggle