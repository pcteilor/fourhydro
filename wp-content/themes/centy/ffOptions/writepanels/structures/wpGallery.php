<?php

class wpGallery{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpgallery', 'Gallery');
            $a->addOption(ffOptEnv::GALLERY, 'items', 'Gallery');
        $a->endSection();

        return $a;

    }

}
