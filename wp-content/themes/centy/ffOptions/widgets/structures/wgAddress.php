<?php
  
class wgAddress{

    static function createStructure(){

        $a = new ffStructure();
        $a->startSection( 'wgAddress', 'Address');

            $a->addOption(ffOptEnv::TEXT, 'title', 'Title');
            $a->addOption(ffOptEnv::TEXTAREA, 'address', 'Address');


            $a->startSection( 'contact-items', 'Contact item %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
                $a->addOption(ffOptEnv::SELECT, 'type', 'Type', 'mail')
                    ->addSelectValue('phone', 'Phone')
                    ->addSelectValue('mail', 'Mail');
                $a->addOption(ffOptEnv::TEXT, 'content', 'Content');
            $a->endSection();

        $a->endSection();
        
        return $a;

    }

}


