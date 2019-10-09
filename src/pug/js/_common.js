// common.js

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

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

function get_google_trend_href( href_in ) {
  return 'https://trends.google.com' + href_in;
}

function encap ( content, encap ) {
  return '<' + encap + '>' + content + '</' + encap + '>';
}

function encap_td ( content ) {
  return encap(content,'td');
}

function encap_tr ( content ) {
  return encap( content, 'tr' );
}

function encap_thead ( content ) {
  return encap( content, 'thead' );
}

function encap_tfoot ( content ) {
  return encap( content, 'tfoot' );
}

function get_non_google_a_href ( text, href ) {
  return '<a href="' + href + '" target="_blank">' + text + '</a>';
}

function get_a_href( text, href ) {
  return '<a href="' + get_google_trend_href( href ) + '" target="_blank">' + text + '</a>';
}

function get_thead ( cols_name ) {
　 return encap_thead(encap_tr(cols_name.map( x => encap_td(x) ).join('')));
}

function get_tfoot( cols_name ) {
  return encap_tfoot(encap_tr(cols_name.map( x => encap_td(x) ).join('')));
}

function get_table_row ( row_cotnent ) {
  var content = row_cotnent.map( x => encap_td(x) );
  return '<tr>' + content.join('') +'</tr>';
}

function get_table (thead, table_content ) {
  console.log( get_thead( ['rank', 'topic'] ) );
  return [
    '<table class="table">',
    thead,
    table_content,
    '</table>'
  ].join( '' );
}
