var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var plumber = require("gulp-plumber");
var ghPages = require('gulp-gh-pages');

//Пути
const paths = {
    styles: {
      src: "src/styles/main.scss",
      watch: "src/styles/**/*.scss",
      dest: "dist/styles/"
    },
    stylesNlz: {
      src: "src/styles/layout/normalize.css",
      dest: "dist/styles/normalize/"
    },
    scripts: {
      src: "src/scripts/main.js",
      watch: "src/scripts/modules/*.js",
      dest: "dist/scripts/"
    },
    html: {
      src: "src/*.html",
      watch: "src/*.html",
      dest: "dist/"
    },
    images: {
      src: "src/images/**/*.*",
      dest: "dist/images/"
    },
    fonts: {
      src: "src/fonts/*.*",
      dest: "dist/fonts/"
    }
};


//Удаление папки dist
gulp.task("clean", () => {
    return del("dist");
});

//Создание ветки gh-pages и загрузка туда содержимого папки dist
gulp.task("deploy", () => {
    return gulp.src("./dist/**/*").pipe(ghPages());
});

//Перенос файлов 
gulp.task('html', function() {
    return gulp
      .src(paths.html.src)
      .pipe(plumber())
      .pipe(gulp.dest(paths.html.dest));
});

gulp.task('stylesNlz', function() {
    return gulp.src(paths.stylesNlz.src).pipe(gulp.dest(paths.stylesNlz.dest));
});

gulp.task('styles', function() {
    return gulp.src('src/main.css').pipe(gulp.dest(paths.styles.dest));
});
  
gulp.task('images', function() {
    return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('serve', ['sass'], function() {
browserSync.init({
server: "src/"
});
//Слежение
gulp.watch(paths.styles.watch, ['sass']);
gulp.watch(paths.html.watch).on('change', browserSync.reload);
gulp.watch(paths.images.src).on('change', browserSync.reload);
});
//Компилируем scss в css + автопрефиксер
gulp.task('sass', function() {
return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concatCss("main.css"))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
});

//Запуск сборки
gulp.task('build', ['clean', 'serve','html', 'styles', 'stylesNlz', 'fonts', 'images']);
//Запуск default
gulp.task('default', ['build']);