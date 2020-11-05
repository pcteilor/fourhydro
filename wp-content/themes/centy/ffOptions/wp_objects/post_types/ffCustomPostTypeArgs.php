<?php
  
class ffCustomPostTypeArgs{
    protected $l = array(
                      'description', 'protectedly_queryable', 'exclude_from_search',
                      'capability_type', 'capabilities', 'map_meta_cap', 'hierarchical',
                      'public', 'rewrite', 'has_archive', 'query_var',
                      'register_meta_box_cb', 'taxonomies', 'show_ui', 'menu_position',
                      'menu_icon', 'can_export', 'show_in_nav_menus', 'show_in_menu',
                      'show_in_admin_bar', 'delete_with_user',
                    );


    protected $description = '';
    protected $protectedly_queryable = true; //null;


    //http://codex.wordpress.org/Function_Reference/register_post_type
    protected $exclude_from_search = false; //null;
    
    
    protected $capability_type = 'post';
    protected $capabilities = array();
    protected $map_meta_cap = null;
    protected $hierarchical = false;
    protected $public =  true;
    protected $rewrite = true;
    protected $has_archive = false;
    protected $query_var = true;
    protected $register_meta_box_cb = null;
    protected $taxonomies = array();
    protected $show_ui = true; //null;
    protected $menu_position = 5; //null;
    protected $menu_icon = null;
    protected $can_export = true;
    protected $show_in_nav_menus = null;
    protected $show_in_menu = true; //null;
    protected $show_in_admin_bar = null;
    protected $delete_with_user = null;

    // Args prefixed with an underscore are reserved for internal use.
    // public $_builtin = false;
    // public $_edit_link = 'post.php?post=%d';

    public function set_description($v){         $this->description = $v; return $this; } //'';
    public function set_publicly_queryable($v){  $this->publicly_queryable = $v; return $this; } //null;
    public function set_exclude_from_search($v){ $this->exclude_from_search = $v; return $this; } //null;
    public function set_capability_type($v){     $this->capability_type = $v; return $this; } //'post';
    public function set_capabilities($v){        $this->capabilities = $v; return $this; } //array();
    public function set_map_meta_cap($v){        $this->map_meta_cap = $v; return $this; } //null;
    public function set_hierarchical($v){        $this->hierarchical = $v; return $this; } //false;
    public function set_public($v){              $this->public = $v; return $this; } //false;
    public function set_rewrite($v){             $this->rewrite = $v; return $this; } //true;
    public function set_has_archive($v){         $this->has_archive = $v; return $this; } //false;
    public function set_query_var($v){           $this->query_var = $v; return $this; } //true;
    public function set_register_meta_box_cb($v){$this->register_meta_box_cb = $v; return $this; } //null;
    public function set_taxonomies($v){          $this->taxonomies = $v; return $this; } //array();
    public function set_show_ui($v){             $this->show_ui = $v; return $this; } //null;
    public function set_menu_position($v){       $this->menu_position = $v; return $this; } //null;
    public function set_menu_icon($v){           $this->menu_icon = $v; return $this; } //null;
    public function set_can_export($v){          $this->can_export = $v; return $this; } //true;
    public function set_show_in_nav_menus($v){   $this->show_in_nav_menus = $v; return $this; } //null;
    public function set_show_in_menu($v){        $this->show_in_menu = $v; return $this; } //null;
    public function set_show_in_admin_bar($v){   $this->show_in_admin_bar = $v; return $this; } //null;
    public function set_delete_with_user($v){    $this->delete_with_user = $v; return $this; } //null;

    function __construct(){

    }
    
    function getArray(){
        $ret = array();
        foreach ($this->l as $key) {
            $ret[ $key ] = $this->$key;
        }
        return $ret;
    }
}
  
?>