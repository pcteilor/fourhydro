<?php
  
class ffData extends ffDSSection{

    function isStructure(){ return FALSE; }
    function isData(){      return TRUE; }

    function __construct( $secStruct = null, $data = null, $isRoot = true ){

        if( empty($secStruct) ) {
            return;
        }

        $secStruct = $secStruct->getSection();

        if( $isRoot ){
            $thisSectionID = $secStruct->getID();
            if( isSet( $data->$thisSectionID ) ){
                $data = $data->$thisSectionID;
            }
        }

        $this->title      = $secStruct->getTitle();
        $this->id         = $secStruct->getID();
        $this->type       = $secStruct->getType();
        $this->repeatable = $secStruct->typeRepeatable();
        $this->setParams(   $secStruct->getParams() );

        foreach ($secStruct->getChilds() as $index=>$component) {

            $childID = $component->getID();

            $dataForItem = isSet( $data->childs->$childID ) ?
                            $data->childs->$childID : null;

            //echo '#'.$childID;var_dump($data);

            if( ffOptEnv::SECTION == $component->getType() ) {
                if( $component->typeRepeatable() and $component->isStructure() ){
                    $this->createRepeatable($component, $dataForItem);
                }else{
                    $this->childs[$childID] = new ffData($component, $dataForItem, false);
                }
            }else{
                $this->childs[$childID] = ffDSOption::addData($component, $dataForItem, false);
            }
        }
    }
    
    protected function createRepeatable($component, $dataForItem){

        $wrapper = new ffData();

        $wrapper->title      = "";
        $wrapper->id         = $component->getID();
        $wrapper->type       = $component->getType();
        $wrapper->repeatable = TRUE;
        $wrapper->childs     = array();
        
        if( function_exists("is_admin") and is_admin() ){
            $wrapper->childs[0] = new ffData($component);
            $wrapper->childs[0]->repeatable = FALSE;
            $wrapper->childs[0]->id = 0;
        }

        $childsData = array();
        
        if( ffOptEnv::SP_SECTION == $component->typeRepeatable() ){
            foreach ($dataForItem->childs as $key=>$value) {
                $childsData[ 1*$key ] = $value;
            }
        }else if( empty($dataForItem) or empty($dataForItem->childs) ){
            $wrapper->childs[1] = new ffData($component);
            $wrapper->childs[1]->repeatable = FALSE;
            $wrapper->childs[1]->id = 1;
        }else{
            foreach ($dataForItem->childs as $key=>$value) {
                $childsData[ 1*$key ] = $value;
            }
        }

        ksort($childsData);

        $index = 0;
        if( ffOptEnv::SP_SECTION == $component->typeRepeatable() ){
            $index = -1;
        }
        foreach ($childsData as $sub_Data) {
            $index ++;
            $ch = new ffData($component, $sub_Data);
            $ch->repeatable = FALSE;
            $ch->id = $index;
            $sub_title = $ch->getTitle();
            $wrapper->childs[$index] = $ch;
        }
        
        $this->childs[ $wrapper->id ] = $wrapper;
    }
    
}