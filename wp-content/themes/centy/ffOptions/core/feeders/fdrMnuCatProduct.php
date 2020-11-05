<?php
  
class fdrMnuCatProduct{

    protected $_list = null;

    function getList(){
        if( empty($this->_list) ){
            $this->loadList();
        }
        return $this->_list;
    }
    
    function loadList(){
        $this->_list = array();
        $args = array( 'hide_empty' => false, 'hierarchical' => true );
        $pads = array( 0=>0 );
        $categories = get_terms( 'product-category', $args );

        $this->_list[] = (object) array( 'value' => 0, 'title' => "Default Settings" , );

        foreach ($categories as $category) {
            $act_pads = $pads[ $category->parent ] +1;

            $this->_list[] = (object) array(
                  'value' => $category->term_id,
                  'title' => str_repeat(ffOptEnv::SELECT_DEEP_SEPARATOR, $act_pads-1) . $category->name ,
            );
            $pads[ $category->term_id ] = $act_pads;
        }
    }
}