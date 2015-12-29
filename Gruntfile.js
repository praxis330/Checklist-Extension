module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/js/index.js', 'src/js/storageFactory.js', 'src/js/taskResourceFactory.js', 'src/js/checklistDetailDirective.js', 'src/js/checklistController.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		watch: {
			files: ['src/**/*.js', 'main.html', 'Gruntfile.js'],
			tasks: ['concat', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-watch')

	grunt.registerTask('default', ['concat', 'uglify'])
}