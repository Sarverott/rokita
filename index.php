<?php 
	function create_file($path){
		return [
			"path"=>$path,
			"lines"=>file($path)
		];
	}
	function delete_file($path){
		return [
			"path"=>$path,
			"lines"=>file($path)
		];
	}
	function create_dir($path){
		return [
			"path"=>$path,
			"lines"=>file($path)
		];
	}
	function delete_dir($path){
		return [
			"path"=>$path,
			"lines"=>file($path)
		];
	}
	function get_file($path){
		return [
			"path"=>$path,
			"lines"=>file($path)
		];
	}
	function set_file($path, $content){
		$before=filesize($path);
		$f=fopen($path,"w");
		fwrite($f,$content);
		fclose($f);
		$after=filesize($path);
		return [
			"size"=>[
				"original"=>$before,
				"new"=>$after
			],
			"path"=>$path
		];
	}
	function show_dir_content($path){
		$ttt=opendir($path);
		//var_dump($ttt);
		$directories=[];
		$files=[];
		$current=false;
		$up=false;
		while($file=readdir($ttt)){
			if($file==".."){
				$up=true;
			}elseif($file=="."){
				$current=true;
			}else{
				if(is_dir($path."\\".$file)){
					$directories[]=$file;
				}else{
					$files[]=$file;
				}
			}
		}
		return [
			'current'=>$current,
			'parrent'=>$up,
			'directories'=>$directories,
			'files'=>$files
		];
	}
	function file_details($path){
		$out=[];
		if(file_exists($path)){
			if(is_file($path)){
				$out=[
					"path"=>$path,
					"status"=>"exist",
					"type"=>"file",
					"filesize"=>filesize($path),
					"mime"=>mime_content_type($path),
					"md5"=>md5_file($path),
					"modifyed"=>filemtime($path)
				];
			}elseif(is_dir($path)){
				$out=[
					"path"=>$path,
					"status"=>"exist",
					"type"=>"dir",
					"filesize"=>filesize($path)
				];
			}
		}else{
			$out=[
				"path"=>$path,
				"status"=>"not_exist"
			];
		}
		return $out;
	}
	function sys_details(){
		return [
			"SERVER"=>$_SERVER,
			"SYSTEMNAME"=>php_uname()
		];
	}
	if(isset($_GET['mode'])){
		switch($_GET['mode']){
			case "explorer":
				if(isset($_GET['path'])){
					header("Content-type: aplication/json");
					echo json_encode(show_dir_content($_GET['path']));
					die();
				}
			break;
			case "file-details":
				if(isset($_GET['path'])){
					header("Content-type: aplication/json");
					echo json_encode(file_details($_GET['path']));
					die();
				}
			break;
			case "system-details":
				header("Content-type: aplication/json");
				echo json_encode(sys_details($_GET['path']));
				die();
			break;
			case "read-file":
				header("Content-type: aplication/json");
				echo json_encode(get_file($_GET['path']));
				die();
			break;
			case "write-file":
				header("Content-type: aplication/json");
				echo json_encode(set_file($_GET['path'], $_GET['content']));
				die();
			break;
			case "delete-file":
				header("Content-type: aplication/json");
				echo json_encode(delete_file($_GET['path']));
				die();
			break;
			case "create-file":
				header("Content-type: aplication/json");
				echo json_encode(delete_file($_GET['path']));
				die();
			break;
			case "delete-dir":
				header("Content-type: aplication/json");
				echo json_encode(delete_dir($_GET['path']));
				die();
			break;
			case "create-dir":
				header("Content-type: aplication/json");
				echo json_encode(create_dir($_GET['path']));
				die();
			break;
		}
	}
?>

skrypt usuwanie dodawanie pliku katalogu 
upload
grzegorz.sladowski@sltzn.katowice.pl