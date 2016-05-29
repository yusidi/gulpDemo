var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var notify = require("gulp-notify");
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var useref = require('gulp-useref');


// 默认任务
gulp.task('default',['clean','watch','minifyHtml','minifyJs','minifyCss','minifyImage'],function(){
    gulp.src('./dist/index.html')
        .pipe(open({app: 'chrome'}))
        .pipe(notify("构建完成"));
});


// 监听变动
gulp.task('watch',function () {
    gulp.watch('src/*.html', ['minifyHtml']);

    gulp.watch('src/**/*.css', ['minifyCss']);

    gulp.watch('src/**/*.js', ['minifyJs']);

    gulp.watch('src/images/*', ['minifyImage']);

    livereload.listen();
    // Watch any files in assets/, reload on change
    //gulp.watch(['src/*']).on('change', livereload.changed);

});


// 清空文件夹
gulp.task('clean', function(cb) {
    console.log(1);
    del(['dist']);
    return cb();
});

gulp.task('minifyHtml',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    console.log(2);
    return gulp.src('src/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('minifyJs',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        //.pipe(concat('all.js'))
        //.pipe(gulp.dest('dist/js'))
        //.pipe(rename({
        //    suffix: ".min",
        //}))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('minifyCss',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    console.log(4);
    return gulp.src('src/css/*.css')
        .pipe(cssnano())
        //.pipe(concatCss("all.css"))
        //.pipe(gulp.dest('dist/css'))
        //.pipe(rename({
        //    suffix: ".min",
        //}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('minifyImage',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    console.log(5);
    return gulp.src('src/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('use',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});



