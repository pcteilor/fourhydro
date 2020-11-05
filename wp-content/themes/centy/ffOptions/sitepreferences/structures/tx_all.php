<?php

class tx_all{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'sitepreferences', 'Site Preferences');

            $a->insertSection('txhome', ffOptEnv::SP_SECTION);
            $a->insertSection('txarchives', ffOptEnv::SP_SECTION);
            $a->insertSection('txauthor', ffOptEnv::SP_SECTION);
            $a->insertSection('txsearch', ffOptEnv::SP_SECTION);
            $a->insertSection('txdate', ffOptEnv::SP_SECTION);
            $a->insertSection('txtag', ffOptEnv::SP_SECTION);

            $a->insertSection('txcategory', ffOptEnv::SP_SECTION);
            $a->insertSection('txportfolio', ffOptEnv::SP_SECTION);


        $a->endSection();

        return $a;

    }

}
