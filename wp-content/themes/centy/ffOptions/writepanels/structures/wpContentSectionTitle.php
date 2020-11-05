<?php

class wpContentSectionTitle {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpcontentsectiontitle', 'Content Section Title');
            
            $a->addOption(ffOptEnv::TEXT, 'section_title', 'Section Title');
            
		$a->endSection();

        return $a;

    }

}
