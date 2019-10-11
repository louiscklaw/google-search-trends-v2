// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename --save -D
const {
    src,
    dest,
    parallel,
    series
} = require( 'gulp' );
const pug = require( 'gulp-pug' );
const less = require( 'gulp-less' );
const minifyCSS = require( 'gulp-csso' );
const concat = require( 'gulp-concat' );

const rename = require( 'gulp-rename' );
const javascriptObfuscator = require( 'gulp-javascript-obfuscator' );

function html () {
  console.log( __dirname );
    return src( 'src/pug/*.pug' )
        .pipe( pug() )
        .pipe( dest( 'docs' ) )
}

function css() {
    return src( 'src/pug/css/style.less' )
        .pipe( less() )
        // .pipe( minifyCSS() )
        .pipe( dest( 'docs/css' ) )
}

function js() {
  return src( [
    'src/pug/js/_const.js',
    'src/pug/js/_vars.js',
    'src/pug/js/_common.js',
    'src/pug/js/*.js'
    ], {
            sourcemaps: true
        } )
        .pipe( concat( 'app.min.js' ) )
        .pipe( dest( 'docs/js', {
            sourcemaps: true
        } ) )
}

function js_compress() {
    return src( './docs/js/app.js' )
        .pipe( javascriptObfuscator( {
            compact: true
        } ) )
        .pipe( rename( 'app.min.js' ) )
        .pipe( sourcemaps.write() )
        .pipe( dest( 'docs/js', ) )
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel( css, html, js );
