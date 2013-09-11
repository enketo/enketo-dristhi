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
          'js/webform-drishti-all-min.js': [
            'src/enketo-core/src/js/helpers.js', 
            'src/js/gui.js', 
            'src/js/storage-dristhi.js',
            'src/enketo-core/src/js/form.js', 
            'src/enketo-core/src/js/widgets.js',
            'src/js/webform-dristhi.js'
          ],
          'js/libraries-all-min.js': [
            'src/lib/jquery.min.js', 
            'src/lib/bootstrap.js', 
            'src/lib/modernizr.min.js',
            'src/enketo-core/lib/bootstrap-timepicker/js/bootstrap-timepicker.js',
            'src/enketo-core/lib/bootstrap-datepicker/js/bootstrap-datepicker.js', 
            'src/enketo-core/lib/xpath/build/xpathjs_javarosa.min.js'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};