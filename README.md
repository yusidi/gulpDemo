### 开始之前，请执行npm install ######
```
nstall -g gulp

// 安装到项目里
npm install --save-dev gulp
```
### gulpfile.js
项目根目录中的gulpfile.js，是Gulp的配置文件。
```
 const config = require('config');
 const gulp = require('gulp');
 const $ = require('gulp-load-plugins')();
 const del = require('del');
 const runSequence = require('run-sequence');
 const escapeStringRegexp = require('escape-string-regexp');
 
gulp.task('image.copy', () => gulp.src(paths.source_image)
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist_image))
    .pipe($.livereload()));
```
### gulp模块的方法
* src()
输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。 将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。
```
gulp.task('js', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});
```
参数的写法一般有以下几种形式。
1. js/app.js：指定确切的文件名。
2. js/*.js：某个目录所有后缀名为js的文件。
3. js/**/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
4. !js/app.js：除了js/app.js以外的所有文件。
5. ['js/**/*.js', '!js/app.js']

* dest()
能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。
```
gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```
dest方法还可以接受第二个参数，表示配置对象。
1. cwd: 表示基准目录
2. mode： 表示写入文件的权限默认是0777
* task()
定义一个使用 Orchestrator 实现的任务（task）。
```
gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
  // 做一些事
});
```
参数：它的第一个参数是任务名，第二个参数是任务函数。
1. 异步任务支持：
接受一个callback
```
// 在 shell 中执行一个命令
var exec = require('child_process').exec;
gulp.task('jekyll', function(cb) {
  // 编译 Jekyll
  exec('jekyll build', function(err) {
    if (err) return cb(err); // 返回 error
    cb(); // 完成 task
  });
});
```

2. 返回一个stream
```
gulp.task('somename', function() {
  var stream = gulp.src('client/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
  return stream;
});
```

3. 返回一个promise
```
var Q = require('q');

gulp.task('somename', function() {
  var deferred = Q.defer();

  // 执行异步的操作
  setTimeout(function() {
    deferred.resolve();
  }, 1);

  return deferred.promise;
});
```

task顺序执行的话原理是利用回调函数
```
var gulp = require('gulp');

// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('one', function(cb) {
    // 做一些事 -- 异步的或者其他的
    cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
});

// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('two', ['one'], function() {
    // 'one' 完成后
});

gulp.task('default', ['one', 'two']);
```

* watch()
监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） change 事件。
```
gulp.task('watch', function () {
   gulp.watch('templates/*.tmpl.html', ['build']);
});
// 触发change事件
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```
watch还可以触发的事件
1. end：回调函数运行完毕时触发。
2. error：发生错误时触发。
3. ready：当开始监听文件时触发。
4. nomatch：没有匹配的监听文件时触发。
watcher对象还包含其他一些方法。
1. watcher.end()：停止watcher对象，不会再调用任务或回调函数。
2. watcher.files()：返回watcher对象监视的文件。
3. watcher.add(glob)：增加所要监视的文件，它还可以附件第二个参数，表示回调函数。
4. watcher.remove(filepath)：从watcher对象中移走一个监视的文件。
### 参考链接
* http://www.gulpjs.com.cn/docs/api/
* https://www.smashingmagazine.com/2014/06/building-with-gulp/~                                                             
