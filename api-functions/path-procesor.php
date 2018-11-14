<?php
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
