
function process_GET ( req, res ) {
  switch ( req.query.q ) {
    case "test":
      res.send( 'test OK' );
      break;
    default:
      console.error( 'get parameter not supported' );
      console.error( req.query.q );
      res.send('get parameter not supported')
      break;
  }
}
function main_routes ( req, res ) {
  console.log( 'incoming call' );
  switch ( req.method ) {
    case 'GET':
        process_GET( req, res );
      break;
    case 'POST':
      break;
    default:
      break;
  }
}

module.exports.main_routes = main_routes;
