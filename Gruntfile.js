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
            }
        },
        jsbeautifier: {
            test: {
                src: [ "*.js", "src/js/*.js" ],
                options: {
                    config: "./.jsbeautifyrc",
                    mode: "VERIFY_ONLY"
                }
            },
            fix: {
                src: [ "*.js", "src/js/*.js" ],
                options: {
                    config: "./.jsbeautifyrc"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ '*.js', 'src/js/**/*.js' ]
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
        // this compiles all javascript to a single minified file
        requirejs: {
            compile: {
                options: {
                    name: '../../main',
                    baseUrl: 'src/js',
                    mainConfigFile: "main.js",
                    findNestedDependencies: true,
                    include: [ '../../lib/enketo-core/lib/require.js', 'enketo-js/Widget' ].concat( grunt.file.readJSON( 'config.json' ).widgets ),
                    out: "build/js/enketo-dristhi-combined.min.js",
                    optimize: "uglify2"
                }
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-jsbeautifier' );
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

    grunt.registerTask( 'style', [ 'prepWidgetSass', 'sass' ] );
    grunt.registerTask( 'compile', [ 'requirejs:compile' ] );
    grunt.registerTask( 'server', [ 'connect:server:keepalive' ] );
    grunt.registerTask( 'default', [ 'jshint', 'sass', 'compile' ] );
};
