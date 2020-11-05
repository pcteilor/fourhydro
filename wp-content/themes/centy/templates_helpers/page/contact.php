<?php

$gmap = ffWP::getWp('gmap');

$sidebar = ffWP::get('wpadditionalcontactinfo');

if( $sidebar->get('enableSocial') ) {
	$links = $sidebar->get('social_content');
	if( empty( $links ) ) {
		$socialLinks = array();
	} else {
		$socialLinkFeeder = new ffSocialFeeder( $links );
		$socialLinks = $socialLinkFeeder->items;
	}
}


if( $sidebar->get('enableContactPhone') ) {
	$phone = $sidebar->get('contact_content');
	$phone = str_replace("\n", '<br />', $phone);
	$phone = '<p>'.$phone.'</p>';
}
/*
 *             $a->addOption(ffOptEnv::CHECKBOX, 'enableAddress', 'Enable Address')
                ->addParam('enables', array('address_title', 'address_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'address_title', 'Address Title', 'Address');
            $a->addOption(ffOptEnv::TEXTAREA, 'address_content', 'Address Content', "Bognergasse 16 \n9131 Wien \nAustria");
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableContact', 'Enable Contact')
            	->addParam('enables', array('contact_title', 'contact_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'contact_title', 'Contact Title', 'Contact');
            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableContactEmail', 'Enable Contact Email')
            ->addParam('enables', array('contact_email_title', 'contact_email_email') );
            $a->addOption(ffOptEnv::TEXT, 'contact_email_title', 'Contact Title', 'DROP US AN EMAIL');
            $a->addOption(ffOptEnv::TEXT, 'contact_email_email', 'Contact Email', 'your@email.com');
            $a->addOption(ffOptEnv::TEXTAREA, 'contact_content', 'Contact Content', "Tel: 0680 710 13 36 \nFax: 0680 710 13 99");

            
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSocial', 'Enable Social Links')
            ->addParam('enables', array('social_title', 'social_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'social_title', 'Social Title', 'Social');
            $a->addOption(ffOptEnv::TEXTAREA, 'social_content', 'Social Links')
            	->addParam('placeholder', "http://www.facebook.com/yourprofile \nhttp://www.twitter.com/yourprofile");
 */