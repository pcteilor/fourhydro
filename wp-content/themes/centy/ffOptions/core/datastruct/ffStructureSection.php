<?php
  
class ffStructureSection extends ffDSSection{

    function isStructure(){ return TRUE; }
    function isData(){      return FALSE; }

    public function __construct($title, $id=0, $repeatable ){

        $this->title      = $title;
        $this->id         = $id;
        $this->repeatable = $repeatable;

    }

}
