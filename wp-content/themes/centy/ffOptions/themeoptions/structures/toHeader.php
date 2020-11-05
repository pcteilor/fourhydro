<?php

class toHeader{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'header', 'Header');

            $a->startSection( 'logo', '');
                $a->addElement(ffOptEnv::HEADER, 'Header Logo');
                $a->addOption(ffOptEnv::CHECKBOX, 'show-logo', 'Show logo')
                    ->addParam('enables', 'img');
                $a->addOption(ffOptEnv::IMAGE, 'img', 'Logo Image URL', get_template_directory_uri().'/images/logo.png');
                
                $a->addOption(ffOptEnv::CHECKBOX, 'show-text', 'Show Header Logo Text' )
                ->addParam('enables', 'header-text');
                $a->addOption(ffOptEnv::TEXT, 'header-text', null, "<b>centy /</b> web architects");
                
                $a->addOption(ffOptEnv::SELECT,'navigation-position', 'Navigation Position', 'right')
                		->addSelectValue('right', 'Right')
                		->addSelectValue('left', 'Left');
            $a->endSection();


        $a->endSection();

        return $a;

    }

}
