module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            main: {
                files: {'web/style/style.css': 'web/style/style.less'},
                options: {
                    compress: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/view/src', src: '**', dest: 'src/view/dist/'}
                ]
            }
        },
        'string-replace': {
            dict: {
                files: {
                    'src/view/dist/': 'src/view/dist/**'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\?v\d+/ig,
                            replacement: '?v' + (new Date()).getTime()
                        },
                        {
                            pattern: '{{version}}',
                            replacement: 'v4.1.0'
                        }
                    ]
                }
            },
            import: {
                files: {
                    'src/view/dist/layout/footer/footer.html': 'src/view/dist/layout/footer/footer.html',
                    'src/view/dist/layout/header/header.html': 'src/view/dist/layout/header/header.html',
                    'src/view/dist/about/index.html': 'src/view/dist/about/index.html',
                    'src/view/dist/bot/index.html': 'src/view/dist/bot/index.html',
                    'src/view/dist/error/404.html': 'src/view/dist/error/404.html',
                    'src/view/dist/main/index.html': 'src/view/dist/main/index.html',
                    'src/view/dist/statistic/index.html': 'src/view/dist/statistic/index.html'

                },
                options: {
                    replacements: [
                        {
                            pattern: /<!-- @import (.*?) -->/ig,
                            replacement: function (match, p1) {
                                return grunt.file.read(p1);
                            }
                        }
                    ]
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'web/js/common.min.js': [
                        'web/js/ajax.js',
                        'web/js/class.js',
                        'web/js/collapse.js',
                        'web/js/full_screen.js',
                        'web/js/slider.js',
                        'web/js/subway/map.js',
                        'web/js/subway/list.js',
                        'web/js/subway/list_check.js',
                        'web/js/subway/search.js',
                        'web/js/subway/station.js',
                        'web/js/url.js',
                        'web/js/banner.js'
                    ],
                    'web/js/main.min.js': ['web/js/main.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['copy', 'less', 'string-replace', 'uglify']);
};