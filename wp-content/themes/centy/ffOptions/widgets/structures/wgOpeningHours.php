<?php
  
class wgOpeningHours{

    static function createStructure(){

        $a = new ffStructure();
        $a->startSection( 'wgopeninghours', 'Opening Hours');

                $a->addOption(ffOptEnv::TEXT, 'title', 'Title');

                $a->startSection( 'day-items', 'Day %%%i%%%' , ffOptEnv::REPEATABLE_SECTION );
                        $a->addOption(ffOptEnv::TEXT, 'title', 'Day title');
                        $a->addOption(ffOptEnv::TEXT, 'hours', 'Opening Hours');
                $a->endSection();

        $a->endSection();
        
        return $a;

    }

}


