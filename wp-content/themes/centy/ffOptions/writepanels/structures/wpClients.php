<?php

class wpClients {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpclients', 'Clients');
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSection', 'Enable Section')
                ->addParam('enables', array('items', 'section_title') );
            
            
            $a->addOption(ffOptEnv::TEXT, 'section_title', 'Section Title');
                $a->startSection( 'items', 'Client %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
                	$a->addOption(ffOptEnv::IMAGE, 'image', 'Image');
                    $a->addOption(ffOptEnv::TEXT, 'url', 'Url');
                    
            			
                $a->endSection();
            
		$a->endSection();

        return $a;

    }

}
