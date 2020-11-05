<?php

class wpPageSettings {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wppagesettings', 'Page Settings');
            
        	$a->addOption(ffOptEnv::CHECKBOX, 'sidebar-show', 'Show Sidebar');
        	$a->addOption(ffOptEnv::CHECKBOX, 'comments-show', 'Show Comments');
            
		$a->endSection();

        return $a;

    }

}
