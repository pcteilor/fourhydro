<?php
  
class ffDBTO{

    const s_table_name = "ff_options";

    public static function getTableName(){
        global $wpdb;
        return $wpdb->prefix . self::s_table_name;
    }

    public function install(){
        $this->_runSQLfromFile( dirname(__FILE__).'/table.frs' );
        $this->_runSQLfromFile( dirname(__FILE__).'/values.frs' );
    }

    private function _runSQLfromFile( $file_path ){
        $content = file_get_contents($file_path);
        $content = $this->_replace($content);
        global $wpdb;
        if( ! $wpdb->query( $content ) ){
            echo "MySQL Error message:<br>";
            $wpdb->print_error();
            exit;
        }
    }

    private function _replace($content){
        $to_replace = array();
        $replace_with = array();

        $to_replace[]   = 'XXXTEMPLATEURLXXX';
        $replace_with[] = get_template_directory_uri();

        $to_replace[]   = 'XXXTABLENAMEXXX';
        $replace_with[] = ffDBTO::getTableName();

        $content = str_replace( $to_replace, $replace_with, $content);

        return $content;
    }
}