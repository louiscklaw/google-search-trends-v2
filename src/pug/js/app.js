// app.js

function highlight_button( sel_in ) {
  console.log( 'highlight_button:' + sel_in );
  get_ele( sel_in ).classList.add( 'nav_button_highlighted' );
}

function unhighlight_button() {
  get_eles( '.nav_button' ).forEach( x => {
    x.classList.remove( 'nav_button_highlighted' );
  } )
  // get_ele(sel_in).classList.remove('nav_button_highlighted')
}

function update_highlight_button( hash_in ) {
  document.querySelectorAll( 'div.nav_button' ).forEach( x => {
    if ( x.id != null & x.id != '' ) {
      if ( "#" + x.id == hash_in ) {
        x.classList.add( 'nav_button_highlighted' );
      } else {
        x.classList.remove( 'nav_button_highlighted' );
      }

    }
  } )
}

function listen_to_hash_change() {
  window.addEventListener( 'hashchange', function () {
    // clear_all_highlight_button();
    update_highlight_button( window.location.hash );
  } );
}

function init_grid_animation() {

  const grid = document.querySelector( ".grid" );
  animateCSSGrid.wrapGrid( grid, {
    duration: 600
  } );

}

document.addEventListener( "DOMContentLoaded", function () {
  // if ( window.location.hash == '' ) {
  //   console.log( 'windows hash found empty, pointing to default hash' );
  //   window.location.hash = DEFAULT_HASH;
  // }
  if ( window.location.hash == '' ) {
    update_highlight_button( DEFAULT_HASH );
  } else {
    update_highlight_button( window.location.hash );
  }

  listen_to_hash_change();
  init_grid_animation();

} );
