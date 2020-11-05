<?php

class wpPreface {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wppreface', 'Preface');
        $a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show')
        		->addParam('enables', array('title', 'description'));
        	$a->addOption(ffOptEnv::TEXT, 'title', 'Title');
        	$a->addOption(ffOptEnv::TEXT, 'description', 'Description');
            
		$a->endSection();

        return $a;

    }

}
