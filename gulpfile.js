var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins({
	scope: ['devDependencies']
});

var mainBowerFiles = require('main-bower-files');
var bowerFiles = mainBowerFiles({ includeDev: true });

//
//
// FILTERS
//
//

var jsFilter = $.filter(['**/*.js', '*.js']);
var cssFilter = $.filter(['**/*.css', '*.css']);
var imgFilter = $.filter(['/**/*.png', '*.png', '**/*.gif']);
var lessFilter = $.filter(['/**/*.less', '*.less']);
//
//
// SOURCES
//
//

var sources = {
	index: 'index.html',
	js: ['scripts/**/*.js'],
	img: ['images/*.gif'],
	css: ['css/*.css'],
	fonts: ['fonts/**/*'],
	templates: ['templates/*.html'],
};

gulp.task('index', function () {
	return gulp.src(sources.index)
		.pipe($.rename("index.html"))
		.pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
	return gulp.src(sources.js)
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('css', function () {
	return gulp.src(sources.css)
		.pipe($.concat('styles.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function(){
	return gulp.src(sources.fonts)
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('templates', function () {
	return gulp.src(sources.templates)
		.pipe($.ngHtml2js({
	        moduleName: "ListenFirst"
	    }))
		.pipe(gulp.dest('dist/templates'));
});

gulp.task('img', function () {
	return gulp.src(sources.img)
		.pipe(gulp.dest('dist/img'));
});

gulp.task('bower', function () {
	return gulp.src(bowerFiles)
		.pipe(jsFilter)
		.pipe(gulp.dest('dist/vendor/js'))
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
		.pipe(gulp.dest('dist/vendor/css'))
		.pipe(cssFilter.restore())
		.pipe(imgFilter)
		.pipe(gulp.dest('dist/vendor/css'))
		.pipe(imgFilter.restore());
});

//
//
// INJECT
//
//

gulp.task('inject', ['build'], function() {
    return gulp.src('./dist/index.html')
		.pipe($.inject(gulp.src(bowerFiles, { read: false }), { 
			name: 'bower', 
			ignorePath: 'bower_components/', 
			addRootSlash: false,
			transform: function (filepath) {
				var newPath;
				var cleanFilepath = filepath.replace(/^[/\\\\]?(?:.+[/\\\\]+?)?(.+?)[/\\\\]/, '');
				var extension = cleanFilepath.split('.').pop();
				if (extension == 'js') {
					newPath = '<script src="vendor/js/' + cleanFilepath + '"></script>';
				} 
				else if (extension == 'css') {
					newPath = '<link rel="stylesheet" href="vendor/css/' + cleanFilepath + '">';
				}
				return newPath;
			} 
		})) 
		.pipe($.inject(gulp.src(['dist/css/**/*.css', 'dist/scripts/**/*.js', 'dist/templates/**/**/*.js'], 
			{ read: false }), { name: 'app', ignorePath: "/dist", addRootSlash: false }))
		.pipe($.rename("index.html"))
		.pipe(gulp.dest('./dist'));
});



//
//
// WATCH
//
//

gulp.task('watch', function () {
	gulp.watch(sources.index, ['index']);
	gulp.watch(sources.js, ['scripts']);
	gulp.watch(sources.less, ['css']);
	gulp.watch(sources.templates, ['templates']);
	gulp.watch(sources.img, ['img']);
});


//
//
// TASKS
//
//

gulp.task('default', ['build', 'inject', 'watch']);

gulp.task('build', ['index', 'scripts', 'css', 'templates', 'img', 'fonts', 'bower']);

