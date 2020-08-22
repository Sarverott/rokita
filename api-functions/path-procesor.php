<?php
/*
ROKITA 1.0.2
by Sarverott 2020
MIT Licence
*/
class Rokita_path_procesor{
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
