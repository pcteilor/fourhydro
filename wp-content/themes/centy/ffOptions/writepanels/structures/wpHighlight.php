<?php

class wpHighlight{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'wphighlight', 'Highlight');
            $a->addOption(ffOptEnv::CHECKBOX, 'enableSection', 'Enable Section')
                ->addParam('enables', array('highlight_title', 'highlight_content') );
            
            $a->addOption(ffOptEnv::TEXT, 'highlight_title', 'Highlight Title')
            	->addParam('placeholder', 'Passepartout went timidly ashore on this so');
            $a->addOption(ffOptEnv::TEXTAREA, 'highlight_content', 'Highlight Content')
            	->addParam('placeholder', 'Passepartout went timidly ashore on this so curious territory of the Sons of the Sun. He had nothing better to do than, taking chance for his guide, to wander aimlessly through the streets of Yokohama. He found himself at first in a thoroughly European quarter, the houses having low fronts, and being adorned with verandas, beneath which he caught glimpses of neat peristyles. This quarter occupied, with its streets');
            
		$a->endSection();

        return $a;

    }

}
