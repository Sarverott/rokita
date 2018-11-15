function makeRequest(url, data, funct){
  //console.log(funct);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      funct(this.responseText);
    }
  };
  if(data!=""){
    xhttp.open("POST", url, true);

      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
  }else{
    xhttp.open("GET", url, true);
    xhttp.send();
  }
}
