const path           = require('path');
const notifier       = require('node-notifier');
const gulp           = require('gulp');
const gulpBabel      = require('gulp-babel');
const gulpChanged    = require('gulp-changed');
const gulpPlumber    = require('gulp-plumber');
const gulpConcat     = require('gulp-concat');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpIf         = require('gulp-if');
const gulpIgnore     = require('gulp-ignore');
const runSequence    = require('run-sequence');
const packageParam   = require('./package.json');
const ENV            = process.env.NODE_ENV;

let isWatching       = false;

// =============================================================================
// 
// CONFIGURATION
// 
let conf = {
  concat  : {},
  options : {},
  path    : {
    src  : path.join(__dirname, 'src'),
    dest : path.join(__dirname, 'dest')
  }
};
// -----------------------------------------------------------------------------
// Concat
// 
conf.concat[`${packageParam.name}.js`] = [
  'asset/core/_header.js',
  'asset/core/_constructor.js',
  'asset/core/_add.js',
  'asset/core/_validate.js',
  'asset/core/_footer.js',
  'asset/core/__config.js',
  'asset/core/__error.js',
  'asset/core/__Hook.js',
  'asset/core/__rule.js',
  'asset/core/__plugin.js',
  'asset/core/__init.js',
  'asset/rule/_default-rules.js',
  // 'asset/plugin/_default-plugins.js'
  'asset/plugin/_2to1.js'
];
// -----------------------------------------------------------------------------
// Babel
// 
conf.options.babel = {
  minified : false,
  comments : true,
  presets  : [
    ['env', {
        'loose'    : true,
        'modules'  : false,
        'browsers' : ['last 3 version']
    }]
  ]
};
// -----------------------------------------------------------------------------
// plumber conf.
// 
conf.options.plumber = {
  errorHandler : function(err){
    let relativePath = err.fileName;
    relativePath = path.relative(process.cwd(), relativePath);
    notifier.notify({
        'title'   : `JS ${err.name}`,
        'message' : `${err.name} : ${relativePath}\n{ Line : ${err.loc.line}, Column : ${err.loc.column} }`,
        'sound'   : 'Pop'
    });
    console.error(`Line: ${err.loc.line}, Column: ${err.loc.column}`);
    console.error(err.stack);
    gulp.emit('end');
  }
};
// =============================================================================
// 
// TASKS
// 
// -----------------------------------------------------------------------------
// concat JS files by list of "conf.concat".
// 
gulp.task('concat', (done)=>{
  let baseSrc  = conf.path.src.js;
  let baseDest = conf.path.dest.js;
  let num      = Object.keys(conf.concat).length;
  for(let destFileName in conf.concat){
    let list = conf.concat[destFileName];
    list = list.map((filePath)=>{
      return path.join(conf.path.src, filePath);
    });
    gulp.src(list)
      .pipe(gulpConcat(destFileName))
      .pipe(gulp.dest(conf.path.src))
      .on('end', ()=>{
        num--;
        if(num === 0) done();
      });
  }
  return false;
});
// -----------------------------------------------------------------------------
// build JS files.
// 
gulp.task('build', ()=>{
  return runSequence('concat', ()=>{
    let ops      = conf.options;
    let babelOps = ops.babel;
    let cache    = isWatching;
    let ignore   = '**/_*.js';
    let target   = path.join(conf.path.src, '**/*.js');
    let dest     = conf.path.dest;
    return gulp.src(target)
      .pipe(gulpIgnore(ignore))
      .pipe(gulpIf(cache, gulpChanged(dest, ops.changed)))
      .pipe(gulpPlumber(ops.plumber))
      .pipe(gulpSourcemaps.init())
      .pipe(gulpBabel(babelOps))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulpPlumber.stop())
      .pipe(gulp.dest(dest));
  });
});
// -----------------------------------------------------------------------------
// watch JS files.
// 
gulp.task('watch', ()=>{
  isWatching = true;
  gulp.watch(path.join(conf.path.src, '**/*.js'), ['build']);
});

gulp.task('default', ()=>{});
