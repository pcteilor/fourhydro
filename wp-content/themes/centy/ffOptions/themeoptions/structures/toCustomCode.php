<?php

class toCustomCode{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'customcode', 'Custom Code');

            $a->addElement(ffOptEnv::HEADER, 'Custom Tracking/Analytics');
            $a->addOption(ffOptEnv::TEXTAREA, 'custom-tracking');

            $a->addElement(ffOptEnv::HEADER, 'Custom JavaScript');
            $a->addOption(ffOptEnv::TEXTAREA, 'custom-javascript');

            $a->addElement(ffOptEnv::HEADER, 'Custom CSS');
            $a->addOption(ffOptEnv::TEXTAREA, 'custom-css');

        $a->endSection();

        return $a;

    }

}
