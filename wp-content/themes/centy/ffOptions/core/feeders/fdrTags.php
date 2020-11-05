<?php
  
class fdrTags{

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
        $tags = get_tags( $args );
        foreach ($tags as $tag) {
            $this->_list[] = (object) array(
                  'value' => $tag->term_id,
                  'title' => $tag->name.' ('.$tag->category_count.')'
            );
        }
    }
}