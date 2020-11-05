<?php

class wpGMap{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wpgmap', 'Google Maps');

            $a->addOption(ffOptEnv::CHECKBOX, 'isEnabled', 'Show Google Maps')
                ->addParam('enables', array('latitude', 'longtitude') );
            
            $a->addOption(ffOptEnv::TEXT, 'latitude', 'Latitude')
                ->addParam('placeholder','48.210604');
            $a->addOption(ffOptEnv::TEXT, 'longtitude', 'Longtitude')
            ->addParam('placeholder','16.368188');

            $a->addOption(ffOptEnv::SELECT, 'zoom', 'Zoom', '16')
                ->addSelectValue('1', '1 - world ')
                ->addSelectValue('2', '2')
                ->addSelectValue('3', '3')
                ->addSelectValue('4', '4')
                ->addSelectValue('5', '5 - states')
                ->addSelectValue('6', '6')
                ->addSelectValue('7', '7')
                ->addSelectValue('8', '8')
                ->addSelectValue('9', '9')
                ->addSelectValue('10', '10 - towns')
                ->addSelectValue('11', '11')
                ->addSelectValue('12', '12')
                ->addSelectValue('13', '13')
                ->addSelectValue('14', '14')
                ->addSelectValue('15', '15 - town districts')
                ->addSelectValue('16', '16')
                ->addSelectValue('17', '17')
                ->addSelectValue('18', '18')
                ->addSelectValue('19', '19')
                ->addSelectValue('20', '20 - streets');

        $a->endSection();

        return $a;

    }

}
