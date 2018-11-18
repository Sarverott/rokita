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
?>
