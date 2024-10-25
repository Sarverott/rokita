<?php
/*
ROKITA 1.0.2
by Sarverott 2018
MIT Licence
*/
  class sys_procesor{
    public function execute($command){
      //$out=[];
      //$ret=0;
      //exec($command, $out, $ret);
      //return implode("\n",$out);
      system($command);
    }
    public function evaluate($code){
      eval($code);
    }
    public function server_vars(){
      return json_encode($_SERVER);
    }
    public function system_details(){
      return json_encode([
        "uname"=>php_uname()
      ]);
    }
    public function base_path(){
      $tmp=$_SERVER['SCRIPT_FILENAME'];
      //$tmp=str_replace("/", "\\", $tmp);
      //var_dump($tmp);
      $tmp=substr($tmp, 0, strrpos($tmp, DIRECTORY_SEPARATOR));
      return json_encode([
        "path"=>$tmp
      ]);
    }
  }
?>
