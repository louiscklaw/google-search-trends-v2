function extract_title( json_in ) {
  console.log( json_in );
  return json_in.trendingSearchesDays[ 0 ].trendingSearches.map( x => x.title );
}

function render_small_table ( json_in ) {

  var content = _.range( json_in.length ).map( idx => {
    return get_table_row( [idx+1, get_a_href(json_in[idx].title.query, json_in[idx].title.exploreLink)] );
  } );

  return get_table(
    get_thead( [ 'rank', 'topic' ] ),
    content.join( '' )
  );
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
