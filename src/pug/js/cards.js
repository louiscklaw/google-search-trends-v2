// cards.js



const CHART_COLORS = [
  [ 'rgba(241, 196, 15,1.0)', 'rgba(241, 196, 15,0.1' ],
  [ 'rgba(230, 126, 34,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(231, 76, 60,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(26, 188, 156,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(52, 152, 219,1.0)', 'rgb(255, 99, 132)' ],
  [ 'rgba(155, 89, 182,1.0)', 'rgb(255, 99, 132)' ],

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

function toggle_enlarge_for_table( card ) {
  get_eles( '.cards' ).forEach( element => {
    if ( element.id == card.id ) {
      element.classList.toggle( 'card_enlarge' );
    } else {
      element.classList.remove( 'card_enlarge' );
    }
  } );
}



function toggle_enlarge ( card ) {
  console.log( click_target_tag_name );
  if ( ignore_click_tag_name.indexOf( click_target_tag_name ) > -1 ) {
    console.log( 'i should ignore click' );
  } else {
    get_eles( '.cards' ).forEach( element => {
      if ( element.id == card.id ) {
        // enlarge the element
        element.classList.toggle( 'card_enlarge' );
      } else {
        element.classList.remove( 'card_enlarge' );
      }
    } );
  }
}

function add_cards_toggle_enlarge() {
  get_eles( '.cards' ).forEach( ele => {
    // ele.onclick = toggle_enlarge;
    ele.setAttribute( "onclick", "toggle_enlarge(this);" );
  } )
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

// function translate_to_charts_js_data( json_in, label ) {
//   return {
//     labels: extract_chart_label( json_in ),
//     datasets: [ {
//       label: 'hardcode',
//       // backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: extract_chart_data( json_in ),
//     } ]
//   };
// }

function create_chart( chart_id, keywords_in, data_json ) {
  var ctx = document.getElementById( chart_id ).getContext( '2d' );
  var chart = new Chart( ctx, {
    type: 'line',
    data: {
      labels: extract_chart_label( data_json ),
      datasets: _.range( keywords_in.length ).map( x => {

        return {
          label: keywords_in[ x ],
          backgroundColor: CHART_COLORS[ x ][ 0 ].replace( '1.0', '0.1' ),
          borderColor: CHART_COLORS[ x ][ 0 ],
          data: extract_chart_data( data_json, x ),
        }
      } )
    },
    options: {
      maintainAspectRatio: false
    }
  } );
}

document.addEventListener( "DOMContentLoaded", function () {
  add_cards_toggle_enlarge();
} );

window.onclick = e => {
  console.log( e.target );
  console.log( e.target.tagName );
}
