<?php
/*
ROKITA 1.0.0
by Sarverott 2018
MIT Licence
*/
class path_procesor{
  public $path;
  public function __construct($path){
    if(!trim($path)) throw new Exception("path_empty");
    $this->path=$path;
  }
  public function __destruct(){
    //
  }
}
?>
