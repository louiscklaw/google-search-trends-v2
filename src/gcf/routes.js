// routes.js
const path = require( 'path' );
const fs = require( 'fs' );

const vars = require( path.join( __dirname, '../vars.js' ) );

const common = require( path.join( vars.GCF_PATH, 'common.js' ) );
const trends_util = require( path.join( vars.GCF_PATH, 'trends_util.js' ) );
const chartjs_util = require( path.join( vars.GCF_PATH, 'chartjs_util.js' ) );

function handle_option_call( req, res ) {
  res.set( 'Access-Control-Allow-Methods', 'GET' );
  res.set( 'Access-Control-Allow-Headers', 'Content-Type' );
  res.set( 'Access-Control-Max-Age', '3600' );
  res.status( 204 ).send( '' );
}

function handle_post_interest_of_time( req, res ){
  res.send(JSON.stringify(chartjs_util.helloworld_chart()))
}

function handle_get_q_call( req, res ) {
  // {
  //   keyword: 'Donald Trump',
  //   startTime: new Date( '2017-02-01' ),
  //   endTime: new Date( '2017-02-06' ),
  //   resolution: 'CITY'
  // }
  switch ( req.query.q ) {
    case 'test':
        trends_util.gcf_interestByRegion( {
        keyword: 'Donald Trump',
        startTime: new Date( '2017-02-01' ),
        endTime: new Date( '2017-02-06' ),
        resolution: 'CITY'
      } )
        .then( result => res.send( common.pre_print(result) ));
      break;
    default:
      res.send( 'the q parameters not handled' );
      break;
  }
}

function send_required_func_not_found ( req, res ) {
  res.send( 'call type not found' + req.query );
}

function handle_post_trends ( req, res ) {
  console.log( req.body.trends );
  switch ( req.body.trends ) {
    case "interestOfTime":
      handle_post_interest_of_time( req, res );
      break;
    default:
      send_required_func_not_found( req, res );
      break;
  }
}

function handle_post_call ( req, res ) {
  if ( Object.keys( req.body ).indexOf( 'trends' ) > -1 ) {
    handle_post_trends( req, res );

  } else {
    send_required_func_not_found( req, res );
  }
}

function handle_get_call( req, res ) {
  if ( Object.keys( req.query ).indexOf( 'q' ) > -1 ) {
    handle_get_q_call( req, res );
  } else {
    send_required_func_not_found( req, res );
  }
}

module.exports.main_routes = ( req, res ) => {
  console.log( req.method );

  res.set( 'Access-Control-Allow-Origin', '*' );

  if ( req.method === 'OPTIONS' ) {
    console.log( req.method );
    handle_option_call( req, res );

  } else if ( req.method === 'GET' ) {
    handle_get_call( req, res );
  } else if ( req.method === 'POST' ) {
    console.log( req.body );
    handle_post_call( req, res );

  } else {
    res.send( 'req method not supported' );
  }
}

module.exports.helloworld = ( req, res ) => {
  res.send( 'helloworld from gcf' );
}
