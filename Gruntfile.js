'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-uncss');

  var mozjpeg = require('imagemin-mozjpeg');

  // For dev, prettify html
  // Add html lint task: https://www.npmjs.com/package/grunt-lint5

  // Project configuration.
  grunt.initConfig({
    config: {
      src: 'src', // source files
      dist: 'dist', // build directory
      assets: 'assets' // static assets (will be merged with build)
    },
    imagemin: {                          // Task
      prod: {                            // Another target
        options: {                       // Target options
          optimizationLevel: 5,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()],
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '<%= config.dist %>/',    // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '<%= config.dist %>/'    // Destination path prefix
        }]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          '<%= config.dist %>/assets/js/site.min.js': [
            '<%= config.dist %>/assets/js/active/**/*.js'] // make sure we load jQuery first
        }
      }
    },
    compress: {
      prod: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: '<%= config.dist %>/',
        src: ['**/*'],
        dest: '<%= config.dist %>/',
        ext: '.gz'
      }
    },
    htmlmin: {                                     // Task
      prod: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: '<%= config.dist %>/',      // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: '<%= config.dist %>/',   // Destination path prefix.
        }],
      }
    },
    // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically
    // https://www.npmjs.com/package/grunt-contrib-cssmin
    cssmin: {
      options: {
        //shorthandCompacting: false,
        //roundingPrecision: -1
      },
      target: {
        files: {
          '<%= config.dist %>/assets/css/style.min.css': ['<%= config.dist %>/assets/css/style.min.css']
        }
      }
    },
    connect: {
      dev: {
        options: {
          port: 9000,
          livereload: 35729,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          open: true,
          base: ['<%= config.dist %>']
        }
      },
      prod: {
        options: {
          port: 9001,
          livereload: 35730,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          base: '<%= config.dist %>',
          keepalive: true,
          open: true
        }
      }
    },
    watch: {
      assemble: {
        files: ['<%= config.src %>/{blog,content,data,templates}/{,*/}*.{md,hbs,yml,styl}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.dev.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    stylus: {
      compile: {
        options: {
          // Stylus options: https://github.com/gruntjs/grunt-contrib-stylus
          compress: false
        },
        files: {
          '<%= config.dist %>/assets/css/custom.css': ['<%= config.src %>/css/custom.styl']
        }
      }
    },
    assemble: {
      options: {
        sitemap: {
            //homepage: 'http://mysite.com',
            changefreq: 'daily',
            priority: '0.8',
            //exclude: ['50x', 'foo'],
            robot: false,
            relativedest: true
        },
        permalinks: {
          structure: ':basename/index.html'
        },
        collections: [{
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }],
        /*
        rss: {
            title: 'RSS Feed Title',
            description: 'RSS feed description.'
        },
        */
        flatten: true,
        assets: '<%= config.dist %>/assets',
        layout: 'default.hbs',
        layoutdir: '<%= config.src %>/templates/layouts',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs',
        //'assemble-middleware-sitemap',
        plugins: [
          'assemble-middleware-sitemap',
          'assemble-middleware-rss',
          'assemble-contrib-anchors',
          'assemble-contrib-permalinks',
          'assemble-contrib-toc'
        ],
        helpers: ['<%= config.src %>/helpers/**/*.js']
      },
      site: {
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/pages/**/*.hbs', '<%= config.src %>/blog/*.{hbs,md}']
        }
      },
    },
    replace: {
      feed: {
        src: ['<%= config.dist %>/feed.xml'],             // source files array (supports minimatch)
        dest: '<%= config.dist %>/feed.xml',             // destination directory or file
        replacements: [{
          from: 'index.html',                   // string replacement
          to: ''
        }]
      },
      sitemap: {
        src: ['<%= config.dist %>/sitemap.xml'],             // source files array (supports minimatch)
        dest: '<%= config.dist %>/sitemap.xml',             // destination directory or file
        replacements: [{
          from: 'index.html',                   // string replacement
          to: ''
        }]
      }
    },
    uncss: {
      dist: {
        files: [
          {
            src: '<%= config.dist %>/**/*.html',
            dest: '<%= config.dist %>/assets/css/style.min.css'
          }
        ],
        options: {
          ignore: [
            /some-selector-pattern/,
            ".a-dynamically-created-selector"
          ]
        }
      }
    },
    processhtml: {
      dist: {
        options: {
          process: true,
        },
         files: [
            {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.html'],
            dest: 'dist/',
            ext: '.html'
          },
        ]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= config.assets %>',
            src: '**/*.*',
            dest: '<%= config.dist %>'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/assets/',
            src: '**',
            dest: '<%= config.dist %>/assets/css/'
          }
        ]
      }
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      dev: ['<%= config.dist %>/**/*.{html,xml,css}'],
      prod: ['<%= config.dist %>/**/*.*']
    }
  });

  grunt.registerTask('build:dev', [
    'clean:dev',
    'copy',
    'stylus',
    'assemble', //'newer:assemble',
    'replace'
  ]);

  grunt.registerTask('build:prod', [
    'clean:prod',
    'copy',
    'stylus',
    'assemble', //'newer:assemble',
    'uncss',
    'cssmin',
    'processhtml',
    'htmlmin',
    'uglify',
    'imagemin',
    'replace',
    'compress'
  ]);

  grunt.registerTask('watch:dev', [
    'build:dev',
    'connect:dev:livereload',
    'watch'
  ]);

  grunt.registerTask('watch:prod', [
    'build:prod',
    'connect:prod'
  ]);

  grunt.registerTask('default', [
    'watch:dev'
  ]);
};
