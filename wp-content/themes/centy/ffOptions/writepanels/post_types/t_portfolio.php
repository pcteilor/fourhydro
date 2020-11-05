<?php

class t_portfolio{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'writepanels', 'Write Panels');

        	$a->insertSection('wpSmallDescription');
        	//$a->insertSection('wpIntro');
            $a->insertSection('wpGallery');
            $a->insertSection('wpPortfolioSidebar');

        $a->endSection();

        return $a;

    }

}
