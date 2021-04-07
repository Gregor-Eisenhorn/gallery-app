//modules
const { series, parallel, watch } = require("gulp"),
  gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber"),
  concat = require("gulp-concat"),
  removeUseStrict = require("gulp-remove-use-strict"),
  babel = require("gulp-babel");

//path
const sourcePath = "./sources",
  assetPath = "./assets";

//js files, libraries and plugins
const jsFiles = [
  sourcePath + "/js/app.js"
];

function style() {
  return gulp
    .src(sourcePath + "/scss/style.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        remove: false,
        overrideBrowsersList: ["last 3 versions"],
      })
    )
    .pipe(gulp.dest(assetPath + "/css/style.css"));
}

async function script() {
  gulp
    .src(jsFiles)
    .pipe(plumber())
    .pipe(concat("./assets/js/app.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
        sourceType: 'script'
      })
    )
    .pipe(removeUseStrict())
    .pipe(gulp.dest(assetPath));
}

function dev() {
  gulp.watch(sourcePath + "/scss/style.scss", series(style));
  gulp.watch(jsFiles, series(script));
}

exports.style = style;
exports.script = script;
exports.build = series(style, script);
exports.default = dev;