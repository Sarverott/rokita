<?php
/*
ROKITA 1.0.2
by Sarverott 2020
MIT Licence
*/
require_once("path-procesor.php");
class Rokita_file_procesor extends Rokita_path_procesor{
  public function read(){
    if(!file_exists($this->path)) throw "file_not_exist";
    if(!is_file($this->path)) throw "path_to_nonfile_object";
    return json_encode([
      "path"=>$this->path,
      "content"=>implode(
        file($this->path),
        ""
      )
    ]);
  }
  public function write($content){
    $f=fopen($this->path, "w");
    fwrite($f, $content);
    fclose($f);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
  }
  public function append($content){
    $f=fopen($this->path, "a+");
    fwrite($f, $content);
    fclose($f);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
  }
  public function upload($file){
    if(move_uploaded_file(
      $file["tmp_name"],$this->path.basename($file["name"])
    )){
      return json_encode([
        "path"=>$this->path,
        "status"=>"ok"
      ]);
    }else{
      return json_encode([
        "path"=>$this->path,
        "status"=>"error"
      ]);
    }
  }
  public function create(){
    touch($this->path);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
  }
  public function delete(){
    unlink($this->path);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
  }
  //public function __toString(){
  public function details(){
    return json_encode([
      "path"=>$this->path,
      "status"=>"exist",
      "type"=>"file",
      "filesize"=>filesize($this->path),
      "mime"=>mime_content_type($this->path),
      "md5"=>md5_file($this->path),
      "modifyed"=>filemtime($this->path)
    ]);
  }
}

?>
