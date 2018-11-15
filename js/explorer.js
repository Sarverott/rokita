class xplorItem{
  constructor(path, type, explorerHook){
    this.explorer=explorerHook;
    this.filetype=type;
    this.path=path;
  }
  addListeners(itemElement, deleteButton, detailsButton=null, editButton=null){
    itemElement.addEventListener("dblclick",function(){

    });
    itemElement.addEventListener("click",function(){

    });
    deleteButton.addEventListener("click",function(){

    });
    if(detailsButton==null){
      detailsButton.addEventListener("click",function(){

      });
    }
    if(editButton==null){
      editButton.addEventListener("click",function(){

      });
    }
  }
  open(){
    switch(type){
      case "dir":
        explorerHook.gotoPath(this.path);
      break;
      case "file":
        explorerHook.openFile(this.path);
      break;
    }
  }
}
class explorer{
  constructor(){
    this.getBasePath();
    document.getElementsByClassName("explorer-button-go")[0].addEventListener("click",function(){
      this.gotoPath(document.getElementByClassName("explorer-path-field")[0].value);
    });

  }
  getBasePath(){
    var hook=this;
    makeRequest("index.php?api&command=system&action=base_path", "", function(output){
      var data=JSON.parse(output);
      hook.gotoPath(data.path);
    });
  }
  prepareData(data){
    var tmp={};
    tmp.areaItems=[];
    this.currentPath=data.path;
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
  setupView(){

  }
}
