class header{
  constructor(controller){
    this.app=controller;
    var headerButtonsHook;
    var headerHook=this;
    headerButtonsHook=document.getElementsByClassName("indoor-link");
    for(var i=0;i<headerButtonsHook.length;i++){
      headerButtonsHook[i].addEventListener("click", function(){
        headerHook.openInternalCard(this.getAttribute("cardname"));
      });
    }
    headerButtonsHook=document.getElementsByClassName("outdoor-link");
    for(var i=0;i<headerButtonsHook.length;i++){
      headerButtonsHook[i].addEventListener("click", function(){
        headerHook.openExternalLink(this.getAttribute("location"));
      });
    }
  }
  openExternalLink(href){
    window.open(href, "_blank");
  }
  openInternalCard(name){
    changeScreen(name);
  }
}
