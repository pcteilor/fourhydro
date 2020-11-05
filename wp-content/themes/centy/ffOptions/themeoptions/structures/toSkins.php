<?php

class toSkins{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'skins', 'Skins');
            $a->addElement(ffOptEnv::HEADER, 'Skins');
            
			$a->addOption(ffOptEnv::SELECT, 'layout', 'Layout','false')
				->addSelectValue('false', 'Fullwidth')
				->addSelectValue('true', 'Boxed');
            
			$html_before = '<span class="imgitem_container"><span class="imgitem_wrapper"><span class="imgitem">';
			$html_after =  '</span></span></span>';

			$colors = array(
					'00c492',
					'50bfd6',
					'fa565a',
					'ffcd32',
					'777b80',
					'00a963',
					'08b6ff',
					'fe4445',
					'ff9d1d',);
			
			$tabs = array();
			foreach( $colors as $oneColor ) {
				$tabs[ $oneColor ] = $html_before.'<span style="width:50px;height:50px; background-color:#'.$oneColor.';"></span>'.$html_after;
			}
			
			$backgroundTabs = array();
			for( $i = 1; $i <= 9; $i++ ) {
				$ext = '.png';
				if( $i == 9) $ext = '.jpg';
				$backgroundTabs[ $i ] = $html_before.'<img style="width:50px;height:50px;" src="'.get_template_directory_uri().'/lib/switcher/img/boxed/0'.$i.$ext.'" />'.$html_after;
			}
			
			
			$a->addElement(ffOptEnv::DESCRIPTION, 'Colors');
			
			$a->addOption(ffOptEnv::TABS, 'color', '', '00c492' )
				->addParam('tabs',$tabs);

			$a->addElement(ffOptEnv::DESCRIPTION, 'Background');
			
			$a->addOption(ffOptEnv::TABS, 'background', '', '1' )
			->addParam('tabs',$backgroundTabs);


        $a->endSection();

        return $a;

    }

}
