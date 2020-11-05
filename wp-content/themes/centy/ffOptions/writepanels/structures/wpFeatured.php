<?php

class wpFeatured{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpfeatured', 'Featured Media');
            $a->addOption(ffOptEnv::SELECT, 'type', 'Featured Media Type')
                ->addSelectValue('', 'Featured Image')
                //->addSelectValue('', 'Standart Image')
                //->addSelectValue('lightbox', 'Open in lightbox')
                ->addSelectValue('video', 'Video');

            $a->addOption(ffOptEnv::CHECKBOX, 'heightIsEnabled', 'Set fixed height:')
                ->addParam('enables', 'height')
                //->addParam('wrapper-class','float-left')
                ;
            $a->addOption(ffOptEnv::TEXT, 'height')
                //->addParam('input-class', 'small')
                //->addParam('wrapper-class','float-left')
                ;
            $a->addOption(ffOptEnv::TEXT, 'video-link', 'Video link')
                ->addParam('wrapper-class','clear');

        $a->endSection();

        return $a;

    }

}
