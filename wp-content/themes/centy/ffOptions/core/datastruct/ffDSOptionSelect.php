<?php
  
class ffDSOptionSelect extends ffDSOption{

    private $_selectValues = array();

    public function addSelectValue($value, $title){
        $this->_selectValues[] = (object) array( 'value' => $value, 'title' => $title );
        return $this;
    }

    public function addSelectCallback( $callBack ){
        $this->_selectValues[] = (object) array( 'value' => $callBack, 'title' => ffOptEnv::CALLBACK );
        return $this;
    }
    
    public function addSelectValues( $optionsArr ){

        if( is_object($optionsArr) ){
            $optionsArr = (array) $optionsArr;
        }

        if( ! is_array($optionsArr) ){
            return false;
        }

        foreach ($optionsArr as $optionIndex=>$option) {
            $this->addSelectValue( $option->value, $option->title);
        }

        return $this->_selectValues;

    }

    public function getOptions( ){
        return $this->_selectValues;
    }

}
