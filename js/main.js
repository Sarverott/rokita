
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

class appController{
  constructor(){
    debugConsoleTitle("START APP",20);
    var controllerHook=this;
    document.addEventListener("DOMContentLoaded", function(){
      debugConsoleTitle("BEG INIT",15);
      controllerHook.createHeader();
      controllerHook.createExplorer();
      changeScreen("explorer");
      controllerHook.hideLoadingScreen();
      debugConsoleTitle("END INIT",15);
    });
  }
  createHeader(){
    debugConsoleTitle("CREATE HEADER",10);
    this.header=new header();
  }
  createExplorer(){
    debugConsoleTitle("CREATE EXPLORER",10);
    this.explorer=new explorer();
  }
  hideLoadingScreen(){
    setTimeout(function(){
      loadingScreen("hide");
    },1000);
  }
}

var appStruct=new appController();
