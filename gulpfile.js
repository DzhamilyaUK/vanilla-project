const { src, dest, task, series, parallel, watch } = require('gulp')  
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'))  
const browserSync = require('browser-sync').create();  
const webpack = require('webpack');  
const webpackConfig = require('./webpack.config.js');  
const webpackStream = require('webpack-stream');  

const copy = require('gulp-copy');

const clean = require('gulp-clean')

// Задача очистки
task('clean', () => {
    return src('./build', { 
      read: false, //ускоряет процесс, так как Gulp не анализирует содержимое файлов
      allowEmpty: true //предотвращает ошибки при первом запуске, когда папка build еще не существует
    })
      .pipe(clean())
})

//Задача copy
task('copy', () => {
    return src(['./src/public/**/*', './src/assets/**/*'])
      .pipe(dest('./build')) // Простое копирование без сохранения структуры public
      .pipe(browserSync.stream())
})


// SCSS задача
task('scss', () => {
    return src('./src/style/main.scss')
      .pipe(sass({ 
        outputStyle: 'expanded' 
      }).on('error', sass.logError))
      .pipe(dest('./build/css'))
      .pipe(browserSync.stream())
})

task('pug', () => {  
    return src('./src/pug/views/**/*.pug')  
        .pipe(  
            pug({  
                // Your options in here.  
            })  
        )  
        .pipe(dest('./build'))  
        .pipe(browserSync.stream());  
})  
  
task('server', () => {  
    browserSync.init({  
        server: { baseDir: 'build/' },  
        notify: false,  
        online: true  
    })  
})  
  
task('webpack', () => {  
    return src('./src/js/main.js')  
        .pipe(webpackStream(webpackConfig, webpack))  
        .pipe(dest('./build/js'))  
        .pipe(browserSync.stream());  
})  
  
task('watch', () => {  
    watch('./src/pug/**/*.pug', series('pug'));  
    watch('./src/js/**/*.js', series('webpack')); //Watcher для всех js-файлов проекта 
    watch('./src/style/**/*.scss', series('scss'));  // Добавляем отслеживание SCSS
    watch('./src/public/**/*', series('copy'));  // Добавляем отслеживание public
})  
  
// Обновленная задача serve
task('serve', series(
    'clean', // Первым шагом очищаем папку
    parallel('pug', 'webpack', 'scss', 'copy'),  // Добавляем scss в стартовую сборку, добавляем copy
    parallel('watch', 'server')
));
