var gulp = require('gulp');
var del = require('del');
//
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var _ = require('underscore');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins({
    scope: ['devDependencies']
});

var browserify = require('browserify');
var eventstream = require('event-stream');

//
//
// SOURCES
//
//

var sources = {
  index: 'app/index.html',
	sass: ['assets/**/*.scss'],
	partials: [
		'app/pages/**/*.html',
    'app/directives/**/*.html',
    '!app/index.html'
	]
};

var buildTarget = './dist'
var jsAppFileName = 'listenfirst.app.js';
//
//
// INDEX TASKS
//
//

gulp.task('index', function(){
  gulp.src(sources.index)
      .pipe($.rename('index.html'))
      .pipe(gulp.dest(buildTarget));
});

/****
        SCRIPT TASKS
                         *****/


gulp.task('scripts', function() {
    browserifyHelper();
});

gulp.task('prod-scripts', function(){
    browserifyHelper(true);
});

function browserifyHelper(prodBuild) {
      var b = browserify({
          debug: true,
          paths: ['app/', 'node_modules'],
          fullPaths: true,
          cache: {},
          packageCache: {}
      });

      if (!prodBuild) {
          b = watchify(b);
          b.on('update', function(changedFilename){
              bundleHelper(false, b);
          });
      }
      b.add('app/init.js');
      bundleHelper(prodBuild, b);
}

function bundleHelper(prodBuild, b, areaName){
    var bundleBlob = b.bundle();

    if (!prodBuild) {
        bundleBlob =  bundleBlob.on('error', function(err) {
            return $.notify().write(err);
        });
    }

    bundleBlob = bundleBlob.pipe(source(jsAppFileName))
        .pipe(buffer());

    if (!prodBuild) {
        bundleBlob = bundleBlob
            .pipe($.sourcemaps.init({ loadMaps: true }))
            .pipe($.sourcemaps.write('./maps'))
    } else {
        bundleBlob = bundleBlob
            .pipe($.uglify());
    }

    bundleBlob
        .pipe(gulp.dest(buildTarget + '/js/'));
}



/****
        TEMPLATE TASKS
                        *****/

gulp.task('templates', function() {
    templateHelper();
});

gulp.task('prod-templates', function(){
    templateHelper(true);
});

function templateHelper(prodBuild) {
  var templateBlob = gulp.src(['app/directives/**/*.html', 'app/pages/**/*.html'])
    .pipe($.ngHtml2js({
      moduleName: 'listenfirst.templates'
    }))
    .pipe($.concat('listenfirst.templates.js'));


     if (prodBuild) {
        templateBlob = templateBlob
            .pipe($.uglify());
     }

    return templateBlob.pipe(gulp.dest(buildTarget + '/js/'));
}

//
//
// BUILD HELPERS
//
//

gulp.task('clean', function(){
    del([ './dist/']);
});


/*****
        STYLE TASKS
                        ******/
gulp.task('temp-stylesheets', function(){
    return gulp.src('app/assets/**/*')
      .pipe(gulp.dest(buildTarget + '/assets'));
});

gulp.task('vendor-stylesheets', function(){
    return gulp.src(sources.vendorCss)
        .pipe($.concat('community.vendor.css'))
        .pipe(gulp.dest('app/design/'))
    });

gulp.task('compile-stylesheets', ['vendor-stylesheets'], function(){
    return gulp.src(sources.sass)
        .pipe($.compass({
           css: 'app/design',
           sass: 'assets/sass'
    }))
});

gulp.task('compile-prod-stylesheets', ['vendor-stylesheets'], function(){
    return gulp.src(sources.sass)
        .pipe($.compass({
           css: 'app/design',
           sass: 'assets/sass',
           environment: 'production'
    }))
});

function stylesheetHelper(prodBuild) {
     areaBuilder(function(areaName){
        var blob = gulp.src('app/design/*.css');

        if (!prodBuild) {
            blob = blob
            .pipe(buffer())
            .pipe($.sourcemaps.init({ loadMaps: true }))
            .pipe($.sourcemaps.write('./maps'))
        }

        return blob.pipe(gulp.dest(areaPath(areaName) + '/css'));
    });
}


gulp.task('vendor-images', function(){
    areaBuilder(function(areaName){
        return gulp.src(sources.vendorImg)
            .pipe(gulp.dest(areaPath(areaName) + '/css/images'))
    });
});

gulp.task('stylesheets', ['compile-stylesheets', 'vendor-images'], function(){
    stylesheetHelper();
});

gulp.task('prod-stylesheets', ['compile-stylesheets', 'vendor-images'], function(){
   stylesheetHelper(true);
});



//
//
// SERVER
//
//
gulp.task('watch', function () {
	gulp.watch(sources.partials, ['templates']);
  //gulp.watch(sources.sass, ['stylesheets']);
});

//
//
// SERVER
//
//
gulp.task('express', function() {
    var express = require('express');
    var app = express();

    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/dist/');

    app.use(express.static(__dirname + '/dist/'));
    app.get('/*', function (req,res) {
        res.render('index.html');
    });

    app.listen(4200);
});



//
//
// TASKS
//
//

gulp.task('default', ['dev', 'watch']);

gulp.task('dev-prod', ['prod', 'watch', 'express']);

gulp.task('dev', ['index', 'scripts', 'templates', 'temp-stylesheets', 'express']);

gulp.task('prod', ['index', 'localization', 'prod-scripts', 'prod-templates', 'prod-stylesheets']);
