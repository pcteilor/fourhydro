<?php

class txPortfolio{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'portfolio-category', 'Portfolio');

            /* system */
            $a->addOption(ffOptEnv::SELECT, '__system_id', 'ID')
                ->addSelectCallback( 'MnuCatPortfolio' )
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_taxonomy', 'Taxonomy', 'portfolio-category')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_loaded', 'Loaded', 1)
                ->addParam('wrapper-class','__system');
            /* SYSTEM END */

            $a->addElement(ffOptEnv::HEADER, 'Custom settings');
            $a->addOption(ffOptEnv::CHECKBOX, 'use-custom', 'Use custom settings')
                ->addParam('enables', 'query|__static_element_2' );

            $a->addElement(ffOptEnv::HEADER, 'Item List Options');
            $a->insertSection('tx__query');
            
            $a->startSection( 'template', '');
	            $a->addElement(ffOptEnv::HEADER, 'Template Settings');
	            $a->addOption(ffOptEnv::TEXT, 'fixed_height_featured', 'Fixed Height Of Featured Image', 464);
	            $a->addOption(ffOptEnv::TEXT, 'fixed_height', 'Fixed Height Of Preview Images', 733);
	            $a->addOption(ffOptEnv::CHECKBOX, 'preface-show', 'Show Preface')
	            ->addParam('enables', 'preface');
	            $a->startSection( 'preface', '');
	             
		            $a->addOption(ffOptEnv::TEXT, 'title', 'Title','Portfolio' );
		            $a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Check out the most recent projects');
	             
	            $a->endSection();	  

	            $a->addOption(ffOptEnv::CHECKBOX, 'filterable-show', 'Show Filterable Panel')
	            	->addParam('enables', 'filterable');
	            $a->startSection( 'filterable', '');
	            	$a->addOption(ffOptEnv::SELECT, 'number-of-columns', 'Number of columns', 3, 'Set number of columns as a default filtering')
	            		->addSelectValue('1', '1')
	            		->addSelectValue('2', '2')
	            		->addSelectValue('3', '3')
	            		->addSelectValue('4', '4');
	            
	            $a->endSection();
	            
	            
	            $a->startSection( 'request-category', '');
		            $a->addOption(ffOptEnv::CHECKBOX, 'request-show', 'Show Request Button Category')
		            	->addParam('enables', array('request-title', 'request-url'));
		            
		            $a->addOption(ffOptEnv::TEXT, 'request-title', 'Request Button Title','Request a quote' );
		            $a->addOption(ffOptEnv::TEXT, 'request-url', 'Request Button Url', '#');
	            $a->endSection();
	            
	            $a->startSection( 'request-single', '');
		            $a->addOption(ffOptEnv::CHECKBOX, 'request-show', 'Show Request Button Single')
		            ->addParam('enables', array('request-title', 'request-url'));
		             
		            $a->addOption(ffOptEnv::TEXT, 'request-title', 'Request Button Title','Request a quote' );
		            $a->addOption(ffOptEnv::TEXT, 'request-url', 'Request Button Url', '#');
            	$a->endSection();
             
            $a->endSection();            

        $a->endSection();

        return $a;

    }

}
