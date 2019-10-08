// cards.js

const CHART_COLORS = [
  [ 'rgb(255, 99, 132)', 'rgb(255, 99, 132)' ]
];

function get_backgrouncColor( color_settings_in ) {
  return color_settings_in[ 0 ];
}


function get_borderColor( color_settings_in ) {
  return color_settings_in[ 1 ];
}

function trends_helloworld() {
  console.log( 'trends_helloworld' );
}

function fetch_post_request( json_in ) {
  return fetch( API_BASE_URL + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( json_in )
  } );
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
  fetch_post_request( {
      q: Q_INTEREST_BY_REGION,
      param: {
        keyword: 'Donald Trump',
        startTime: '2017-02-01',
        endTime: '2017-02-06',
        resolution: 'CITY'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_interest_by_region' ).innerHTML = print_pre( text ) );
}

function test_interest_over_time() {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  fetch_post_request( {
      q: Q_INTEREST_OVER_TIME,
      param: {
        keyword: 'Valentines Day'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_interest_over_time' ).innerHTML = print_pre( text ) );
}

function get_chartjs_canvas_html( chart_id ) {
  return '<canvas id=' + chart_id + '></canvas>';
}

function extract_chart_label( json_in ) {
  return json_in.default.timelineData.map( x => {
    return x.formattedAxisTime;
  } );

}

function extract_chart_data( json_in, idx = 0 ) {
  return json_in.default.timelineData.map( x => {
    return x.value[ idx ];
  } );

}

function translate_to_charts_js_data( json_in, label ) {
  return {
    labels: extract_chart_label( json_in ),
    datasets: [ {
      label: 'hardcode',
      // backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: extract_chart_data( json_in ),
    } ]
  };
}

function create_chart( chart_id, keywords_in, data_json ) {
  var ctx = document.getElementById( chart_id ).getContext( '2d' );
  var chart = new Chart( ctx, {
    type: 'line',
    data: {
      labels: extract_chart_label( data_json ),
      datasets: _.range( keywords_in.length ).map( x => {
        console.log( extract_chart_data( data_json ) );
        return {
          label: keywords_in[x],
          // backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: extract_chart_data( data_json ),
        }
      })
    },
    options: {}
  } );
}



function test_chart_interest_over_time() {
  var _chart_id = 'test_chart_id';
  keywords_to_search = [ 'Valentines Day' ];
  fetch_post_request( {
      q: Q_INTEREST_OVER_TIME,
      param: {
        keyword: keywords_to_search
      }
    } )
    .then( res => res.text() )
    .then( text => JSON.parse( text ) )
    .then( json => {
      get_ele( '#test_chart_interest_over_time' ).innerHTML = get_chartjs_canvas_html( _chart_id );
      return json;
    } )
    .then( ( json ) => {
      create_chart( _chart_id, keywords_to_search, json );
    } );
}

function test_daily_trends() {
  fetch_post_request( {
      q: Q_DAILY_TRENDS,
      param: {
        trendDate: '2019-01-10',
        geo: 'US',
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_daily_trends' ).innerHTML = print_pre( text ) );
}

function test_related_queries() {
  fetch_post_request( {
      q: Q_RELATED_QUERIES,
      param: {
        keyword: 'Westminster Dog Show'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_related_queries' ).innerHTML = print_pre( text ) );
}

function test_related_topics() {
  fetch_post_request( {
      q: Q_RELATED_TOPICS,
      param: {
        keyword: 'Chipotle',
        startTime: '2015-01-01',
        endTime: '2017-02-10'
      }
    } )
    .then( res => res.text() )
    .then( text => get_ele( '#card_related_topics' ).innerHTML = print_pre( text ) );
}

document.addEventListener( "DOMContentLoaded", function () {
  // get_ele( '#card_debug' ).innerHTML = 'hello debug';
  test_interest_by_region();
  test_interest_over_time();
  test_daily_trends();
  test_related_queries();
  test_related_topics();
  test_chart_interest_over_time();
} );

document.addEventListener( "DOMContentLoaded", function () {
  add_cards_toggle_enlarge();
} );
