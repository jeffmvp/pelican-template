//=======================================================================
// VARIABLES
//=======================================================================

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var convertEncoding = require('gulp-convert-encoding');
var notify = require('gulp-notify');
var exec = require('gulp-exec');
var run = require('gulp-run');



//=======================================================================
// WATCH & BUILD
//=======================================================================

// WATCH
gulp.task('watch', function() {
    gulp.watch('assets/src/scripts/**/*.js', ['javascript']);
    gulp.watch('assets/src/styles/**/*.scss', ['sass']);
    gulp.watch('content/**/*', ['pelican']);
});

// DEFAULT
gulp.task('default', ['javascript', 'sass', 'pelican']);


gulp.task('pelican', function() {
  return run('pelican').exec()
  ;
})


//=======================================================================
// TEMPLATE
//=======================================================================

// gulp.task('pelican', function() {
//     exec('pelican content');
// });
// JAVASCRIPT
gulp.task('javascript', function() {
    return gulp.src([
            'assets/src/scripts/_vendor/*.js',
            'assets/src/scripts/app/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(convertEncoding({
            to: 'utf8'
        }))
        .pipe(gulp.dest('themes/mvp/static/js'))
        run('pelican').exec()

        .pipe(notify({
            message: '[javascript] template -> app.js'
        }));
});

// SASS
gulp.task('sass', function() {
    gulp.src('assets/src/styles/styles.scss')
        .pipe(sass())
        .pipe(autoprefix('last 4 versions', 'ie 9'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('themes/mvp/static/css'))
        run('pelican').exec()
        .pipe(notify({
            message: '[sass] template -> styles.css'
        }));
});
