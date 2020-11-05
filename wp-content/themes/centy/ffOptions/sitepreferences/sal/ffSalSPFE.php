<?php

class ffSalSPFE extends ffSal{
    const sPref = 'tx';
    const sSuff = '.php';

    protected $tax_ID;
    protected $tax_name;
    protected $structure;

    protected $metas;
    protected $defaultSP;

    function __construct( $tax_name, $tax_ID = 0 ){
		if( empty($tax_name) ){ return; }
		$this->tax_ID = $tax_ID;
        $this->tax_name = $tax_name;
        $tax_name = str_replace('-category', '', $tax_name);
		$this->structure = ffStructureFactory::get( ffSalSPFE::sPref . $tax_name, ffSalSPFE::sPref )->getSection();
    }

    public function loadData(){
        $this->loadPostMetas( $this->tax_ID );
        
        $tree = new stdClass();
        $tree->childs = new stdClass();

        foreach ($this->metas as $key=>$value) {
            $this->addFromPost($tree->childs, $key, $value);
        }

        return new ffData($this->structure, $tree);
    }

    public function getData(){
        return $this->loadData();
    }
    
    public function loadPostMetas($tax_ID){
        global $wpdb;

        $this->metas = array();

        $SQL = "SELECT `meta_key`, `value`
                FROM `".ffDBSP::getTableName()."`
                WHERE `taxonomy` = '".$this->tax_name."' AND `term_id` = '".$tax_ID."'";

        $res = mysql_query( $SQL );
        if($res){
            while($row = mysql_fetch_array( $res )){
                $this->metas[ $row['meta_key'] ] = $row['value'];
            }
        }

        if( 0 != $tax_ID ){
            if( empty($this->metas) ){
                $this->loadPostMetas( 0 );
            }
        }else{
            if( empty($this->metas) ){
                if( 'home' == $this->tax_name or 'home' == $this->tax_name ){
                    // home is emty => install it
                    $db = new ffDBSP();
                    $db->install();
                    $this->loadPostMetas( 0 );
                }
            }
        }
    }
}