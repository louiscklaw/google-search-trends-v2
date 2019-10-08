
const path = require( 'path' );

module.exports = {
  GCF_PATH: path.join( __dirname, 'gcf' ),
  PUG_PATH: path.join( __dirname, 'pug' ),
  RUN_ENV: process.env.RUN_ENV
}
