/*
ROKITA 1.0.0
by Sarverott 2018
MIT Licence
*/

function loadingScreen(mode){
  switch (mode){
    case "show":
      document.getElementById("loading-screen").setAttribute("class", "active");
    break;
    case "hide":
      document.getElementById("loading-screen").setAttribute("class", "inactive");
    break;
  }
}
