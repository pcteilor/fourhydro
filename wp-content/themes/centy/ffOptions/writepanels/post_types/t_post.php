<?php

class t_post{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'writepanels', 'Write Panels');

            $a->insertSection('wpIntro');
            $a->insertSection('wpFeatured')->addParam('position', 'side' );

        $a->endSection();

        return $a;

    }

}
