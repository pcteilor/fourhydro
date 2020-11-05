<?php
  
class ffWidgetFactory{

    static $widgets = array();

    static function init(){

        if ($handle = opendir( ffOptEnv::getDir('widgets-fe') )) {
            while (false !== ($entry = readdir($handle))) {
                if ( substr($entry,0,8) != "ffWidget" ) {
                    continue;
                }
                if ( substr($entry,-4) != ".php" ) {
                    continue;
                }
                if( is_dir( ffOptEnv::getDir('widgets-fe').'/'.$entry ) ){
                    continue;
                }

                $entry = substr($entry,0,-4);

                ffWidgetFactory::add($entry);
            }
            closedir($handle);
        }
        
        add_action( 'widgets_init', array('ffWidgetFactory','widgetsInit') );
    }
    
    static function add($className){
        require_once ffOptEnv::getDir('widgets-fe').'/'.$className.'.php';
        ffWidgetFactory::$widgets[ $className ] = $className;
    }
    
    static function widgetsInit(){
        foreach (ffWidgetFactory::$widgets as $className) {
            register_widget( $className );
        }
    }
}