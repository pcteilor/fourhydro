<?php

class txcategory{

	static function createStructure(){

		$a = new ffStructure();

		$a->startSection( 'category', 'Blog');

			/* system */
			$a->addOption(ffOptEnv::SELECT, '__system_id', 'ID')
				->addSelectCallback( 'MnuCat' )
				->addParam('wrapper-class','__system');
			$a->addOption(ffOptEnv::TEXT, '__system_taxonomy', 'Taxonomy', 'category')
				->addParam('wrapper-class','__system');
			$a->addOption(ffOptEnv::TEXT, '__system_loaded', 'Loaded', 1)
				->addParam('wrapper-class','__system');
			/* SYSTEM END */

			$a->addElement(ffOptEnv::HEADER, 'Custom settings')
				->addParam('wrapper-class', 'use-custom');
			$a->addOption(ffOptEnv::CHECKBOX, 'use-custom', 'Use custom settings')
				->addParam('enables', 'query|__static_element_2|sidebar' )
				->addParam('wrapper-class', 'use-custom');

			$a->addElement(ffOptEnv::HEADER, 'Item List Options');
			$a->insertSection('tx__query');
			
			$a->startSection( 'sidebar', '');

				$a->addElement(ffOptEnv::HEADER, 'Sidebar');

				$a->addOption(ffOptEnv::CHECKBOX, 'show-sidebar', 'Show Sidebar');
	
			$a->endSection();
			
			
			$a->startSection( 'template', '');
				$a->addElement(ffOptEnv::HEADER, 'Template Settings');
				$a->addOption(ffOptEnv::TEXT, 'fixed_height', 'Fixed Height', 446);
				$a->addOption(ffOptEnv::CHECKBOX, 'preface-show', 'Show Preface')
				->addParam('enables', 'preface');
				$a->startSection( 'preface', '');
				
					$a->addOption(ffOptEnv::TEXT, 'title', 'Title','Post List' );
					$a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Read the latest articles');
				
				$a->endSection();
				
				$a->startSection( 'meta', '');
					$a->addOption(ffOptEnv::CHECKBOX, 'date-show', 'Show Date');
					$a->addOption(ffOptEnv::CHECKBOX, 'author-show', 'Show Author');
					$a->addOption(ffOptEnv::CHECKBOX, 'category-show', 'Show Categories');
					$a->addOption(ffOptEnv::CHECKBOX, 'tag-show', 'Show Tags');
					$a->addOption(ffOptEnv::CHECKBOX, 'comment-show', 'Show Comments');
					$a->addOption(ffOptEnv::CHECKBOX, 'share-show', 'Show Share');
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
				
				$a->addElement(ffOptEnv::DESCRIPTION, 'Single template settings');
				
				$a->addOption(ffOptEnv::SELECT, 'single-boxed', 'Featured Image Size', 'false')
					->addSelectValue('false', 'Fullwidth')
					->addSelectValue('true', 'Boxed');
					
				
			$a->endSection();

		$a->endSection();

		return $a;

	}

}
