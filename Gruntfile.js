module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-build-control');

  grunt.initConfig({

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      master: {
        options: {
          remote: 'git@github.com:wosephjeber/wosephjeber.github.io.git',
          branch: 'master'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'buildcontrol:pages'
  ]);

};
