<?php
  
class fdrCategories{

    protected $_list = null;

    function getList(){
        if( empty($this->_list) ){
            $this->loadList();
        }
        return $this->_list;
    }
    
    function loadList(){
        $this->_list = array();
        $args = array( 'hide_empty' => false );
        $pads = array( 0=>'' );
        $categories = get_categories( $args );
        foreach ($categories as $category) {
            if( 0 != $category->category_parent ){
                $act_pads = $pads[ $category->category_parent ] . ' &nbsp; ';
            }else{
                $act_pads = '';
            }

            $this->_list[] = (object) array(
                  'value' => $category->term_id,
                  'title' => $act_pads . $category->name,
            );
            $pads[ $category->term_id ] = $act_pads;
        }
    }
}