var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat'); // 合并文件
var concatCss = require('gulp-concat-css'); // 合并css文件
var rename = require("gulp-rename");
var uglify = require('gulp-uglify'); // 压缩js文件
var cssnano = require('gulp-cssnano'); // 压缩css文件
var minifyHTML = require('gulp-minify-html'); // 压缩html
var imagemin = require('gulp-imagemin'); // 图片压缩
var rev = require('gulp-rev'); // 打版本号
var notify = require("gulp-notify");
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var useref = require('gulp-useref');
var revCollector = require("gulp-rev-collector");
var revReplace = require('gulp-rev-replace');
var runSequence = require('run-sequence'); // 顺序执行

var config = {
    css: {
             src: 'src/css/*.css',
            dest: 'dist/css',
         },
    js: {
            src: 'src/js/*.js',
           dest: 'dist/js',
        },
    images: {
                src: 'src/images/*.*',
               dest: 'dist/images',
            },
    rev: {
            revJson: 'dist/rev/**/*.json',
            src: 'index.html',
            dest: ''
         }
};


// 默认任务
gulp.task('over', function(){
    gulp.src('./dist/index.html')
        .pipe(open({app: 'chrome'}))
        .pipe(notify("构建完成"));
});

// 默认任务
gulp.task('default', function(done) {
   return runSequence(
    'clean',
    'minifyJs',
    'minifyCss',
     'minifyImage',
     'minifyHtml');
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

// 版本号替换有问题
gulp.task('minifyHtml',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    console.log(2);
    return gulp.src('src/index.html')
    //    .pipe(revReplace())
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// todo 添加版本号替换有问题
gulp.task('minifyJs',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        //.pipe(rev()) // set hash key
        //.pipe(concat('all.js'))
        //.pipe(gulp.dest('dist/js'))
        //.pipe(rename({
        //    suffix: ".min",
        //}))
        .pipe(gulp.dest(config.js.dest))
        //.pipe(rev.manifest()) // set hash key json
        //.pipe(gulp.dest('dist/rev')) // dest hash key json
        .pipe(livereload());
});

gulp.task('minifyCss',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    console.log(4);
    return gulp.src(config.css.src)
        .pipe(cssnano())
        //.pipe(concatCss("all.css"))
        //.pipe(gulp.dest('dist/css'))
        //.pipe(rename({
        //    suffix: ".min",
        //}))
        .pipe(gulp.dest(config.css.dest))
        .pipe(livereload());
});

gulp.task('minifyImage',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    console.log(5);
    return gulp.src(config.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dest));
});

gulp.task('use',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});



