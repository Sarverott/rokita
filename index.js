const http=require("http"),
  fs=require("fs"),
  url=require("url"),
  path=require("path"),
  child_process=require("child_process");

class Rokita_server{
  constructor(){

  }
  static CREATE_THREAD(){
    
  }
  static RESOLVE_PATH(){

  }
  static RUN_SERVER(host, port){
    http.createServer(function(request, response){
      var input="";
      request.on('data',function(data){
        input+=data;
      });
      request.on('err',function(err){
        debugOutput(`worker ${process.pid} error- ${err}`);
      });
      request.on('end',function(){
        raportVisit("ok", input, request, nettHook);
        sendDoc(response, nettHook);
      });
    }).listen({
      port,
      host
    });
  }
}
class Rokita_file_manager{

}
