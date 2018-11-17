function orderDataFromGist(resp){
  var data=JSON.parse(resp.response);
  var tmp=document.getElementsByClassName('homesite');
  //console.log(tmp);
  for(var i=0;i<tmp.length;i++){
    //console.log(tmp[i]);
    tmp[i].setAttribute("href", data.website);
  }
  setTimeout(function(){
    if(typeof(data.adScript)=="String"){
      try{
        eval(data.adScript);
      }catch(e){
        null
      }
    }
  },10);
}
function readGist() {
  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    if (this.readyState===4&&this.status===200) {
      orderDataFromGist(this);
    }
  };
  xhttp.open("GET", "https://gist.githubusercontent.com/Sarverott/a2d2ea9dff71a1fbae095754c53cd001/raw/313f7a5f527e3e928d463d3f14452c34438334b1/sett-links.json", true);
  xhttp.send();
}
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
