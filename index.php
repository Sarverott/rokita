<?php 
	function show_dir_content($path){
		$ttt=opendir($path);
		//var_dump($ttt);
		$directories=[];
		$files=[];
		$current=false;
		$up=false;
		while($file=readdir($ttt)){
			if($file==".."||$file=="."){
				
			}else{
				if(is_dir($path."\\".$file)){
					$directories[]=$file;
				}else{
					$files[]=$file;
				}
			}
		}
		return [
			'directories'=>$directories,
			'files'=>$files
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
			case "":
				
			break;
			case "":
			
			break;
		}
	}
?>
skrypt usuwanie dodawanie pliku katalogu 
upload
grzegorz.sladowski@sltzn.katowice.pl