module.exports = function(grunt) {
    grunt.initConfig({
        dirs: {
            css: 'assets/css',
            js: 'assets/js',
            output: 'assets/build',
            app: 'app',
            wall: 'wall'
        },

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    '<%= dirs.output %>/styles.css': '<%= dirs.output %>/styles.css'
                }
            }
        },

        concat: {
            /* Gathering all scss files together for easier sass conversion */
            css: {
                src: [
                    '<%= dirs.css %>/global.scss',
                    '<%= dirs.css %>/mobile.scss',
                    '<%= dirs.css %>/tablet.scss',
                    '<%= dirs.css %>/pc.scss',
                    '<%= dirs.css %>/wall.scss'
                ],
                dest: '<%= dirs.output %>/styles.css'
            },

            js : {
                src : [
                    '<%= dirs.js %>/angular.min.js',
                    '<%= dirs.js %>/*.js',
                    '<%= dirs.app %>/**/*.js'
                ],
                dest : '<%= dirs.output %>/scripts.js'
            },

            jsWall : {
                src : [
                    '<%= dirs.js %>/angular.min.js',
                    '<%= dirs.js %>/*.js',
                    '<%= dirs.wall %>/**/*.js'
                ],
                dest : '<%= dirs.output %>/scripts-wall.js'
            }
        },

        /* Minifiying all css for combined file */
        cssmin: {
            css:{
                src: '<%= dirs.output %>/styles.css',
                dest: '<%= dirs.output %>/styles.css'
            }
        },

        uglify: {
            js: {
                files: {
                    '<%= dirs.output %>/scripts.js': ['<%= dirs.output %>/scripts.js']
                }
            },
            jsWall: {
                files: {
                    '<%= dirs.output %>/scripts-wall.js': ['<%= dirs.output %>/scripts-wall.js']
                }
            }
        },

        watch: {
            css: {
                files: [
                    '<%= dirs.css %>/*.scss',
                ],
                tasks: [
                    'concat:css',
                    'sass',
                    'cssmin:css'
                ]
            },
            js: {
                files: [
                    '<%= dirs.app %>/**/*.js',
                    '<%= dirs.js %>/*.js',
                ],
                tasks: [
                    'concat:js'
                ]
            },
            jsWall: {
                files: [
                    '<%= dirs.wall %>/**/*.js'
                ],
                tasks: [
                    'concat:jsWall'
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');
    
    grunt.registerTask('default', [
        'concat:css',
        'sass',
        'cssmin:css',
        'concat:js',
        'uglify:js',
        'concat:jsWall',
        'uglify:jsWall'
    ]);
    
    grunt.registerTask('dev', [
        'default',
        'watch',
    ]);
};