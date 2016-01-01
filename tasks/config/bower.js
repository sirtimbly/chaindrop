module.exports = function(grunt) {

	grunt.config.set('bower', {
        dev: {
            ignorePackages: ['inuit'],
            dest: 'assets/',
            js_dest: 'assets/js/dependencies',
            css_dest: 'assets/styles',
            font_dest: 'assets/fonts'
        }
   });

	grunt.loadNpmTasks('grunt-bower');
};
