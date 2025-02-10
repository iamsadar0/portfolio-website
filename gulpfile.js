const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

// Сервер
gulp.task("server", function () {
	browserSync({
		server: {
			baseDir: "dist",
		},
	});

	gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Стили
gulp.task("styles", function () {
	return gulp
		.src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(rename({ suffix: ".min", prefix: "" }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

// HTML
gulp.task("html", function () {
	return gulp
		.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

// Скрипты
gulp.task("scripts", function () {
	return gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

// Шрифты
gulp.task("fonts", function () {
	return gulp
		.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"))
		.pipe(browserSync.stream());
});

// Иконки
gulp.task("icons", function () {
	return gulp
		.src("src/icons/**/*")
		.pipe(gulp.dest("dist/icons"))
		.pipe(browserSync.stream());
});

// Изображения
gulp.task("images", function () {
	return gulp
		.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"))
		.pipe(browserSync.stream());
});

// Папка mailer
gulp.task("mailer", function () {
	return gulp
		.src("src/mailer/**/*") // Копирует содержимое папки mailer
		.pipe(gulp.dest("dist/mailer"))
		.pipe(browserSync.stream());
});

// Наблюдение за изменениями
gulp.task("watch", function () {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
	gulp.watch("src/*.html").on("change", gulp.parallel("html"));
	gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
	gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
	gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
	gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
	gulp.watch("src/mailer/**/*").on("all", gulp.parallel("mailer"));
});

// Задача по умолчанию
gulp.task(
	"default",
	gulp.parallel(
		"watch",
		"server",
		"styles",
		"scripts",
		"fonts",
		"icons",
		"html",
		"images",
		"mailer"
	)
);
