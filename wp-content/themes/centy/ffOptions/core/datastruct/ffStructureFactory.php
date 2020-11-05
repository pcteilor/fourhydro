<?php
class ffStructureFactory{

    static $structures = array();

    static function get( $className ){
    
        if( !empty(ffStructureFactory::$structures[ $className ]) ){
            return ffStructureFactory::$structures[ $className ];
        }

        $structure_directory = ffOptEnv::getDir(substr($className, 0, 2));

        $file_with_class = $structure_directory . '/' . $className . '.php';
        
        file_exists( $file_with_class ) or die('
              ffStructureFactory: FALAL ERROR - COMPONENT <b>"'.$className.'"</b>:<br /><br />
              FILE (THIS ALL IS CASE-SENSITIVE) <b>"'.$className.'.php"</b> NOT FOUND IN <b>'.$structure_directory.'</b> directory<br />');

        require_once $file_with_class;

        class_exists($className) or die('
              ffStructureFactory: FALAL ERROR - COMPONENT <b>"'.$className.'"</b>:<br /><br />
              FILE (THIS ALL IS CASE-SENSITIVE) <b>"'.$file_with_class.'"</b> DOES NOT CONTAIN CLASS <b>"'.$className.'"</b> ! ');

        if( empty( ffStructureFactory::$structures[ $className ] ) ){
            //ffStructureFactory::$structures[ $className ] = $className::createStructure();
            ffStructureFactory::$structures[ $className ] = call_user_func($className .'::createStructure');
        }

        return ffStructureFactory::$structures[ $className ];
    }
}
