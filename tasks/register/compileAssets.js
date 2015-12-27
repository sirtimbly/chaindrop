module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'sass:dev',
        'bower:dev',
		'copy:dev',
        'jst:dev'
		
	]);
};
