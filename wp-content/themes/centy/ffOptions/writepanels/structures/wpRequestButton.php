<?php

class wpRequestButton {

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wprequestbutton', 'Request Button');
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSection', 'Enable Section')
                ->addParam('enables', array('button_title', 'button_url') );
            
            $a->addOption(ffOptEnv::TEXT, 'button_title', 'Button Title')
            	->addParam('placeholder', 'REQUEST A QUOTE');

            $a->addOption(ffOptEnv::TEXT, 'button_url', 'Button Url')
            ->addParam('placeholder', 'http://www.google.com');
            
		$a->endSection();

        return $a;

    }

}
