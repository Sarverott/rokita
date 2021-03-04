/*
ROKITA 2.0.0
by Sarverott 2018
MIT Licence
*/
const fs=require("fs"),
  path=require("path");

function loadInterfaceIncludes(dirpath){
  var includes=fs.readdirSync(dirpath);
  var output={};
  for(var i in includes){
    output[includes[i].split(".")[0]]=fs.readFileSync(
      path.join(dirpath,includes[i]),
      {encoding:"utf-8"}
    );
  }
  return output;
}
function concatMainFileAndIncludes(mainfileContent, includes, pre){
  for(var i in includes){
    var nameTag=pre.toUpperCase()+"-"+i.toUpperCase();
    mainfileContent=mainfileContent.replace(
      `<${nameTag}></${nameTag}>`,
      includes[i]
    );
    //console.log(  `<${nameTag}></${nameTag}>`)
  }
  return mainfileContent;
}
//console.log(loadInterfaceIncludes("./interface-includes"));
/*
console.log(concatMainFileAndIncludes(
  fs.readFileSync("./index.html", {encoding:"utf-8"}),
  loadInterfaceIncludes("./interface-includes"),
  "rokita"
))
*/
