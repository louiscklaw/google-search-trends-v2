// trends.js


function trends_helloworld() {
  console.log( 'trends_helloworld' );
}

function toggle_enlarge( card ) {
  get_eles( '.cards' ).forEach( element => {
    if ( element.id == card.id ) {
      element.classList.toggle( 'card_enlarge' );
    } else {
      element.classList.remove( 'card_enlarge' );
    }
  } );
}

function add_cards_toggle_enlarge() {
  get_eles( '.cards' ).forEach( ele => {
    // ele.onclick = toggle_enlarge;
    ele.setAttribute( "onclick", "toggle_enlarge(this);" );
  } )
}

function test_interest_by_region() {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  fetch( API_BASE_URL + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        q: Q_INTEREST_BY_REGION,
        param: {
          keyword: 'Donald Trump',
          startTime: '2017-02-01',
          endTime: '2017-02-06',
          resolution: 'CITY'
        }
      } )
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_interest_by_region' ).innerHTML = print_pre( text ) );
}

function test_interest_over_time() {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  fetch( API_BASE_URL + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        q: Q_INTEREST_OVER_TIME,
        param:{keyword: 'Valentines Day'}
      } )
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_interest_over_time' ).innerHTML = print_pre( text ) );
}

function test_daily_trends () {

}

function test_related_queries () {

}

function test_related_topics () {

}

document.addEventListener( "DOMContentLoaded", function () {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  test_interest_by_region();
  test_interest_over_time();
  test_daily_trends();
  test_related_queries();
  test_related_topics();
} );

document.addEventListener( "DOMContentLoaded", function () {
  add_cards_toggle_enlarge();
} );
