module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass:dev']
      },
      concat: {
        files: ['assets/js/**/*.js'],
        tasks: 'concat'
      },
      autoprefixer: {
        files: ['assets/css/style.css'],
        tasks: 'autoprefixer'
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          trace: true
        },
        files: {
          'assets/css/style.css': 'assets/scss/style.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/style.css': 'assets/scss/style.scss'
        }
      }
    },
    concat: {
      dev: {
        src: 'assets/js/**/*.js',
        dest: 'assets/dest/main.js'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 10']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'assets/css/*.css', // -> src/css/file1.css, src/css/file2.css
        dest: 'assets/dest/' // -> dest/css/file1.css, dest/css/file2.css
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'assets/dest/main.min.js': 'assets/dest/main.js'
        }
      }
    }

  });

  grunt.loadNpmTasks ('grunt-bump');
  grunt.loadNpmTasks ('grunt-contrib-uglify');
  grunt.loadNpmTasks ('grunt-contrib-concat');
  grunt.loadNpmTasks ('grunt-autoprefixer');
  grunt.loadNpmTasks ('grunt-contrib-sass');
  grunt.loadNpmTasks ('grunt-contrib-watch');
  // grunt.loadNpmTasks ('grunt-contrib-imagemin');

  // Using the 'grunt development' commando will autoprefix, compile sass, concatenate and activate the watch task
  grunt.registerTask('dev', ['sass:dev', 'autoprefixer', 'concat', 'watch']);
  // The production task will autoprefix, compile sass and compress the outputted CSS, concatinate JS, compress it, and compress images
  grunt.registerTask('prod', ['sass:prod', 'autoprefixer', 'concat', 'uglify']);
};