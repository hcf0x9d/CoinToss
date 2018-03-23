/**
 * MDR Dashboard Prototype Gulpfile.js
 *
 * Author:  Jason Fukura
 * Version: 1.0.0
 * Date:    01/23/2018
 */

const gulp        = require( 'gulp' ),
    // imagemin    = require( 'gulp-imagemin' ),
    browserSync = require( 'browser-sync' ),
    reload      = browserSync.reload,
    serve       = require( 'gulp-serve' ),
    concat      = require( 'gulp-concat' ),
    sass        = require( 'gulp-sass' ),
    sequence    = require( 'run-sequence' ),
    config      = {
        port      : 8888,
        project   : "MDR Dashboard",
        images    : {
            source : "img/*",
            target : "/img",
        },
        css       : {
            source : "css/*.css",
            target : "/css",
        },
        scss      : {
            source : "css/partials/*.scss",
            target : "css/",
        },
        js        : {
            concat : [ 'js/lib/classes.js', 'js/lib/prototype.js', ],
            name   : 'application.js',
            target : "js/",
        },
        html      : {
            source : "*.html",
            target : "/",
        },
    };

/* ========================================================================== */
/* DEVELOPMENT TASKS                                                          */

// Compile SASS into an unminified CSS file
gulp.task( 'sass', () => {

    // noinspection JSUnresolvedFunction
    return gulp.src( 'css/*.scss' )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( './css/' ) );

} );

// Concatenate scripts
gulp.task( 'concat-scripts', () => {

    return gulp.src( config.js.concat )
        .pipe( concat( config.js.name ) )
        .pipe( gulp.dest( config.js.target.replace( '/', '' ) ) );

} );

// Watch Files For Changes & Reload
gulp.task( 'serve', function () {

    browserSync( {
        notify    : false,
        port      : config.port,
        logPrefix : config.project + ' :: Dev',
        server    : {
            baseDir : './',
        },
    } );

    // HTML pages, views and content (XML) changes will require a reload
    gulp.watch( [ '**/*.html', ], reload );

    // SCSS changes require concatenation and reload
    gulp.watch( [ 'css/partials/*.scss', ], function () {

        sequence( 'sass', reload );

    } );

    // Script changes require concatenation and reload
    gulp.watch( [ 'js/lib/*.js', ], function () {

        sequence( 'concat-scripts', reload );

    } );

    // Watch for changes to the images folder
    gulp.watch( [ 'img/**/*', ], reload );

} );
/* ========================================================================== */

