<?php
/*
ROKITA 1.0.0
by Sarverott 2018
MIT Licence
*/
require_once("path-procesor.php");
class dir_procesor extends path_procesor{
  //public function __toString(){

  public function details(){
    //var_dump($this->path);
    if(!file_exists($this->path)) throw new Exception("dir_not_exist (".$this->path.")");
    if(!is_dir($this->path)) throw new Exception("path_to_nondir_object");
    $ttt=opendir($this->path);
    //var_dump($ttt);
		$directories=[];
		$files=[];
		$current=false;
		$up=false;
		while($file=readdir($ttt)){
      //var_dump($file);
			if($file==".."){
				$up=true;
			}elseif($file=="."){
				$current=true;
			}else{
				if(is_dir($this->path."\\".$file)){
					$directories[]=$file;
				}else{
					$files[]=$file;
				}
			}
		}
		closedir($ttt);
    /*extra_json_encode([
      "path"=>$this->path,
      "content"=>[
        "directories"=>$directories,
        "files"=>$files,
        "current"=>$current,
        "up"=>$up
      ]
    ]);*/
    return extra_json_encode([
      "path"=>$this->path,
      "content"=>[
        "directories"=>$directories,
        "files"=>$files,
        "current"=>$current,
        "up"=>$up
      ]
    ], 0, 2048);
  }
  public function create(){
    mkdir($this->path);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
  }
  public function delete(){
    rmdir($this->path);
    return json_encode([
      "path"=>$this->path,
      "status"=>"ok"
    ]);
  }
}

?>
