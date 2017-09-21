/**
 * create by vim
 * @author : weblinuxgame
 * @version 1.0.0
 * @description  项目 gulp 脚本
 * ***/
  const gulp 	= require('gulp');
  const path	= require('path');
  const config  = require('./built_env/__built/config');
  
  	
  gulp.task('default',function(callback){

	  console.log(callback,config);

  });	
  
