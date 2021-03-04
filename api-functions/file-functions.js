const fs=require("fs"),
  crypto=require("crypto");

const Rokita_path_procesor=require("./path-processor");

class Rokita_file_procesor extends Rokita_path_procesor{
  read(returnCallback){
    if(!fs.existsSync(this.path)){
      returnCallback(JSON.stringify({
        path:this.path,
        status:"error",
        content:"file_not_exists"
      }));
    }else if(!fs.statsSync(this.path).isFile()){
      returnCallback(JSON.stringify({
        path:this.path,
        status:"error",
        content:"path_to_nonfile_object"
      }));
    }else{
      returnCallback(JSON.stringify({
        path:this.path,
        content:fs.readFileSync(this.path, {encoding:"utf-8"})
      }));
    }
  }
  write(returnCallback, content){
    fs.writeFile(this.path, content, function(){
      returnCallback(JSON.stringify({
        path:this.path,
        status:"ok"
      }));
    });
  }
  append(returnCallback, content){
    fs.appendFile(this.path, content, function(){
      returnCallback(JSON.stringify({
        path:this.path,
        status:"ok"
      }));
    });
  }
  upload(returnCallback, file, destinationPath){
    if(decodeUploadFile(
      file.tmpName,
      destinationPath
    )){
      JSON.stringify({
        path:this.path,
        status:"ok"
      });
    }else{
      return JSON.stringify({
        path:this.path,
        status:"error"
      });
    }
  }
  create(returnCallback){
    fs.writeFile(this.path,null,function(err){
      if(err){
        returnCallback(JSON.stringify({
          path:this.path,
          status:"error",
          content:err
        }));
      }else{
        returnCallback(JSON.stringify({
          path:this.path,
          status:"ok"
        }));
      }
    });
  }
  delete(returnCallback){
    fs.unlink(this.path, function(err){
      if(err){
        returnCallback(JSON.stringify({
          path:this.path,
          status:"error",
          content:err
        }));
      }else{
        returnCallback(JSON.stringify({
          path:this.path,
          status:"ok"
        }));
      }
    });
  }
  details(returnCallback){
    var md5sum=crypto.createHash('md5');
    var s=fs.ReadStream(this.path);
    s.on('data',function(d){
      md5sum.update(d);
    });
    s.on('end',function(){
      var d=md5sum.digest('hex');
      returnCallback(Object.assign(
        fs.statSync(this.path),
        JSON.stringify({
          path:this.path,
          status:"exist",
          type:"file",
          md5:d
        })
      ));
    });
  }
}
