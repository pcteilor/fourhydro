<?php

class txdate{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'date', 'Date');

            /* system */
            $a->addOption(ffOptEnv::SELECT, '__system_id', 'ID')
                ->addSelectValue('0', 'Default Settings')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_taxonomy', 'Taxonomy', 'date')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_loaded', 'Loaded', 1)
                ->addParam('wrapper-class','__system');
            /* SYSTEM END */

            $a->addElement(ffOptEnv::HEADER, 'Item List Options');
            $a->insertSection('tx__query');
            
            $a->startSection( 'template', '');
            	$a->addOption(ffOptEnv::CHECKBOX, 'preface-show', 'Show Preface')
            	->addParam('enables', 'preface');
             
            	$a->startSection( 'preface', '');
            		$a->addOption(ffOptEnv::TEXT, 'title', 'Title','Date: %s' );
            		$a->addOption(ffOptEnv::TEXT, 'description', 'Description', 'Read the latest articles');
            	$a->endSection();
            $a->endSection();  

        $a->endSection();

        return $a;

    }

}
