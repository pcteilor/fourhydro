<?php
  
class ffCustomTaxArgs{
    protected $l = array(
                      'hierarchical', 'show_ui', 'show_admin_column',
                      'update_count_callback', 'query_var', 'rewrite'
                    );

    protected $hierarchical          = false;
    protected $show_ui               = true;
    protected $show_admin_column     = true;
    protected $update_count_callback = '_update_post_term_count';
    protected $query_var             = true;
    protected $rewrite               = true;

    public function set_hierarchical($v){          $this->hierarchical = $v; return $this; }
    public function set_show_ui($v){               $this->show_ui = $v; return $this; }
    public function set_show_admin_column($v){     $this->show_admin_column = $v; return $this; }
    public function set_update_count_callback($v){ $this->update_count_callback = $v; return $this; }
    public function set_query_var($v){             $this->query_var = $v; return $this; }
    public function set_rewrite($v){               $this->rewrite = $v; return $this; }

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