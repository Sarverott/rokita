class system{
  constructor(appHook){
    this.app=appHook;
    this.addButtonListeners();
    var hook=this;
    makeRequest("index.php?api&command=system&action=system_details", "", function(output){
      //alert(output);
      var data=JSON.parse(output);
      hook.printServerInfo(data);
    });
    makeRequest("index.php?api&command=system&action=server_vars", "", function(output){
      //alert(output);
      var data=JSON.parse(output);
      hook.printServerVars(data);
    });
  }
  printServerVars(data){
    var table=document.createElement("table");
    for(var i in data){
      var tr=document.createElement("tr");
      var td1=document.createElement("td");
      var td2=document.createElement("td");
      td1.appendChild(document.createTextNode(i));
      td2.appendChild(document.createTextNode(data[i]));
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }
    document.getElementsByClassName("server-vars-data")[0].appendChild(table);
  }
  printServerInfo(data){
    var table=document.createElement("table");
    for(var i in data){
      var tr=document.createElement("tr");
      var td1=document.createElement("td");
      var td2=document.createElement("td");
      td1.appendChild(document.createTextNode(i));
      td2.appendChild(document.createTextNode(data[i]));
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }
    document.getElementsByClassName("system-info")[0].appendChild(table);
  }
  addButtonListeners(){
    for(var i=0;i<document.getElementsByClassName("system-cardlist-button").length;i++){
      document.getElementsByClassName("system-cardlist-button")[i].addEventListener("click",function(){
        changeScreen(this.getAttribute("cardname"));
      });
    }
    document.getElementsByClassName("exec-run")[0].addEventListener("click",function(){
      makeRequest("index.php?api&command=system&action=execute", "arguments0="+encodeURIComponent(document.getElementsByClassName("exec-input")[0].value), function(output){
        var div=document.createElement("div");
        div.appendChild(document.createTextNode(document.getElementsByClassName("exec-input")[0].value));
        document.getElementsByClassName("exec-output")[0].appendChild(div);
        var pre=document.createElement("pre");
        pre.appendChild(document.createTextNode(output));
        document.getElementsByClassName("exec-output")[0].appendChild(pre);
      });
    });
  }
  execute(){

  }
}
