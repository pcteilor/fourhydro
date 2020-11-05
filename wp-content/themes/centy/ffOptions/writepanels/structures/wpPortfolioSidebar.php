<?php

class wpPortfolioSidebar {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpportfoliosidebar', 'Portfolio Sidebar');
        
	        $a->startSection( 'aside-info', 'Info %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
	        
		        $a->addOption(ffOptEnv::TEXT, 'title', 'Title');
		        $a->addOption(ffOptEnv::TEXTAREA, 'text', 'Content');
	         
	        $a->endSection();        	
        
        
        	$a->startSection( 'aside-button', 'Button %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
        	
        		$a->addOption(ffOptEnv::TEXT, 'title', 'Title');
        		$a->addOption(ffOptEnv::TEXT, 'url', 'URL');
         
        	$a->endSection();
        	
        	$a->startSection( 'share', '');
	        	$a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Share Section')
	        	->addParam('enables', array('title', 'url') );
	        	
	        	$a->addOption(ffOptEnv::TEXT, 'title', 'Share Title')
	        	->addParam('placeholder', 'Share');
	        	
	        	$a->addOption(ffOptEnv::TEXTAREA, 'url', 'Share URLs')
	        	->addParam('placeholder', 'http://facebook.com');
        	$a->endSection();
        /*
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSectionRole', 'Enable Section Role')
                ->addParam('enables', array('role_title', 'role_text') );
            
            $a->addOption(ffOptEnv::TEXT, 'role_title', 'Role Title')
            	->addParam('placeholder', 'Role');

            $a->addOption(ffOptEnv::TEXTAREA, 'role_text', 'Role Text')
            	->addParam('placeholder', 'Webdesign');
            
            
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSectionClient', 'Enable Section Client')
            	->addParam('enables', array('client_title', 'client_text') );
            
            $a->addOption(ffOptEnv::TEXT, 'client_title', 'Client Title')
            	->addParam('placeholder', 'Client');
            
            $a->addOption(ffOptEnv::TEXTAREA, 'client_text', 'Client Text')
            	->addParam('placeholder', 'ThemeForest');            
            
            
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSectionVisitButton', 'Enable Section Visit Site Button')
            	->addParam('enables', array('button_title', 'button_url') );
            
            $a->addOption(ffOptEnv::TEXT, 'button_title', 'Visit Button Title')
            	->addParam('placeholder', 'Visit Site');
            
            $a->addOption(ffOptEnv::TEXT, 'button_url', 'Visit Button URl')
            	->addParam('placeholder', 'http://themeforest.net');
            
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSectionShare', 'Enable Section Share')
            	->addParam('enables', array('share_title', 'share_url') );
            
            $a->addOption(ffOptEnv::TEXT, 'share_title', 'Share Title')
            	->addParam('placeholder', 'Share');
            
            $a->addOption(ffOptEnv::TEXTAREA, 'share_url', 'Share URLs')
            	->addParam('placeholder', 'http://facebook.com');       */     
                        
            
		$a->endSection();

        return $a;

    }

}
