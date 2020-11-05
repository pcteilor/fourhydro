<?php
  
class ffSalOptionsDB{

    public static $_options = null;
    public static $_TOSAVE_options = null;

    public static function _install() {
        $db = new ffDBTO();
        $db->install();
    }

    public static function _load() {
        $sql = "SELECT * FROM ".ffDBTO::getTableName();
        $result = mysql_query( $sql );
        if($result == false) {
            self::_install();
            return;
        }
        while( $row = mysql_fetch_array( $result ) ) {
            $value = $row[ 'value' ];
            if( "O:" == substr($value, 0, 2) ){
                $value = unserialize($value);
            }
            self::$_options[ $row['namespace'] ][ $row['name'] ] = $value;
        }
    }
    
    public static function _init(){
        if( !empty( self::$_options ) ){
            return;
        }
        self::_load();
    }
    
    static function GetNamespace($namespace){
        self::_init();
        if( isSet( self::$_options[$namespace] ) ){
            return self::$_options[$namespace];
        }
        return array();
    }

    static function Get($namespace, $name, $default = null){

        self::_init();

        if( isSet( self::$_options[$namespace][$name] ) ){
            return self::$_options[$namespace][$name];
        }
        
        return $default;
    }
    
    static function deleteNamespace($namespace){
        self::_init();
        $sql = "DELETE FROM `".ffDBTO::getTableName()."` WHERE `namespace` = '$namespace'";
        mysql_query( $sql );
    }

    static function Set($namespace, $name, $value){
        self::_init();
        self::$_TOSAVE_options[ $namespace ][ $name ] = $value;
        self::$_options[ $namespace ][ $name ] = $value;
    }
    
    static function SaveToDB(){
        $reset_index = 0;
        $sql = "";

        foreach (self::$_TOSAVE_options as $namespace=>$ns) {
            self::deleteNamespace($namespace);
            foreach ($ns as $name=>$value) {
                if( !is_object($value ) ){
                    $value = addslashes( $value );
                }else{
                    $value = addslashes( serialize($value) );
                }
                
                $value_s = " ( '$namespace', '$name', '$value' ) ";
                if( ffSal::MAX_INSERTED_COLUMNS_COUNT == $reset_index ){
                    $sql = "INSERT IGNORE INTO `".ffDBTO::getTableName()."` ( `namespace`, `name`, `value` ) VALUES ".$sql.$value_s;
                    //echo "<pre>$sql</pre>";
                    mysql_query( $sql );
                    $sql = "";
                    $reset_index = 0;
                }else{
                    $sql = $sql . $value_s . " , \n";
                }
                $reset_index ++;
            }
        }
        
        $sql = "INSERT IGNORE INTO `".ffDBTO::getTableName()."` ( `namespace`, `name`, `value` ) VALUES ".$sql.$value_s;
        mysql_query( $sql );
    }
}