<?php

class wpSmallDescription {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpsmalldescription', 'Small Description');
            
            $a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Check our most recent project');
            
		$a->endSection();

        return $a;

    }

}