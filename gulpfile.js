'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const template = require('gulp-template');
const closureCompiler = require('gulp-closure-compiler');
const copy = require('gulp-copy');

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dest/css'));
});
gulp.task('autoprefixer', ['sass'], function() {
    return gulp.src('dest/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dest/css'));
});
gulp.task('cssmin', ['autoprefixer'], function() {
    return gulp.src('dest/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dest/css'));
});
gulp.task('template', ['cssmin'], function() {
    return gulp.src('src/index.html')
        .pipe(template({lang: 'pl',
                        title: 'Memory',
                        desc: 'Prosta gra Memory',
                        keywords: 'memory, memory game',
                        css: 'css/memory.css',
                        headline: 'Memory',
                        copyright: 'Copyright &copy; 2017 Kamil Kondratowicz',
                        js: '../src/js/memory.js'})
             )
        .pipe(gulp.dest('dest'));
});
gulp.task('jsCompiler', ['template'], function() {
    return gulp.src('src/js/*.js')
        .pipe(closureCompiler({fileName: 'memory.min.js',
                               compilerFlags: {
                                   compilation_level: 'SIMPLE_OPTIMIZATIONS',
                                   language_in: 'ECMASCRIPT6_STRICT',
                                   language_out: 'ECMASCRIPT5_STRICT'
                               }
                              }))
        .pipe(gulp.dest('dest/js'));
});
gulp.task('copy', ['jsCompiler'], function() {
   return gulp.src('src/img/*')
       .pipe(copy('dest', {prefix: 1}))
       .pipe(gulp.dest('dest'));
});
gulp.task('default', ['copy']);