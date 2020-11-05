<?php

class wpTeam {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpteam', 'Team');
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSection', 'Enable Section')
                ->addParam('enables', array('items', 'section_title') );
            
            $a->addOption(ffOptEnv::TEXT, 'section_title', 'Section Title');
                $a->startSection( 'items', 'Team %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
                	$a->addOption(ffOptEnv::IMAGE, 'image', 'Image');
                    $a->addOption(ffOptEnv::TEXT, 'title', 'Title');
                    $a->addOption(ffOptEnv::TEXT, 'text', 'Position');
            			
                $a->endSection();
            
		$a->endSection();

        return $a;

    }

}
