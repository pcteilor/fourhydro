<?php

class t_page{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'writepanels', 'Write Panels');

        $a->insertSection('wpPageSettings')
        	->addParam('page_template', array('default') );

   
        
        $a->insertSection('wpAdditionalContactInfo')
			->addParam('page_template', array('page-contact.php') );
        
		$a->insertSection('wpGMap')
        	->addParam('page_template', array('page-contact.php') );

		$a->insertSection('wpPreface')
			->addParam('page_template', array('page-about.php', 'page-contact.php') );
		
		$a->insertSection('wpContentSectionTitle')
			->addParam('page_template', array('page-about.php') );
		
		$a->insertSection('wpHighlight')
			->addParam('page_template', array('page-about.php') );
		
		$a->insertSection('wpTeam')
			->addParam('page_template', array('page-about.php') );
		
		$a->insertSection('wpImageStripe')
			->addParam('page_template', array('page-about.php') );
		
		$a->insertSection('wpClients')
			->addParam('page_template', array('page-about.php') );
		
		$a->insertSection('wpRequestButton')
			->addParam('page_template', array('page-about.php') );

        $a->endSection();

        return $a;

    }

}
