/*
ROKITA 1.0.1
by Sarverott 2020
MIT Licence
*/
function changeScreen(name){
  //console.log(name);
  for(var i=0;i<document.getElementsByClassName("current-screen").length;i++){
    //console.log(document.getElementsByClassName("current-screen")[i].getAttribute("cardname"));
    if(document.getElementsByClassName("current-screen")[i].getAttribute("cardname")==name){
      document.getElementsByClassName("current-screen")[i].setAttribute("class", "current-screen active");
    }else{
      document.getElementsByClassName("current-screen")[i].setAttribute("class", "current-screen");
    }
  }
}
function debugConsoleTitle(content, fontSize){
  console.log("%c~~~ %c"+content+"%c ~~~", "font-size:"+fontSize+"px", "color:#f00;font-size:"+fontSize+"px", "color:#000;font-size:"+fontSize+"px");
}
function debugConsoleDescription(title,content){
  console.log("%c"+title+"\n%c"+content, "font-size:15px", "color:#888;font-size:5px");
}
/*
class hotkeyController{
  constructor(controller){
    this.app=controller;
    this.keyListeners={
      up:[],
      down:[]
    };
    var hook=this;
    window.onkeypress = function(e){
      console.log("#KEYPRESS#");
      for(var i in hook.keyListeners.down){
        hook.keyListeners.down[i](e.key);
      }
    };
    window.onkeyup = function(e){
      for(var i in hook.keyListeners.up){
        hook.keyListeners.up[i](e.key);
      }
    };
  }
  addListener(funct, event){
    this.keyListeners[event].push(funct);
  }
}
*/
class RokitaAppController{
  constructor(){
    this.multiselect=false;
    this.areaselect=false;
    debugConsoleTitle("START APP",20);
    var controllerHook=this;
    document.addEventListener("DOMContentLoaded", function(){
      debugConsoleTitle("BEG INIT",15);
      controllerHook.componentsLoad();
      //controllerHook.setupHotkeys();
      changeScreen("explorer");
      controllerHook.hideLoadingScreen();
      debugConsoleTitle("END INIT",15);
      makeRequest("LICENSE", "", function(data){
        debugConsoleDescription("LICENSE", data);
      });
    });
  }
  componentsLoad(){
    //this.createHotkeyControll();
    this.createHeader();
    this.createExplorer();
    this.createEditor();
    this.createNewItemDialog();
    this.createSystem();
    this.createUpload();
  }
  /*
  setupHotkeys(){
    var hook=this;
    this.hotkeyControll.addListener(function(key){
      switch(key){
        case "m":
          hook.multiselect=true;
        break;
        case "a":
          hook.areaselect=true;
        break;
      }
      console.log(hook.multiselect);
    },"down");
    this.hotkeyControll.addListener(function(key){
      switch(key){
        case "m":
          hook.multiselect=false;
        break;
        case "a":
          hook.areaselect=false;
        break;
      }
    },"up");
  }
  */
  /*
  createHotkeyControll(){
    debugConsoleTitle("CREATE HOTKEYS",10);
    this.hotkeyControll=new hotkeyController(this);
  }
  */
  createUpload(){
    debugConsoleTitle("CREATE UPLOAD",10);
    this.upload=new RokitaUploadFileDialog(this);
  }
  createSystem(){
    debugConsoleTitle("CREATE SYSTEM",10);
    this.system=new RokitaSystem(this);
  }
  createNewItemDialog(){
    debugConsoleTitle("CREATE NEW ITEM DIALOG",10);
    this.niDialog=new RokitaNewItemDialog(this);
  }
  createEditor(){
    debugConsoleTitle("CREATE EDITOR",10);
    this.editor=new RokitaFileEditor(this);
  }
  createHeader(){
    debugConsoleTitle("CREATE HEADER",10);
    this.header=new RokitaHeader(this);
  }
  createExplorer(){
    debugConsoleTitle("CREATE EXPLORER",10);
    this.explorer=new RokitaExplorer(this);
  }
  showLoadingScreen(){
    loadingScreen("show");
  }
  hideLoadingScreen(){
    setTimeout(function(){
      loadingScreen("hide");
    },1000);
  }
}
var appStruct=new RokitaAppController();
