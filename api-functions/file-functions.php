<?php
require_once("path-procesor.php");
class file_procesor extends path_procesor{
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
    $f=fopen($this->path, "a+");
    fwrite($f, $content);
    fclose($f);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
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
