<?php

class t_project{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'writepanels', 'Write Panels');

            $a->insertSection('wpGallery');

        $a->endSection();

        return $a;
    }

}
