<?php

class txarchives{

	static function createStructure(){

		$a = new ffStructure();

		$a->startSection( 'archives', 'Archives');

			/* system */
			$a->addOption(ffOptEnv::SELECT, '__system_id', 'ID')
				->addSelectValue('0', 'Default Settings')
				->addParam('wrapper-class','__system');
			$a->addOption(ffOptEnv::TEXT, '__system_taxonomy', 'Taxonomy', 'archives')
				->addParam('wrapper-class','__system');
			$a->addOption(ffOptEnv::TEXT, '__system_loaded', 'Loaded', 1)
				->addParam('wrapper-class','__system');
			/* SYSTEM END */
			
			$a->startSection( 'template', '');
			$a->addElement(ffOptEnv::HEADER, 'Template Settings');
			$a->addOption(ffOptEnv::TEXT, 'fixed_height', 'Fixed Height', 370);
			$a->addOption(ffOptEnv::CHECKBOX, 'preface-show', 'Show Preface')
			->addParam('enables', 'preface');
			
				$a->startSection( 'preface', '');
			 
					$a->addOption(ffOptEnv::TEXT, 'title', 'Title','Post List' );
					$a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Read the latest articles');
			 
				$a->endSection();
			$a->endSection();
			

			
		$a->endSection();

		return $a;

	}

}
