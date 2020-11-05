<?php
  
class wgLogo{

    static function createStructure(){

        $a = new ffStructure();
        $a->startSection( 'wgLogo', 'Logo');

        
        	$a->addOption(ffOptEnv::CHECKBOX, 'logo-text-enabled', 'Logo in text format ( Instead of Image)')
        		->addParam('enables', 'logo-text' )
        		->addParam('disables', 'logo-image' );
        	
            $a->addOption(ffOptEnv::TEXT, 'logo-text', 'Logo in text format', '<b>centy</b> / web');
	
            $a->addOption(ffOptEnv::IMAGE, 'logo-image', 'Logo in image format' );
            
            $a->addOption(ffOptEnv::TEXT, 'logo-url', 'URL pointing to', '#');
            
                
                
        $a->endSection();
        
        return $a;

    }

}


