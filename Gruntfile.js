module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.initConfig({

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      master: {
        options: {
          remote: 'git@github.com:wosephjeber/wosephjeber.github.io.git',
          branch: 'master'
        }
      }
    },
    
    sass: {
      default: {
        options: {
          style: 'compact',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: '_sass',
          src: ['*.scss'],
          dest: '_site/css',
          ext: '.css'
        }]
      }
    },
    
    postcss: {
      options: {
        map: true,

        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}),
        ]
      },
      default: {
        src: '_site/css/*.css'
      }
    },
    
    watch: {
      default: {
        files: ['js/**/*.js', '_sass/*.scss'],
        tasks: ['sass:default', 'postcss:default']
      },
      options: {
        interrupt: false,
        nospawn: true,
        event: 'all',
        interval: 1000,
        debounceDelay: 1000
      },
    },
  });

  grunt.registerTask('deploy', [
    'buildcontrol:master'
  ]);

};
