gulp      = require('gulp')
plumber   = require('gulp-plumber')
util      = require('gulp-util')
sass      = require('gulp-ruby-sass')
rimraf    = require('gulp-rimraf')
uglify    = require('gulp-uglify')
minifyCSS = require('gulp-minify-css')
streamify = require('gulp-streamify')
size      = require('gulp-size')
tap       = require('gulp-tap')

browserify = require('browserify')
ts         = require('tsify')
source     = require('vinyl-source-stream')
espowerify = require('espowerify')
mold       = require('mold-source-map')

path        = require('path')
browserSync = require('browser-sync')
pkg         = require(__dirname + '/package.json')

minify = false
environment = process.env['ENV'] || 'development'

if environment == 'production'
  minify = true


### browserSync ###########################################
gulp.task 'browser-sync', ->
  browserSync
    proxy: "http://localhost:3000"

gulp.task 'bs-reload', ->
  browserSync.reload()

gulp.task 'clean', ->
  gulp.src('public/assets')
    .pipe(rimraf())


### browserify ###########################################
getBundler = (filepath, opts = {}) ->
  extensions = opts.extensions
  plugins    = opts.plugins ? []
  transforms = opts.transforms ? []

  browserifyOpts =
    entries: [filepath]
    debug: true
  browserifyOpts.extensions = extensions if extensions?

  bundler = browserify(browserifyOpts)

  for p in plugins
    if typeof p == "object"
      for k, o of p
        bundler = bundler.plugin(k, o).on('error', util.log)
    else
      bundler = bundler.plugin(p).on('error', util.log)

  for t in transforms
    if typeof t == "object"
      for k, o of t
        bundler = bundler.transform(o, require(k))
    else
      bundler = bundler.transform(require(t))
  bundler

gulp.task 'browserify', ->
  entries = pkg.browserify.entryScripts
  gulp.src(entries)
    .pipe(tap (file) ->
      extname = path.extname(file.path)
      output = path.basename(file.path, extname) + '.js'

      bundler = if extname == ".ts"
        getBundler(file.path, {
          extensions: [".ts"]
          plugins: ["tsify"]
          transforms: ["hbsfy", "espowerify"]
        }).bundle().pipe(source(output))
      else
        getBundler(file.path, {
          extensions: [".coffee"]
          transforms: ["coffeeify", "hbsfy", "espowerify"]
        }).bundle().on('error', util.log).pipe(source(output))

      stream = if minify
        bundler.pipe(streamify(uglify())).pipe(streamify(size()))
      else
        bundler

      return stream.pipe(gulp.dest("public/assets"))
    )

gulp.task 'browserify-test', ->
  entries = ['./spec/javascripts/**/*_spec.{js,coffee,ts}']
  gulp.src(entries)
    .pipe(tap (file) ->
      extname = path.extname(file.path)
      output = path.basename(file.path, extname) + '.js'

      bundler = if extname == ".ts"
        getBundler(file.path, {
          extensions: [".ts"]
          plugins: ["tsify"]
          transforms: ["hbsfy", "espowerify"]
        }).bundle()
      else
        getBundler(file.path, {
          extensions: [".coffee"]
          transforms: ["coffeeify", "hbsfy", "espowerify"]
        }).bundle().on('error', util.log)

      bundler
        .pipe(mold.transformSourcesRelativeTo(__dirname))
        .pipe(source(output))
        .pipe(gulp.dest("spec/.powered-javascripts"))
    )


### sass ###########################################
gulp.task 'glyphicon', ->
  gulp.src('bower_components/bootstrap-sass-official/assets/fonts/bootstrap/glyphicons-halflings-regular.*')
    .pipe(gulp.dest("public/assets/fonts/bootstrap"))

gulp.task 'sass', ['glyphicon'], ->
  css = gulp.src(['app/assets/stylesheets/**/*.scss', 'app/assets/stylesheets/**/*.sass'])
    .pipe(gulp.dest("public/assets/sass"))
    .pipe(plumber())
    .pipe(sass(
      sourcemap: true
      sourcemapPath: "./sass"
      compass: true
      bundleExec: true
      loadPath: [
        "./bower_components"
      ]
    ))

  stream = if minify
    css.pipe(minifyCSS()).pipe(size())
  else
    css

  stream.pipe(gulp.dest("public/assets"))


### watch ###########################################
gulp.task 'watch', ['browser-sync'], ->
  gulp.watch('app/assets/javascripts/**/*.{js,coffee,ts}', ['browserify'])
  gulp.watch('app/assets/stylesheets/**/*.{scss,sass}', ['sass'])
  gulp.watch([
    'public/assets/**/*.js',
    'public/assets/**/*.css',
  ], ['bs-reload'])

gulp.task 'default', ['browserify', 'sass']
