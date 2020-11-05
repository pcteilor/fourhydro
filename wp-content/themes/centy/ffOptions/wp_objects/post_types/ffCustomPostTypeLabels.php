<?php
  
class ffCustomPostTypeLabels{

    protected $l = array(
                      'name', 'singular_name', 'add_new', 'add_new_item',
                      'edit_item', 'new_item', 'all_items', 'view_item',
                      'search_items', 'not_found', 'not_found_in_trash',
                      'parent_item_colon', 'menu_name',
                    );

    protected $name = '%NAME%s';
    protected $singular_name = '%NAME%';
    protected $add_new = 'Add New';
    //protected $add_new_item = 'Add New %NAME%';
    protected $add_new_item = 'Add New Item';
    protected $edit_item = 'Edit %NAME%';
    protected $new_item = 'New %NAME%';
    //protected $all_items = 'All %NAME%s';
    protected $all_items = 'Items';
    protected $view_item = 'View %NAME%';
    protected $search_items = 'Search %NAME%s';
    protected $not_found = 'No %LOW-NAME%s found';
    protected $not_found_in_trash = 'No %LOW-NAME%s found in Trash';
    protected $parent_item_colon = '';
    protected $menu_name = '%NAME%s';
    
    function __construct( $name, $singular_name ){
        $this->name = $name;
        if( empty( $singular_name ) ){
            if( 's' == substr($name, -1) ){
                $this->singular_name = substr($name, 0, -1);
            }else{
                $this->singular_name = $name;
            }
        }else{
            $this->singular_name = $singular_name;
        }
        $this->generateLabels( $this->singular_name, $this->name );
    }

    protected function generateLabels($singular_name, $name){

        $low_name = strtolower($singular_name);
        $low_name_s = strtolower($name);

        foreach ($this->l as $key) {
            $this->$key = str_replace( "%NAME%s",     $name,          $this->$key);
            $this->$key = str_replace( "%NAME%",      $singular_name, $this->$key);
            $this->$key = str_replace( "%LOW-NAME%s", $low_name_s,    $this->$key);
            $this->$key = str_replace( "%LOW-NAME%",  $low_name,      $this->$key);
        }

    }
    
    public function getArray(){
        $ret = array();
        foreach ($this->l as $key) {
            $ret[ $key ] = $this->$key;
        }
        return $ret;
    }

}
  
?>