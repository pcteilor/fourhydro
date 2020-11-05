<?php
  
class ffSalSPDB{
    private static function _sp_query($sql, $this_run_again = false){
        $result = mysql_query( $sql );
        if( !$result ){
            if($this_run_again){
                global $wpdb;
                $wpdb->print_error();
                die();
            }
            $db = new ffDBSP();
            $db->install();
            return self::_sp_query($sql, true);
        }
        return $result;
    }

    public static function loadSingle($taxonomy, $id =0) {
        $sql = "SELECT * FROM ".ffDBSP::getTableName()." WHERE `taxonomy` = '$taxonomy' AND `term_id` = $id";
        $result = ffSalSPDB::_sp_query($sql);

        $ret = array();
        while( $row = mysql_fetch_array( $result ) ) {
            $value = $row[ 'value' ];
            if( "O:" == substr($value, 0, 2) ){
                $value = unserialize($value);
            }
            $ret[ $row['meta_key'] ] = $value;
        }
        if( 0 == $id){
            $ret[ '__system_loaded' ] = 1;
        }
        return $ret;
    }

    public static function saveSingle($taxonomy, $id, $data) {
        $sql = "DELETE FROM ".ffDBSP::getTableName()." WHERE `taxonomy` = '$taxonomy' AND `term_id` = $id";
        $result = ffSalSPDB::_sp_query($sql);

        foreach ($data as $meta_name=>$meta_value) {
            $sql = "INSERT INTO `".ffDBSP::getTableName()."` (`taxonomy`, `term_id`, `meta_key`, `value`) VALUES
                    ('$taxonomy', $id, '$meta_name', '$meta_value');";
            $result = ffSalSPDB::_sp_query($sql);
        }
    }
}