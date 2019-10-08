// common.js

function helloworld () {
  alert( 'helloworld' );
}

function print_pre( str_in ) {
  return '<pre>' + str_in + '</pre>';
}

function get_ele( sel_in ) {
  return document.querySelector( sel_in );
}

function get_eles( sel_in ) {
  return document.querySelectorAll( sel_in );
}
