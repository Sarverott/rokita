class fileEditor{
  constructor(appHook){
    this.app=appHook;
    var hook=this;
    document.getElementsByClassName("edit-save")[0].addEventListener("click",function(){
      hook.save();
    });
  }
  open(name, path){
    this.path=path;
    this.name=name;
    var separator="";
    if(this.path.search("/")==-1){
      separator="\\";
    }else{
      separator="/";
    }
    document.getElementsByClassName("edit-filename")[0].innerHTML=this.name;
    changeScreen("edit");
    makeRequest("index.php?api&command=file&action=read", "arguments0="+encodeURIComponent(this.path+separator+this.name), function(output){
      var data=JSON.parse(output);
      document.getElementsByClassName("edit-content")[0].value=data.content;
      document.getElementsByClassName("edit-content")[0].setAttribute("rows", (data.content.match(/\n/g)||[]).length);
    });
    makeRequest("index.php?api&command=file&action=details", "arguments0="+encodeURIComponent(this.path+separator+this.name), function(output){
      while(document.getElementsByClassName("edit-filedetails")[0].hasChildNodes()) {
        document.getElementsByClassName("edit-filedetails")[0].removeChild(document.getElementsByClassName("edit-filedetails")[0].firstChild);
      }
      var data=JSON.parse(output);
      var table=document.createElement("table");
      for(var i in data){
        var row=document.createElement("tr");
        var cell1, cell2;
        cell1=document.createElement("td");
        cell1.appendChild(document.createTextNode(i));
        row.appendChild(cell1);
        cell2=document.createElement("td");
        cell2.appendChild(document.createTextNode(data[i]));
        row.appendChild(cell2);
        table.appendChild(row);
      }
      document.getElementsByClassName("edit-filedetails")[0].appendChild(table);
      //console.log(data);
    });
  }
  save(){
    var content=document.getElementsByClassName("edit-content")[0].value;
    this.app.showLoadingScreen();
    var appHook=this.app;
    var separator="";
    if(this.path.search("/")==-1){
      separator="\\";
    }else{
      separator="/";
    }
    makeRequest("index.php?api&command=file&action=write", "arguments0="+encodeURIComponent(this.path+separator+this.name)+"&arguments1="+content, function(output){
      appHook.hideLoadingScreen();
      changeScreen("explorer");
    });
  }
  close(){
    changeScreen("explorer");
  }
}
