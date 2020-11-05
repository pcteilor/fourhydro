<?php
  
class fdrRevSliderList{

    protected $_list = null;

    function getList(){
        if( empty($this->_list) ){
            $this->loadList();
        }
        return $this->_list;
    }
    
    function addEmpty(){
        $this->_list[] = (object) array(
              'value' => '',
              'title' => ' - NO SLIDER CREATED -'
        );
    }
    
    function loadList(){
        $this->_list = array();

        global $wpdb;
        $SQL = 'SELECT `title`, `alias` FROM `'.$wpdb->prefix.'revslider_sliders`';
        if( $res = @mysql_query($SQL) ){
            while( $row = mysql_fetch_array( $res ) ) {
                $this->_list[] = (object) array(
                      'value' => $row['alias'],
                      'title' => $row['title']
                );
            }
            if( empty($this->_list) ){
                self::addEmpty();
            }
        }else{
            self::addEmpty();
        }
    }
}