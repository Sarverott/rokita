<?php
/*
ROKITA 1.0.0
by Sarverott 2018
MIT Licence
*/
  //include "extra-functions.php";
  include "api-functions/directory-functions.php";
  include "api-functions/file-functions.php";
  include "api-functions/system-procesor.php";
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
