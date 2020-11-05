<?php
  
class fdrCustomMenus{

    protected $_list = null;

    function getList(){
        if( empty($this->_list) ){
            $this->loadList();
        }
        return $this->_list;
    }
    
    function loadList(){
        $menus = wp_get_nav_menus( );
        $this->_list = array();

        foreach ($menus as $customMenu) {
            $this->_list[] = (object) array(
                  'value' => $customMenu->term_id,
                  'title' => $customMenu->name
            );
        }
    }
}