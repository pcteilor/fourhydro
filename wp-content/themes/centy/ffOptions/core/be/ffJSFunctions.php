<?php
  
function get_PATH_NAME_SEPARATOR(){ return ffOptEnv::PATH_NAME_SEPARATOR; }
  
class ffJSFunctions{

	function __construct(){
        $this->addScripts();
	}

	static $functions = array(
        'get_template_directory_uri',
        'get_PATH_NAME_SEPARATOR',
    );

    function addScripts(){
        add_action( 'wp_head', array($this, 'printScripts'), 9 );
        add_action( 'admin_head', array($this, 'printScripts'), 1 );
    }
    
    function printSubScript($function){
        $func_ret = ( $function() );
        $func_ret = addslashes($func_ret);
        
        echo "<script>";
        echo "function $function(){";
        echo "return '$func_ret';";
        echo "}";
        echo "</script>\n";
    }

    function printScripts(){
        foreach (ffJSFunctions::$functions as $function) {
            $this->printSubScript($function);
        }
    }
}

