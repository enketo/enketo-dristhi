/**
 * This build file is for development only. You probably want to ignore it when using this repo as a library.
 */

/*jshint node:true*/
"use strict";

module.exports = function( grunt ) {
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        connect: {
            server: {
                options: {
                    port: 8080
                }
            },
            test: {
                options: {
                    port: 8000
                }
            }
        },
        jsbeautifier: {
            test: {
                src: [ "*.js", "src/js/*.js", "src/widget/*/*.js" ],
                options: {
                    config: "./.jsbeautifyrc",
                    mode: "VERIFY_ONLY"
                }
            },
            fix: {
                src: [ "src/js/*.js", "src/widget/*/*.js" ],
                options: {
                    config: "./.jsbeautifyrc"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ '*.js', 'src/js/**/*.js', '!src/js/extern.js' ]
        },
        watch: {
            sass: {
                files: [ 'src/**/*.scss' ],
                tasks: [ 'style' ],
                options: {
                    spawn: false
                }
            }
        },
        /*
            dristhi: {
                files: {
                    '
            build / js / webform - drishti - all - min.js ': [
                        '
            lib / enketo - core / src / js / utils.js ',
                        '
            src / js / gui.js ',
                        '
            src / js / storage - dristhi.js ',
                        '
            lib / enketo - core / src / js / form.js ',
                        '
            lib / enketo - core / src / js / widgets.js ',
                        '
            src / js / webform - dristhi.js '
                    ],
                    '
            build / js / libraries - all - min.js ': [
                        '
            lib / enketo - core / lib / jquery.min.js ',
                        '
            lib / enketo - core / lib / bootstrap.js ',
                        '
            lib / enketo - core / lib / modernizr.min.js ',
                        '
            lib / enketo - core / lib / bootstrap - timepicker / js / bootstrap - timepicker.js ',
                        '
            lib / enketo - core / lib / bootstrap - datepicker / js / bootstrap - datepicker.js ',
                        '
            lib / enketo - core / lib / xpath / build / xpathjs_javarosa.min.js '
                    ]
                }
            }
        }, */
        prepWidgetSass: {
            writePath: 'src/sass/_widgets.scss',
            widgetConfigPath: 'config.json'
        },
        sass: {
            dist: {
                options: {
                    style: 'compact'
                },
                files: {
                    'build/css/dristhi.css': 'src/sass/dristhi.scss'
                }
            }
        },
        jasmine: {
            test: {
                src: 'src /**/ * .js ',
                options: {
                    specs: 'tests/spec/*.js',
                    helpers: [ 'tests/utils/*.js', 'tests/mocks/*.js', 'build/mocks/*.js' ],
                    vendor: [
                        'lib/enketo-core/lib/jquery.min.js',
                        'lib/enketo-core/lib/bootstrap.js',
                        'lib/enketo-core/lib/modernizr.min.js',
                        'lib/enketo-core/src/js/utils.js',
                        'lib/enketo-core/lib/xpath/build/xpathjs_javarosa.min.js',
                        'lib/enketo-core/lib/bootstrap-datepicker/js/bootstrap-datepicker.js',
                        'lib/enketo-core/lib/bootstrap-timepicker/js/bootstrap-timepicker.js'
                    ]
                },
            }
        }
    } );


    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-jsbeautifier' );
    grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

    grunt.registerTask( 'test', [ 'jasmine' ] );
    grunt.registerTask( 'default', [ 'uglify', 'sass', 'test' ] );

    grunt.registerTask( 'prepWidgetSass', 'Preparing _widgets.scss dynamically', function() {
        var widgetConfig, widgetFolderPath, widgetSassPath, widgetConfigPath,
            config = grunt.config( 'prepWidgetSass' ),
            widgets = grunt.file.readJSON( config.widgetConfigPath ).widgets,
            content = '// Dynamically created list of widget stylesheets to import based on the content\r\n' +
                '// based on the content of config.json\r\n\r\n';

        widgets.forEach( function( widget ) {
            if ( widget.indexOf( 'enketo-widget/' ) === 0 ) {
                //strip require.js module name
                widgetFolderPath = widget.substr( 0, widget.lastIndexOf( '/' ) + 1 );
                //replace widget require.js path shortcut with proper path relative to src/sass
                widgetSassPath = widgetFolderPath.replace( /^enketo-widget\//, '../../lib/enketo-core/src/widget/' );
                //create path to widget config file
                widgetConfigPath = widgetFolderPath.replace( /^enketo-widget\//, 'lib/enketo-core/src/widget/' ) + 'config.json';
                grunt.log.writeln( 'widget config path: ' + widgetConfigPath );
                //create path to widget stylesheet file
                widgetSassPath += grunt.file.readJSON( widgetConfigPath ).stylesheet;
            } else {
                grunt.log.error( [ 'Expected widget path "' + widget + '" in config.json to be preceded by "widget/".' ] );
            }
            //replace this by a function that parses config.json in each widget folder to get the 'stylesheet' variable
            content += '@import "' + widgetSassPath + '";\r\n';
        } );

        grunt.file.write( config.writePath, content );

    } );

    //    grunt.registerTask( 'compile', [ 'requirejs:combine', 'closure-compiler:compile' ] );
    grunt.registerTask( 'test', [ 'jsbeautifier:test', 'connect:test', 'jasmine' ] );
    grunt.registerTask( 'style', [ 'prepWidgetSass', 'sass' ] );
    grunt.registerTask( 'server', [ 'connect:server:keepalive' ] );
    grunt.registerTask( 'default', [ 'jshint', 'sass', 'test' ] );
};
