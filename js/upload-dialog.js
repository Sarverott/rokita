/*
ROKITA 1.0.0
by Sarverott 2018
MIT Licence
*/
class uploadFileDialog{
  constructor(appHook){
    this.app=appHook;
    this.isUploading=false;
    var hook=this;
    document.getElementById("upload-form").addEventListener("submit", function(){
      loadingScreen("show");
      hook.isUploading=true;
      return true;
    });
    document.getElementById("upload-output").onload=function(){
      setTimeout(function(){
        if(hook.isUploading){
          hook.app.explorer.gotoPath(hook.path);
          changeScreen("explorer");
          loadingScreen("hide");
        }
      }, 1000);
    };
  }
  open(path){
    this.path=path;
    var separator="";
    if(this.path.search("/")==-1){
      separator="\\";
    }else{
      separator="/";
    }
    document.getElementById("upload-path").value=this.path+separator;
    changeScreen("upload");
  }
}
