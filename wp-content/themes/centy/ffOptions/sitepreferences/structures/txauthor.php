<?php

class txauthor{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'author', 'Author');

            /* system */
            $a->addOption(ffOptEnv::SELECT, '__system_id', 'ID')
                ->addSelectValue('0', 'Default Settings')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_taxonomy', 'Taxonomy', 'author')
                ->addParam('wrapper-class','__system');
            $a->addOption(ffOptEnv::TEXT, '__system_loaded', 'Loaded', 1)
                ->addParam('wrapper-class','__system');
            /* SYSTEM END */

            $a->addElement(ffOptEnv::HEADER, 'Item List Options');
            $a->insertSection('tx__query');
            $a->insertSection('tx__sidebar');
        $a->endSection();

        return $a;

    }

}
