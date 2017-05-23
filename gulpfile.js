var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

//生成html文件
gulp.task('html', function (){
  return gulp.src('src/html/**/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
  console.log('刷新成功');
});

gulp.task('images', function (){
  return gulp.src('src/images/*.{jpg,png,gif,jpeg,svg}')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

gulp.task('plugins', function (){
  return gulp.src('src/plugins/**/*')
  .pipe(gulp.dest('dist/plugins'));
});

gulp.task('css', function (){
  return gulp.src('src/css/**/*.less')
  .pipe(less())
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function (){
  return gulp.src(['src/js/jquery.js', 'src/js/jquery-json.js'])
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('server', function (){
  connect.server({
    root: 'dist',
    livereload: true
  })
});

gulp.task('watch', function (){
  gulp.watch('src/html/index.html', ['html']);
});

gulp.task('default', ['server', 'watch']);
