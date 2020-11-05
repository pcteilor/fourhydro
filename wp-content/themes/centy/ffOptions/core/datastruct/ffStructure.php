<?php

class ffStructure{

    private $_static_element_id_counter = 0;

    protected $section = null;
    
    protected $_constr_sec = array();
    protected $_constr_actualSec = null;

    public function getSection(){
        return $this->section;
    }
    
    public function insertSection($name, $repeatable = ffOptEnv::SINGLE_SECTION, $directory = "" ){
        $structure = ffStructureFactory::get($name,$directory);
        $section = $structure->getSection();

        $insertedSection = $this->startSection(
            strtolower( $section->getID() ),
            $section->getTitle(),
            $repeatable
        );
        
        foreach ($section->getChilds() as $child) {
            $this->_constr_actualSec->addChild($child);
        }
        
        $this->endSection();

        return $insertedSection;
    }
    
    public function startSection($id, $name, $repeatable = ffOptEnv::SINGLE_SECTION ){
        $id = strtolower($id);
        $newSection = new ffStructureSection($name, $id, $repeatable);
        
        if( empty($this->section) ){
            $this->section = $newSection;
        }else{
            $this->_constr_actualSec->addChild( $newSection );
        }

        $this->_constr_sec[] = $newSection;

        $this->_constr_actualSec = $newSection;
        
        return $newSection;
    }

    public function endSection(){
        if( empty( $this->_constr_sec ) ){
            echo "FATAL ERROR, ALL section ended, but method ffStructure::endSection() called.";
            exit;
        }

        array_pop( $this->_constr_sec );

        $this->_constr_actualSec = end($this->_constr_sec);
    }

    public function addElement($type, $title=""){
        $this->_static_element_id_counter ++;
        
        $id = ffOptEnv::STATIC_PREFIX . $this->_static_element_id_counter;
        
        return $this->addOption($type, $id, $title);
    }

    public function addOption($type, $id, $title="", $default="", $description="" ){
        $id = strtolower($id);
        $option = ffDSOption::addStructure( $type, $id, $title, $default, $description );
        
        $this->_constr_actualSec->addChild( $option );
        
        return $option;
    }

}

