<?php

class toSocial{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'socialmenu', 'Social');
            $a->addElement(ffOptEnv::HEADER, 'Social Icons in Navigation Menu');
            $a->addOption(ffOptEnv::CHECKBOX, 'isEnabled', 'Show')
                ->addParam('enables', array( 'prefix', 'suffix', 'links', ));
            $a->addOption(ffOptEnv::TEXT, 'prefix', 'Tooltip prefix', 'Follow us on ')
                  ->addParam('placeholder','Follow us on ');
            $a->addOption(ffOptEnv::TEXT, 'suffix', 'Tooltip suffix');
            $a->addOption(ffOptEnv::TEXTAREA, 'links', 'Social links',
                          "https://twitter.com/_freshface\n".
                          "https://www.facebook.com/envato\n".
                          "http://dribbble.com/envato"
                          );
            
            $a->addOption(ffOptEnv::CHECKBOX, 'sharing-enable', 'Enable Sharing');
            $a->addOption(ffOptEnv::CHECKBOX, 'sharing-enable-facebook', 'Enable Facebook Sharing');
            $a->addOption(ffOptEnv::CHECKBOX, 'sharing-enable-twitter', 'Enable Twitter Sharing');
            $a->addOption(ffOptEnv::CHECKBOX, 'sharing-enable-google', 'Enable Google Plus Sharing');
        $a->endSection();

        return $a;

    }

}
