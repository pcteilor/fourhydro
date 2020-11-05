<?php
  
class ffSPAjaxSaverClass{

    function __construct(){
        global $_POST;
        
        $data = array();
        foreach($_POST as $key=>$value) {
            $key = explode(ffOptEnv::PATH_NAME_SEPARATOR, $key, 3);
            if( ! is_array($key) ) continue;
            if( count($key) != 3 ) continue;
            if( empty( $data[ $key[0] ] ) ) $data[ $key[0] ] = array();
            if( empty( $data[ $key[0] ][ $key[1] ] ) ) $data[ $key[0] ][ $key[1] ] = array();
            if( FALSE === strpos($key[2], ffOptEnv::PATH_NAME_SEPARATOR."0".ffOptEnv::PATH_NAME_SEPARATOR) ){
                $data[ $key[0] ][ $key[1] ][ $key[2] ] = $value;
            }
        }

        //echo "<pre>";print_r($data);echo "</pre>";

        $dbd = array();
        foreach($data as $taxonomy=>$tax_vals) {
            $dbd[ $taxonomy ] = array();
            foreach($tax_vals as $term_id=>$term_vals) {
                if( empty( $term_vals['__system_loaded'] ) ){
                    continue;
                }
                $org_term_id = $term_vals['__system_id'];
                $dbd[ $taxonomy ][ $org_term_id ] = array();
                foreach($term_vals as $meta_name=>$meta_value) {
                    if( 0 === strpos($meta_name, '__system_') ){
                        continue;
                    }
                    $dbd[ $taxonomy ][ $org_term_id ][ $meta_name ] = $meta_value;
                }
            }
        }

        //echo "<pre>";print_r($dbd);echo "</pre>";

        foreach($dbd as $taxonomy=>$tax_vals) {
            if( empty($tax_vals) ) continue;
            foreach($tax_vals as $term_id=>$term_vals) {
                ffSalSPDB::saveSingle($taxonomy, $term_id, $term_vals);
            }
        }

        //ffOptEnv::print_r($dbd);
    }
}