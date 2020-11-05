<?php

class ffSalSP extends ffSal {

    const STRUCTURE_NAME = 'tx_all';

    public $data = null;
    public $structure= null;
    
    function __construct(){
        $this->structure = ffStructureFactory::get( ffSalSP::STRUCTURE_NAME )->getSection();
    }
    
    public function isCustomCheckerEnabled(){
        global $_GET;
        if( empty($_GET['page']) ){ return FALSE; }
        if( 'ff_sitepreferences' != $_GET['page'] ){ return FALSE; }
        global $_POST;
        if( empty($_POST["ffOptEnv-option-admin-structureName"]) ){ return FALSE; }
        if( 'tx_all' != $_POST["ffOptEnv-option-admin-structureName"] ){ return FALSE; }
        return TRUE;
    }

    public function setData( $data ){
        foreach ($data->getChilds() as $namespace=>$nsValues) {
            foreach ( $nsValues->getLikePOSTData() as $name=>$value) {
                ffSalSPDB::Set( $namespace, $name, $value );
            }
        }
        ffSalSPDB::SaveToDB();
    }

    public function loadData(){
        $tree = new stdClass();
        $tree->childs = new stdClass();
        foreach ($this->structure->getSection()->getChilds() as $nsValues) {
            $taxonomy = $nsValues->getID();
            $tree->childs->$taxonomy = new stdClass();
            $tree->childs->$taxonomy->childs = new stdClass();
            $zero = 0;
            $tree->childs->$taxonomy->childs->$zero = new stdClass();
            $tree->childs->$taxonomy->childs->$zero->childs = new stdClass();
            if( $nsValues->isSection() ){
                $nsPostLikeData = ffSalSPDB::loadSingle($taxonomy, 0);
                foreach ($nsPostLikeData as $key=>$value) {
                    $this->addFromPost($tree->childs->$taxonomy->childs->$zero->childs, $key, $value);
                }
            }
        }
        return new ffData($this->structure, $tree);
    }

    public function getData(){
        if( !empty($this->data) ){
            return $this->data;
        }
        return $this->data = $this->loadData();
    }
}