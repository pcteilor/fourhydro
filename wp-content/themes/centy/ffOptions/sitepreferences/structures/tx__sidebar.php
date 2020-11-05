<?php

class tx__sidebar{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'sidebar', '');

            $a->addElement(ffOptEnv::HEADER, 'Sidebar');

            $a->addOption(ffOptEnv::CHECKBOX, 'show', 'Show Sidebar')
                ->addParam('enables', 'position' );

            $a->addOption(ffOptEnv::SELECT, 'position', 'Sidebar position', 'right')
                ->addSelectValue('left', 'Left')
                ->addSelectValue('right', 'Right');

        $a->endSection();

        return $a;

    }

}
