class newItemDialog{
  constructor(appHook){
    this.app=appHook;
    var hook=this;
    document.getElementsByClassName("ni-create")[0].addEventListener("click", function(){
      hook.create();
    });
  }
  setup(path, type){
    this.path=path;
    this.type=type;
    document.getElementsByClassName("ni-type")[0].innerHTML=this.type;
    document.getElementsByClassName("ni-input")[0].value=this.path;
    changeScreen("new-item");
  }
  create(){
    loadingScreen("show");
    var hook=this;
    switch(this.type){
      case "dir":
      makeRequest("index.php?api&command=directory&action=create", "arguments0="+encodeURIComponent(document.getElementsByClassName("ni-input")[0].value), function(output){
        //console.log(output);
        var data=JSON.parse(output);
        setTimeout(function(){
          changeScreen("explorer");
          hook.app.explorer.gotoPath(hook.path);
          loadingScreen("hide");
        },1000);
      });
      break;
      case "file":
      makeRequest("index.php?api&command=file&action=create", "arguments0="+encodeURIComponent(document.getElementsByClassName("ni-input")[0].value), function(output){
        //console.log(output);
        var data=JSON.parse(output);
        setTimeout(function(){
          changeScreen("explorer");
          hook.app.explorer.gotoPath(hook.path);
          loadingScreen("hide");
        },1000);
      });
      break;
    }
  }
}
