class xplorItem{
  constructor(path, type, explorerHook){
    this.explorer=explorerHook;
    this.filetype=type;
    switch(type){
      case "dir":

      break;
      case "file":
        
      break;
    }
  }
}
class explorer{
  constructor(){
    this.getBasePath();
  }
  getBasePath(){
    var hook=this;
    makeRequest("index.php?api&command=system&action=base_path", "", function(output){
      //alert(output);
      var data=JSON.parse(output);
      hook.gotoPath(data.path);
    });
  }
  prepareData(data){
    var tmp={};
    tmp.areaItems=[];
    for(var i=0;i<data.content.directories.length;i++){

      tmp.areaItems.push(new xplorItem(data.content.directories[i],"dir",this));
    }
  }
  gotoPath(path){
    var explorerHook=this;
    makeRequest("index.php?api&command=directory&action=ls", "arguments0="+encodeURIComponent(path), function(output){
      //alert(output);
      var data=JSON.parse(output);
      explorerHook.prepareData(data);
      explorerHook.setupView();
    });
  }
  setupView(data){

  }
}
