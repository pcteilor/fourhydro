<?php

class ffWidgetLoader{

    static public function load($sName, $structure, $instance){

        $sName = strtolower($sName);

        $tree = new stdClass();
        $tree->$sName = new stdClass();
        $tree->$sName->childs = new stdClass();

        foreach ($instance as $key=>$value) {
            ffWidgetLoader::add($tree->$sName->childs, $key, $value);
        }

        return new ffData($structure, $tree);
    }
    
    static function add( &$parent, $keyS, $value ){
        $keyS = explode( ffOptEnv::PATH_NAME_SEPARATOR, $keyS, 2 );
        
        if( empty($keyS[0]) ){
            return;
        }

        $key0 = $keyS[0];
        
        if( !isSet($parent->$key0) ){
            $parent->$key0 = new stdClass();
            if( 2 == count($keyS) ){
                $parent->$key0->childs = new stdClass();
            }
        }

        if( 2 == count($keyS) ){
            ffWidgetLoader::add( $parent->$key0->childs, $keyS[1], $value );
        }else{
            $parent->$key0->value = $value;
        }
    }
}
