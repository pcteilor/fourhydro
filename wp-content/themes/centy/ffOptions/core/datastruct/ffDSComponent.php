<?php
  
abstract class ffDSComponent{

    protected $id;
    protected $title;
    protected $type;

    private $params = array();

    function getID(){     return $this->id; }
    function getTitle(){  return $this->title; }
    function getType(){   return $this->type; }
    function isSection(){ return FALSE; }

    protected function setType($type){ $this->type = $type; }

    function hasChilds(){ return false; }

    function getParam($paramId){
        return  ( !empty( $this->params[ $paramId ] ) ) ?
                $this->params[ $paramId ] :
                FALSE;
    }

    function getParams( $returnAsObject = false ){
        return  $returnAsObject ?
                ( (object) $this->params ) :
                $this->params;
    }

    public function addParam( $paramId, $paramValue ){
        $this->params[ $paramId ] = $paramValue;
        return $this;
    }

    public function setParam( $paramId, $paramValue ){
        $this->addParam( $paramId, $paramValue );
        return $this;
    }


    public function addParams( $paramArr ){
        if( is_object($paramArr) ){
            $paramArr = (array) $paramArr;
        }
        
        if( ! is_array($paramArr) ){
            return false;
        }

        foreach ($paramArr as $paramId=>$paramValue) {
            $this->params[ $paramId ] = $paramValue;
        }

        return $this;
    }

    public function setParams( $paramArr ){
        $this->addParams( $paramArr );
        return $this;
    }

    public function getPureData(){
        $ret = new stdClass();
        if( $this->hasChilds() ){
            $ret->childs = new stdClass();
            foreach ( $this->getChilds() as $key=>$child) {
                $index = $child->getID();
                if( !empty($index)){
                    $ret->childs->$index = $child->getPureData();
                }
            }
        }else{
            $ret->value = $this->getValue();
        }
        return $ret;
    }


    private static $likePOSTData;
    public function getLikePOSTData($prefix="", $clearBefore = true){
        if( empty($prefix) ){
            ffDSComponent::$likePOSTData = array();
        }
        if( $this->hasChilds() ){
            foreach ( $this->getChilds() as $key=>$child) {
                $index = $child->getID();
                if( !empty($index)){
                    if( FALSE !== strpos($index, ffOptEnv::STATIC_PREFIX) ){
                        continue;
                    }
                    if( !empty($prefix) ){
                        $index = $prefix.ffOptEnv::PATH_NAME_SEPARATOR.$index;
                    }
                    $child->getLikePOSTData( $index, false );
                }
            }
        }else{
            ffDSComponent::$likePOSTData[ $prefix ] = $this->getValue();
        }
        return ffDSComponent::$likePOSTData;
    }
}

