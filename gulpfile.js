/**
 * create by vim
 * @author : weblinuxgame
 * @version 1.0.0
 * @description  项目 自动化构建 脚本
 * ***/
  'use strict';
  const gulp 	     = require('gulp');
  const plugins    = require('gulp-load-plugins')();
  const path	     = require('path');
  const fs         = require('fs');
  const color      = require('colors');
  const hash       = require('hash.js');
  const Emitter    = new(require('eventemitter3'));
  const FileWatcher  = require('chokidar');
  const file_type  = {
      'babel_loader_file':{
          test:/\.(es6\.js|\.es6)$/
      },
      'less_loader_file': {
          test:/\.less$/
      },
      'minify_loader_file':{
          test:/\.js$/
      },
      'handlebars_loader_file':{
          test:/\.(tpl|\.tpl\.html)$/
      },
  };
  const config     = {
      debug:true,
  };
  const watch_list = {};
  var watcher ;

  function tip(msg,info)
  {
    var t = new Date(),
        time = t.getDate()+':'+t.getHours()+':'+t.getMinutes();
    return    console.log('['+time.grey+']',msg,info.magenta);
  }

  function getFileHash(file,context)
  {
    var content  ;
    if(!fs.lstatSync(file).isFile())
    {
      return false;
    }
    if( 'undefined' === typeof context || 'undefined' === typeof context[file])
    {
       content = fs.readFileSync(file,{encode:'utf-8',flag:'r'});
       // console.log(content.length);
       content = 0 === content.length ? file : content ;
       return hash.sha256().update(content).digest('hex');
    }
    return  'undefined' !== typeof context[file]['hash'] ? context[file]['hash'] : getFileHash(file);
  }

  /**
   * [监听 文件 修改]
   */
  Emitter.on('change',function (data) {
      var new_hash = '';
      if('undefined'!==typeof watch_list[data])
      {
        new_hash = getFileHash(data) ;
        if( new_hash === watcher.watch_list[data]['hash'])
        {
           return ;
        }
      }
      watcher.watch_list[data]['hash'] = new_hash ;
      tip('change event',data);
  });
  // [监听 文件|文件夹 创建]
  Emitter.on('add',function (data) {

  });
 // [监听 文件|文件夹 删除]
  Emitter.on('delete',function (data) {
      tip('delete event',data);
      if( 'undefined' !== typeof watch_list[data])
      {
        // tip(data,JSON.stringify(watch_list[data]));
        delete watcher.watch_list[data];
      }
  });
  // [监听 发布 任务]
  Emitter.on('push',function (data) {
     tip('push event',data);
  });
  // [监听 任务 移除]
  Emitter.on('remove',function (data) {
      tip('remove event',data);
  });
  // 默认 任务 [任务启动]
  gulp.task('default',function () {

    watcher = FileWatcher.watch(__dirname,{
      ignored:/(___jb_tmp___|bower_components|node_modules|\.git|\.idea|\.DS_STORE)/,
      persistent:true,
      atomic:true,
    });
    watcher.watch_list = watch_list ;
    watcher.on('change', function (fileName) {
          Emitter.emit('change',fileName);
    });
    watcher.on('add', function (fileName) {
      if( fs.lstatSync(fileName).isFile())
      {
         // console.log(this.watch_list);
          this.watch_list[fileName] = {
             hash:getFileHash(fileName),
         };
      }
        Emitter.emit('add',fileName);
    });
    watcher.on('unlink', function (fileName) {
        Emitter.emit('delete',fileName);
    });

    // watcher.on('all',function (eventType) {
    //    // tip('file watcher : ',eventType);
    // });
    watcher.on('addDir',function (fileName) {

      Emitter.emit('add',fileName);
    });
    watcher.on('unlinkDir',function (fileName) {
        Emitter.emit('delete',fileName);
    });
    watcher.on('error',function(error) {
        tip('error',error);
    });
});
  // [命令 行 调用发布]
  gulp.task('push',function(){
      Emitter.emit('push');
  });
  // [命令行调 推送]
  gulp.task('publish',function(){
      Emitter.emit('push');
  });
