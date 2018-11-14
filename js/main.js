var appStruct={};
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

document.addEventListener("DOMContentLoaded", function(){
  //console.log("dsads");
  appStruct.header=new header();
  appStruct.explorer=new explorer();
  setTimeout(function(){
    loadingScreen("hide");
  },1000);
});
