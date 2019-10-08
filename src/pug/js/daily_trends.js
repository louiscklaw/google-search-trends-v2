function extract_title( json_in ) {
  console.log( json_in );
  return json_in.trendingSearchesDays[ 0 ].trendingSearches.map( x => x.title );
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

function get_table ( table_content ) {
  console.log( get_thead( ['rank', 'topic'] ) );
  return [
    '<table class="table">',
    get_thead( [ 'rank', 'topic' ] ),
    table_content,
    '</table>'
  ].join( '' );
}

function render_small_table ( json_in ) {

  var content = _.range( json_in.length ).map( idx => {
    return get_table_row( [idx+1, get_a_href(json_in[idx].title.query, json_in[idx].title.exploreLink)] );
  } );

  // console.log( _.range( json_in.length ).map( idx => {
  //   get_table_row( [json_in[idx].title.query, json_in[idx].title.exploreLink] );
  // } ) );

  return get_table( content.join( '' ) );
}

function extract_trending_search ( json_in ) {
  return json_in.default.trendingSearchesDays[0].trendingSearches;
}


function daily_trends( sel_in, geo_in, trend_date_in ) {
  fetch_post_request( {
      q: Q_DAILY_TRENDS,
      param: {
        trendDate: trend_date_in,
        geo: geo_in,
      }
    } )
    .then( res => res.json() )
    .then( json => {
      get_ele( sel_in ).innerHTML = render_small_table(extract_trending_search(json));
    } );
}
