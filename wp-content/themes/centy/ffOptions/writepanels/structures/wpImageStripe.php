<?php

class wpImageStripe{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpimagestripe', 'Image Stripe');
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSection', 'Enable Section')
                ->addParam('enables', array('image_source') );
            
            $a->addOption(ffOptEnv::IMAGE, 'image_source', 'Image:');
            
		$a->endSection();

        return $a;

    }

}
