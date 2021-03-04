const os=require('os'),
  vm=require('vm'),
  util=require("util");

var sandbox={
  fs:require("fs"),
  vm,
  os,
  util,
  cluster:require("cluster"),
  crypto:require("crypto"),
  dns:require("dns"),
  net:require("net"),
  path:require("path"),
  url:require("url"),
  child_process:require("child_process"),
  dns:require("dns"),
  domain:require("domain")
};
vm.createContext(sandbox);
class Rokita_sys_procesor{
  constructor(){

  }
  execute(command, returnCallback){
    
  }
  evaluate(code, returnCallback){
    vm.runInContext(code, sandbox);
    returnCallback(JSON.stringify(util.inspect(sandbox)));
  }
  server_vars(returnCallback){
    returnCallback(JSON.stringify({}));
  }
  system_details(returnCallback){
    returnCallback(JSON.stringify({
      arch:os.arch(),
      cpus:os.cpus(),
      netInterfaces:os.networkInterfaces(),
      hostname:os.hostname(),
      homedir:os.homedir(),
    }));
  }
  base_path(){
    return JSON.stringify({path:__filename});
}
