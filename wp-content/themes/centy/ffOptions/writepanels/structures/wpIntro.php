<?php

class wpIntro {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpintro', 'Intro');
            
        	$a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Intro')
        		->addParam('enables', array('title', 'description'));
            $a->addOption(ffOptEnv::TEXT, 'title', 'Title', 'Details');
            $a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Check our most recent project');
            
		$a->endSection();

        return $a;

    }

}
