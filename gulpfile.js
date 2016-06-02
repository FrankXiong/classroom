var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    config = require('./config.json'),
    opn = require('opn'),
    clean = require('gulp-clean'),
    babel = require('gulp-babel');


gulp.task('default',['clean'],function() {
    gulp.run("clean");
    gulp.run("libs");
    gulp.run("generate");
    gulp.run("watch");
    gulp.run("openbrowser");
});


gulp.task('sass', function() {  
  return gulp.src('src/css/**/*.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'SASS task complete' }));
});

gulp.task('js', function() {  
  return gulp.src('src/js/**/*.*')
    .pipe(gulp.dest('dist/static/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('lib', function() {  
  return gulp.src('src/lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/static/js/lib'))
    .pipe(livereload())
    .pipe(notify({ message: 'Lib task complete' }));
});

gulp.task('babel', function() {
  return gulp.src('src/js/app/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/static/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Babel task complete' }));
});

gulp.task('img', function() {  
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/static/img'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('font', function() {  
  return gulp.src('src/font/**/*')
    .pipe(gulp.dest('dist/static/font'))
    .pipe(livereload())
    .pipe(notify({ message: 'Fonts task complete' }));
});


var libs = {
    js: [
        "vendor/assets/requirejs/require.js",
        "vendor/assets/jquery/dist/jquery.js",
        "vendor/assets/amazeui/dist/js/amazeui.js",
        "vendor/assets/leancloud-push.js/src/AV.push.js",
        "vendor/assets/moment/moment.js",
        "vendor/assets/bcrypt/bcrypt.js"
    ],
    css:[
        "vendor/assets/normalize-css/normalize.css",
        "vendor/assets/amazeui/dist/css/amazeui.css",
        "vendor/assets/weui/dist/style/weui.css"
    ],
    font:[
        "vendor/assets/amazeui/dist/fonts/fontawesome-webfont.eot",
        "vendor/assets/amazeui/dist/fonts/fontawesome-webfont.svg",
        "vendor/assets/amazeui/dist/fonts/fontawesome-webfont.ttf",
        "vendor/assets/amazeui/dist/fonts/fontawesome-webfont.woff",
        "vendor/assets/amazeui/dist/fonts/fontawesome-webfont.woff2"
    ]
};

gulp.task("libs", function() {
  gulp.src(libs.js)
    .pipe(uglify())
    .pipe(gulp.dest('dist/static/js/lib'))
    .pipe(notify({ message: 'Libs-Scripts task complete' }));

  gulp.src(libs.css)
    .pipe(minifycss())
    .pipe(gulp.dest('dist/static/css/lib'))
    .pipe(notify({ message: 'Libs-Stylesheets task complete!' }));

  gulp.src(libs.font)
    .pipe(gulp.dest('dist/static/font'))
    .pipe(notify({ message: 'Libs-Fonts task complete!' }));
});

gulp.task("data", function() {
  gulp.src('src/data/*.json')
    .pipe(gulp.dest('dist/static/data'))
    .pipe(notify({ message: 'JSON Data Updated!' }));
});


//开启本地 Web 服务器功能
gulp.task('server', [ 'generate' ],function() {
  gulp.src( ['./dist'] )
    .pipe(webserver({
      host:             config.localserver.host,
      port:             config.localserver.port,
      livereload:       true,
      directoryListing: false
    }));
});

//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
  opn( 'http://' + config.localserver.host + ':' + config.localserver.port );
});

gulp.task('clean', function() {
  return gulp.src([
      'dist/static/css/**/*.min.css',
      'dist/static/css/**/*.css',
      'dist/static/img/*.*',
      'dist/static/js/**/*.js',
      'dist/static/js/**/*.min.js',
      'dist/static/font/*.*',
      'dist/*.html'
      ], {read: false})
    .pipe(clean({force: true}));
});


gulp.task('reload', ['clean', 'default']);

gulp.task('watch', function() {

    livereload.listen();
    gulp.watch(['src/**']).on('change', livereload.changed);

    gulp.watch('src/img/*.*', ['img']);   

    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch('src/css/*.scss', ['sass']);

    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/js/**/*.js', ['js']);

    gulp.watch('src/font/*.eot', ['font']);
    gulp.watch('src/font/*.svg', ['font']);
    gulp.watch('src/font/*.ttf', ['font']);
    gulp.watch('src/font/*.woff', ['font']);

});

gulp.task('generate', ['img','sass', 'js', 'font','data','lib']);




