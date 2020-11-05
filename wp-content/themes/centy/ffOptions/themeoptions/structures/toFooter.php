<?php

class toFooter{

    static function createStructure(){

        $a = new ffStructure();

		$a->startSection( 'footer', 'Footer');
		$a->addElement(ffOptEnv::HEADER, 'Footer Top');		
	        $a->addOption(ffOptEnv::CHECKBOX, 'enableSection', 'Enable Section')
	        ->addParam('enables', array('items', 'section_title') );
         
        
	        $a->startSection( 'widgetized-areas', 'Footer Area %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
	        $a->addOption(ffOptEnv::SELECT, 'width', 'Width', '3/12')
	        ->addSelectValue('1','1/12')
	        ->addSelectValue('2', '2/12')
	        ->addSelectValue('3', '3/12')
	        ->addSelectValue('4', '4/12')
	        ->addSelectValue('5', '5/12')
	        ->addSelectValue('6', '6/12')
	        ->addSelectValue('7', '7/12')
	        ->addSelectValue('8', '8/12')
	        ->addSelectValue('9', '9/12')
	        ->addSelectValue('10', '10/12')
	        ->addSelectValue('11', '11/12')
	        ->addSelectValue('12', '12/12');
	        $a->endSection();
         
	        $a->addOption(ffOptEnv::CHECKBOX, 'top-arrow-top', 'Show Back To Top Button');
        


            $a->addElement(ffOptEnv::HEADER, 'Footer Bottom');

            $a->addOption(ffOptEnv::CHECKBOX, 'bottom-text-show', 'Show Footer text')
                ->addParam('enables', 'bottom-text');
            
            $a->addOption(ffOptEnv::TEXT, 'bottom-text', '', '&copy; Copyright 2013 Centy');
            $a->addOption(ffOptEnv::CHECKBOX, 'bottom-menu-show', 'Show Footer Menu');
            $a->addOption(ffOptEnv::CHECKBOX, 'bottom-social-show', 'Show Footer Social')
            	->addParam('enables', array('bottom-social'));
            $a->addOption(ffOptEnv::TEXTAREA, 'bottom-social', 'Social Links',
                          "https://twitter.com/_freshface\n".
                          "https://www.facebook.com/envato\n".
                          "email:centy@mailinator.com"
			);
            
            

        $a->endSection();

        return $a;

    }

}
