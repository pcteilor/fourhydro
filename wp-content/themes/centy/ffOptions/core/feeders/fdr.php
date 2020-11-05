<?php
  
class fdr{

    static $feeders = array();

    static function Get($feeder){

        $feeder = str_replace(" ","",$feeder);
        
        // is it loaded ?
        if( !empty( fdr::$feeders[ $feeder ] ) ){
            return fdr::$feeders[ $feeder ];
        }
        
        // does class of it exist?
        $class = 'fdr'.$feeder;
        if( class_exists($class) ){
            fdr::$feeders[ $feeder ] = new $class();
            return fdr::$feeders[ $feeder ];
        }

        $file = ffOptEnv::getDir('feeders').'/'.$class.'.php';

        if( ! file_exists( $file ) ){
            die( "File <b>$file</b> for feeder <b>$feeder</b> with class <b>$class</b> does not exist!" );
        }
        
        require_once $file;

        if( class_exists($class) ){
            fdr::$feeders[ $feeder ] = new $class();
            return fdr::$feeders[ $feeder ];
        }

        die( "File <b>$file</b> for feeder <b>$feeder</b> does not have class <b>$class</b>" );
    }

}