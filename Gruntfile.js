module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({

    meta: {
      styles: [
        'sass/**/*.scss',
      ]
    },

    // Compile Sass files to CSS
    compass: {
      options: {
        require: 'compass-inuit',
        sassDir: 'sass'
      },
      debug: {
        options: {
          cssDir: 'debug',
          // For source maps
          debugInfo: true,
          outputStyle: 'expanded'
        }
      },
      build: {
        options: {
          cssDir: 'build'
        }
      }
    },

    // Clean target directories
    clean: {
      debug: ['debug'],
      buildTemp: [
        'build/main.css',
        'build/style.css',
        'build/app.js'
      ],
      all: ['debug', 'build']
    },

    // Run Jekyll commands
    jekyll: {
      server: {
        server : true,
        // Add the --watch flag, i.e. rebuild on file changes
        watch: true
      },
      build: {
        server: false
      }
    }

  });

  // Load tasks from plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jekyll');

  // Compile JS & CSS, run watch to recompile on change
  grunt.registerTask('debug', function() {
    // Rebuild './debug'
    grunt.task.run([
      'clean:debug',
    ]);
    // Watch for changes
    grunt.task.run('watch');
  });

  // Alias to `grunt jekyll:server`
  grunt.registerTask('server', 'jekyll:server');

  // Run Jekyll build with environment set to production
  grunt.registerTask('jekyll-production', function() {
    grunt.log.writeln('Setting environment variable JEKYLL_ENV=production');
    process.env.JEKYLL_ENV = 'production';
    grunt.task.run('jekyll:build');
  });

  // Compile and minify JS & CSS, run Jekyll build for production
  grunt.registerTask('build', [
    'clean:all',
    'clean:buildTemp',
    'jekyll-production'
  ]);

  grunt.registerTask('default', ['debug']);
};
