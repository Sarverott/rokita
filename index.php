<?php 
	function json_output($content){
		header("Content-type: aplication/json");
		echo json_encode($content);
		die();
	}
	function create_file($path){
		return [
			"path"=>$path,
			"status"=>touch($path)
		];
	}
	function delete_file($path){
		return [
			"path"=>$path,
			"status"=>unlink($path)
		];
	}
	function create_dir($path){
		return [
			"path"=>$path,
			"status"=>mkdir($path)
		];
	}
	function delete_dir($path){
		return [
			"path"=>$path,
			"status"=>rmdir($path)
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
	function sys_details(){
		return [
			"SERVER"=>$_SERVER,
			"SYSTEMNAME"=>php_uname()
		];
	}
	if(isset($_GET['mode'])){
		switch($_GET['mode']){
			case "explorer":
				include "show-dir-content.php";
			break;
			case "file-details":
				include "file-details.php";
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
				echo json_encode(set_file($_GET['path'],$_GET['content']));
				die();
			break;
			case "delete-file":
				header("Content-type: aplication/json");
				echo json_encode(delete_file($_GET['path']));
				die();
			break;
			case "create-file":
				header("Content-type: aplication/json");
				echo json_encode(create_file($_GET['path']));
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
<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<style>
			
		</style>
		<script>
			
		</script>
	</head>
	<body>
		<header>
			<h1>Xp-lor-php</h1>
		</header>
		<main>
			<section id="explorer">
				<div>
				</div>
				<div>
				</div>
			</section>
			<section>
				
			</section>
		</main>
		<footer>
		
		</footer>
	</body>
</html>
skrypt usuwanie dodawanie pliku katalogu 
upload
grzegorz.sladowski@sltzn.katowice.pl