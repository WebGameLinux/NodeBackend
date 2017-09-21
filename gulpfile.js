/**
 * create by vim
 * @author : weblinuxgame
 * @version 1.0.0
 * @description  项目 gulp 脚本
 * ***/
  const gulp 	= require('gulp');
  const path	= require('path');
  const min     = require('gulp-min');
  const less    = require('gulp-less');
  const babel   = require('gulp-babel');
  const watch   = require('gulp-watch');

  const file_type = {
      'babel_loader_file': /\.(es6\.js|\.es6)$/,
      'less_loader_file':  /\.less$/,
      'minify_loader_file': /\.js$/,
  };
  	
  gulp.task('default',function(callback){

	  console.log(callback,config);

  });	
  
