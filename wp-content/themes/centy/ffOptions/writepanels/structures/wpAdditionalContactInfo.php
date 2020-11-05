<?php

class wpAdditionalContactInfo{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpadditionalcontactinfo', 'Additional Contact Info');

            $a->addOption(ffOptEnv::CHECKBOX, 'enableAddress', 'Enable Address')
                ->addParam('enables', array('address_title', 'address_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'address_title', 'Address Title', 'Address');
            $a->addOption(ffOptEnv::TEXTAREA, 'address_content', 'Address Content', "Bognergasse 16 \n9131 Wien \nAustria");
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableContact', 'Enable Contact')
            	->addParam('enables', array('contact_title', 'contact_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'contact_title', 'Contact Title', 'Contact');
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableContactEmail', 'Enable Contact Email')
            ->addParam('enables', array('contact_email_title', 'contact_email_email') );
            $a->addOption(ffOptEnv::TEXT, 'contact_email_title', 'Contact Title', 'Drop us a mail');
            $a->addOption(ffOptEnv::TEXT, 'contact_email_email', 'Contact Email', 'your@email.com');
            
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableContactPhone', 'Enable Contact Phone')
            ->addParam('enables', array('contact_content') );
            
            $a->addOption(ffOptEnv::TEXTAREA, 'contact_content', 'Contact Content', "Tel: 0680 710 13 36 \nFax: 0680 710 13 99");

            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSocial', 'Enable Social Links')
            ->addParam('enables', array('social_title', 'social_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'social_title', 'Social Title', 'Social');
            $a->addOption(ffOptEnv::TEXTAREA, 'social_content', 'Social Links')
            	->addParam('placeholder', "http://www.facebook.com/yourprofile \nhttp://www.twitter.com/yourprofile");

        $a->endSection();

        return $a;

    }

}
