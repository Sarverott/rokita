class xplorItem{
  constructor(path, type, explorerHook){
    this.explorer=explorerHook;
    this.filetype=type;
    this.path=path;
    this.elements=null;
  }
  addListeners(itemContainer, itemElement, deleteButton, detailsButton=null, editButton=null){
    var hook=this;
    this.elements={
      itemContainer:itemContainer,
      itemElement:itemElement,
      deleteButton:deleteButton
    }
    itemElement.addEventListener("dblclick",function(){
      hook.open();
    });
    itemElement.addEventListener("click",function(){
      hook.explorer.selectItem(hook);
    });
    deleteButton.addEventListener("click",function(){
      hook.delete();
    });
    if(detailsButton!=null){
      detailsButton.addEventListener("click",function(){
        hook.getDetails();
      });
    }
    if(editButton!=null){
      editButton.addEventListener("click",function(){
        hook.edit();
      });
    }
  }
  delete(){
    switch(this.filetype){
      case "dir":
        this.explorer.deleteDir(this.path);
      break;
      case "file":
        this.explorer.deleteFile(this.path);
      break;
    }
  }
  open(){
    switch(this.filetype){
      case "dir":
        this.explorer.openDir(this.path);
      break;
      case "file":
        this.explorer.openFile(this.path);
      break;
    }
  }
}
class explorer{
  constructor(controller){
    this.app=controller;
    this.selected=[];
    this.getBasePath();
    var hook=this;
    document.getElementsByClassName("explorer-button-go")[0].addEventListener("click",function(){
      hook.gotoPath(document.getElementsByClassName("explorer-path-field")[0].value);
    });
    var explorerBurttons=document.getElementsByClassName('explorer-button');
    for(var i=0;i<explorerBurttons.length;i++){
      explorerBurttons[i].addEventListener("click",function(){
        hook.setFunctionalButton(this.getAttribute("role"));
      });
    }
  }
  setFunctionalButton(role){
    switch(role){
      case "up":
        var separator="";
        if(this.currentPath.search("/")==-1){
          separator="\\";
        }else{
          separator="/";
        }
        var tmp=this.currentPath;
        tmp=tmp.substr(0,tmp.lastIndexOf(separator));
        this.gotoPath(tmp);
      break;
      case "refresh":

      break;
      case "new-file":

      break;
      case "new-dir":

      break;
    }
  }
  getBasePath(){
    var hook=this;
    makeRequest("index.php?api&command=system&action=base_path", "", function(output){
      //console.log(output);
      var data=JSON.parse(output);
      hook.gotoPath(data.path);
    });
  }
  openDir(filename){
    var separator="";
    if(this.currentPath.search("/")==-1){
      separator="\\";
    }else{
      separator="/";
    }
    this.gotoPath(this.currentPath+separator+filename);
  }
  prepareData(data){
    var tmp={};
    tmp.items=[];
    this.currentPath=data.path;
    for(var i=0;i<data.content.directories.length;i++){
      tmp.items.push(new xplorItem(data.content.directories[i],"dir",this));
    }
    for(var i=0;i<data.content.files.length;i++){
      tmp.items.push(new xplorItem(data.content.files[i],"file",this));
    }
    tmp.currentDir=data.content.current;
    tmp.parrentDir=data.content.up;
    this.workArea=tmp;
  }
  gotoPath(path){
    document.getElementsByClassName("explorer-path-field")[0].value=path;
    var explorerHook=this;
    makeRequest("index.php?api&command=directory&action=ls", "arguments0="+encodeURIComponent(path), function(output){
      //alert(output);
      var data=JSON.parse(output);
      explorerHook.prepareData(data);
      explorerHook.setupView();
    });
  }
  selectItem(hook){
    console.log("select");
    if(!this.app.multiselect){
      this.selected=[];
    }
    this.selected.push(hook);
    this.markSelected();
  }
  markSelected(){
    for(var i in this.workArea.items){
      this.workArea.items[i].elements.itemContainer.setAttribute("class", "explorer-item");
    }
    for(var i in this.selected){
      this.selected[i].elements.itemContainer.setAttribute("class", "explorer-item explorer-item-selected");
    }
  }
  setupView(){
    while(document.getElementsByClassName("explorer-view")[0].hasChildNodes()) {
      document.getElementsByClassName("explorer-view")[0].removeChild(document.getElementsByClassName("explorer-view")[0].firstChild);
    }
    var table=document.createElement("table");
    table.setAttribute("class", "explorer-viewer");
    for(var i in this.workArea.items){
      var row=document.createElement("tr");
      var item=document.createElement("span");
      var deleteButton=document.createElement("button");
      var cells=[
        document.createElement("td"),
        document.createElement("td")
      ];
      deleteButton.setAttribute("class", "explorer-item-delete");
      row.setAttribute("class", "explorer-item");
      item.appendChild(document.createTextNode(this.workArea.items[i].path));
      deleteButton.appendChild(document.createTextNode("DELETE"));
      this.workArea.items[i].addListeners(
        row,
        cells[0],
        deleteButton
      );
      cells[0].appendChild(item);
      cells[1].appendChild(deleteButton);
      row.appendChild(cells[0]);
      row.appendChild(cells[1]);
      table.appendChild(row);
      if(this.workArea.items[i].filetype=="file"){
        item.setAttribute("class", "explorer-item-button");
      }else{
        item.setAttribute("class", "explorer-item-button dir");
        var dirDesc=document.createElement("span");
        dirDesc.appendChild(document.createTextNode(" (DIR)"));
        dirDesc.setAttribute("class", "explorer-desc");
        cells[0].appendChild(dirDesc);
      }
    }
    document.getElementsByClassName("explorer-view")[0].appendChild(table);
  }
}
