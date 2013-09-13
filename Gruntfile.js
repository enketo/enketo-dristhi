"use strict";

module.exports = function(grunt) {
  var js;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dristhi: {
        files: {
          'build/js/webform-drishti-all-min.js': [
            'lib/enketo-core/src/js/utils.js', 
            'src/js/gui.js', 
            'src/js/storage-dristhi.js',
            'lib/enketo-core/src/js/form.js', 
            'lib/enketo-core/src/js/widgets.js',
            'src/js/webform-dristhi.js'
          ],
          'build/js/libraries-all-min.js': [
            'lib/enketo-core/lib/jquery.min.js', 
            'lib/enketo-core/lib/bootstrap.js', 
            'lib/enketo-core/lib/modernizr.min.js',
            'lib/enketo-core/lib/bootstrap-timepicker/js/bootstrap-timepicker.js',
            'lib/enketo-core/lib/bootstrap-datepicker/js/bootstrap-datepicker.js', 
            'lib/enketo-core/lib/xpath/build/xpathjs_javarosa.min.js'
          ]
        }
      }
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
        src: 'src/**/*.js',
        options: {
          specs: 'tests/spec/*.js',
          helpers: ['tests/utils/*.js', 'tests/mocks/*.js', 'build/mocks/*.js'],
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
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['uglify', 'sass', 'test']);
};