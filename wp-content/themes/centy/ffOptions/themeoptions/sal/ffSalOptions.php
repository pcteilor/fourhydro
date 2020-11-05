<?php

class ffSalOptions extends ffSal {

    const STRUCTURE_NAME = 'to_Options';

    public $data = null;
    public $structure= null;
    
    function __construct(){
        $this->structure = ffStructureFactory::get( ffSalOptions::STRUCTURE_NAME )->getSection();
    }
    
    public function isCustomCheckerEnabled(){
        global $_GET;
        if( empty($_GET['page']) ){ return FALSE; }
        if( 'ff_options' != $_GET['page'] ){ return FALSE; }
        global $_POST;
        if( empty($_POST["ffOptEnv-option-admin-structureName"]) ){ return FALSE; }
        if( 'to_Options' != $_POST["ffOptEnv-option-admin-structureName"] ){ return FALSE; }
        return TRUE;
    }

    public function setData( $data ){
        foreach ($data->getChilds() as $namespace=>$nsValues) {
            foreach ( $nsValues->getLikePOSTData() as $name=>$value) {
                ffSalOptionsDB::Set( $namespace, $name, $value );
            }
        }
        ffSalOptionsDB::SaveToDB();
    }

    public function loadData(){
        $tree = new stdClass();
        $tree->childs = new stdClass();
        foreach ($this->structure->getSection()->getChilds() as $nsValues) {
            $namespace = $nsValues->getID();
            $tree->childs->$namespace = new stdClass();
            $tree->childs->$namespace->childs = new stdClass();
            if( $nsValues->isSection() ){
                $nsPostLikeData = ffSalOptionsDB::GetNamespace($namespace);
                foreach ($nsPostLikeData as $key=>$value) {
                    $this->addFromPost($tree->childs->$namespace->childs, $key, $value);
                }
            }
        }

        return new ffData($this->structure, $tree);
    }

    public function getData(){
        if( !empty($this->data) ){
            return $this->data;
        }

        if( $this->isPossibleToUpdateByPostData() ) {
            $this->setData( $this->getFromPost() );
        }

        return $this->data = $this->loadData();
    }
}