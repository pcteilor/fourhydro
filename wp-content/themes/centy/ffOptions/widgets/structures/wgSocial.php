<?php
  
class wgSocial{

    static function createStructure(){

        $a = new ffStructure();
        $a->startSection( 'wgSocial', 'Social');

            $a->addOption(ffOptEnv::TEXT, 'title', 'Title');
            $a->addOption(ffOptEnv::TEXTAREA, 'links', 'Social Links');

        $a->endSection();
        
        return $a;

    }

}


