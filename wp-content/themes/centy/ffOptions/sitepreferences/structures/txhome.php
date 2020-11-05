<?php

class txhome{

    static function createStructure(){

        $featured_icons = array(
            'cloud.png', 'ios.png'
        );

        $a = new ffStructure();

        $a->startSection( 'home', 'Home Page');

            /* system */
            $a->addOption(ffOptEnv::SELECT, '__system_id', 'ID')
                ->addSelectValue('0', 'Default Settings')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_taxonomy', 'Taxonomy', 'home')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_loaded', 'Loaded', 1)
                ->addParam('wrapper-class','__system');
            /* SYSTEM END */

            $a->addElement(ffOptEnv::HEADER, 'Slider');
            $a->startSection( 'slider', '');
                $a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Slider')
                    ->addParam('enables', 'id');
                $a->addOption(ffOptEnv::SELECT, 'id', 'Select your Slider', 'default')
                    ->addSelectCallback( 'RevSliderList' );
                
                $a->addOption(ffOptEnv::IMAGE, 'background-image', 'Background Image', get_template_directory_uri().'/photos/slider/background.jpg');
                
            $a->endSection();

            $a->addElement(ffOptEnv::HEADER, 'Slogan');
            $a->startSection( 'slogan', '');
                $a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Slogan')
                    ->addParam('enables', array( 'text-big', 'text-small' ) );
                
                $a->addOption(ffOptEnv::TEXTAREA, 'text-big', 'Description', 'This is an important port of call in the Pacific, where all the mail-steamers, and those carrying travellers between North');
                $a->addOption(ffOptEnv::TEXT, 'text-small', 'Small Text', 'Check out our most recent project we completed');

            $a->endSection();

            
            $a->addElement(ffOptEnv::HEADER, 'Portfolio Feed');
            $a->startSection( 'portfolio-feed', '');
            	$a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Portfolio Feed')
            		->addParam('enables', array( 'categories' ) );
            
            	$a->addOption(ffOptEnv::SELECT, 'categories', 'Feed From: ', 0 )
            		->addSelectCallback( 'MnuCatPortfolio' );
            	
                $a->addOption(ffOptEnv::TEXT, 'numberposts', 'Number of Posts', 9);
                $a->addOption(ffOptEnv::TEXT, 'fixed_height', 'Fixed Height', 572);
                	
            $a->endSection();
            
            
            $a->addElement(ffOptEnv::HEADER, 'Testimonial');
            $a->startSection( 'testimonials', '');
            
	            $a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Testimonial')
	            ->addParam('enables', array( 'title', 'content', 'author', 'author-url' ) );
	            
	            $a->addOption(ffOptEnv::TEXT, 'title', 'Title', 'What our Clients Say');
	            $a->addOption(ffOptEnv::TEXTAREA, 'content', 'Content', 'It is situated in the bay of Yeddo, and at but a short distance from that second capital of the Japanese Empire, and the residence of the Tycoon, the civil Emperor, before the Mikado, the spiritual Emperor, absorbed');
	            $a->addOption(ffOptEnv::TEXT, 'author', 'Author', 'Centy Admin');
	            $a->addOption(ffOptEnv::TEXT, 'author-url', 'Author Url', '#');
	            
	            
            
            $a->endSection();
            
            
            $a->addElement(ffOptEnv::HEADER, 'Request Button');
            $a->startSection( 'request', '');
            
	            $a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Request Button')
	            ->addParam('enables', array( 'title', 'url' ) );
	             
	            $a->addOption(ffOptEnv::TEXT, 'title', 'Title', 'Request a quote');
	             
	            $a->addOption(ffOptEnv::TEXT, 'url', 'Url', '#');

            $a->endSection();
            
            
            
            

            $a->addElement(ffOptEnv::HEADER, 'Posts');

            $a->addOption(ffOptEnv::CHECKBOX, 'category-feed-show', 'Show Category (e.g., Blog) on the Home Page')
                ->addParam('enables', array( 'category', 'sidebar', 'template', 'query') );

            $a->startSection( 'category', '');
                $a->addOption(ffOptEnv::SELECT, 'id', 'Categories')
                    ->addSelectValue('', '- All -')
                    ->addSelectCallback( 'Categories' );
            $a->endSection();
            
            $a->insertSection('tx__query');
            
	        $a->startSection( 'sidebar', '');
	
	            $a->addElement(ffOptEnv::HEADER, 'Sidebar');
	
	            $a->addOption(ffOptEnv::CHECKBOX, 'show-sidebar', 'Show Sidebar');
	
	        $a->endSection();
            
            
            $a->startSection( 'template', '');
            	$a->addElement(ffOptEnv::HEADER, 'Template Settings');
            	
            	$a->addOption(ffOptEnv::CHECKBOX, 'preface-show', 'Show Preface')
            	->addParam('enables', 'preface');
            	$a->startSection( 'preface', '');
            	
            		$a->addOption(ffOptEnv::TEXT, 'title', 'Title','Post List' );
            		$a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Read the latest articles');
            	
            	$a->endSection();
            	
            	
            	
            	
            	$a->addElement(ffOptEnv::DESCRIPTION, 'Choose between modern style of look and list');
	            
	            
	            $a->addOption(ffOptEnv::SELECT, 'template', 'Template', 'list')
	            ->addSelectValue('list', 'Blog List')
	            ->addSelectValue('modern', 'Blog Modern');
	            
	            $a->addElement(ffOptEnv::DESCRIPTION, 'These settings are applied only if you choose Blog Modern layout');
	            
	            $a->addOption(ffOptEnv::CHECKBOX, 'slider-show', 'Show Slider')
	            	->addParam('enables', array('slider-numberofposts', 'slider-feed'));
	            
	            $a->addOption(ffOptEnv::TEXT, 'slider-numberofposts', 'Number of latest posts in slider', '10');
	            $a->addOption(ffOptEnv::SELECT, 'slider-feed', 'Slider Category Feed', 'default')
	            	->addSelectValue('default', 'Current Category')
	            	->addSelectCallback('Categories');
	            
	            $a->addOption(ffOptEnv::CHECKBOX, 'filterable-show', 'Show Filterable Panel');
	            
	            	            
	            
            $a->endSection();

        $a->endSection();

        return $a;

    }

}


