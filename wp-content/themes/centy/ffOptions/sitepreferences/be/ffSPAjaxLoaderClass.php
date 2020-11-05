<?php
  
class ffSPAjaxLoaderClass{

    public $taxonomy;
    public $id;
    public $dom_id;

    function __construct(){
        global $_GET;

        if( empty($_GET) ) return;

        if( !isSet($_GET['taxonomy']) ) return;
        $this->taxonomy = $_GET['taxonomy'];

        if( !isSet($_GET['id']) ) return;
        $this->id = $_GET['id'];

        if( !isSet($_GET['dom_id']) ) return;
        $this->dom_id = $_GET['dom_id'];

        $data = ffSalSPDB::loadSingle($this->taxonomy, $this->id);

        echo "<script>__ff_global_site_preferences_loaded['$this->taxonomy'][$this->id]='$this->dom_id';</script>";

        $__system_id = $this->dom_id . ffOptEnv::PATH_NAME_SEPARATOR . '__system_id';
        echo "<script>jQuery('#$__system_id').val('$this->id');</script>\n";

        $__loaded = $this->dom_id . ffOptEnv::PATH_NAME_SEPARATOR . '__system_loaded';
        echo "<script>jQuery('#$__loaded').val(1);</script>\n";

        if( !empty($data) ){
            foreach ($data as $key=>$value) {
                $dom_key = $this->dom_id . ffOptEnv::PATH_NAME_SEPARATOR . $key;
                $value = addslashes( $value );
                echo "<script>jQuery('#$dom_key').val('$value');</script>\n";
            }
        }
    }
}