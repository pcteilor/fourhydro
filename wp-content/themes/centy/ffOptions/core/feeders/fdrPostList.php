<?php
  
class fdrPostList{

    protected $_list = null;

    function getList(){
        if( empty($this->_list) ){
            $this->loadList();
        }
        return $this->_list;
    }
    
    function loadList(){
        $this->_list = array();
        $pages = get_posts(array('posts_per_page'=>-1));
        foreach ($pages as $page) {
            $this->_list[] = (object) array(
                  'value' => $page->ID,
                  'title' => $page->post_title
            );
        }
    }
}