module.exports = function(grunt) {

	grunt.config.set('bower', {
        dev: {
            dest: 'assets/',
            js_dest: 'assets/js/dependencies',
            css_dest: 'assets/styles'
        }
   });

	grunt.loadNpmTasks('grunt-bower');
};
