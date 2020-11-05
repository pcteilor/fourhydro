<?php

class to_Options{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'options', 'Options' );

            // THERE WILL BE ALL STUFF WITH OPTIONS

            $a->insertSection('toHeader');
            
            $a->insertSection('toSocial');
            
            $a->insertSection('toFooter');
            $a->insertSection('toTranslation');
            $a->insertSection('toSkins');
            $a->insertSection('toCustomCode');
            $a->insertSection('toInstall');

            // F.E. PAGE BUILDER COMPONENTS

        $a->endSection();

        return $a;

    }

}


