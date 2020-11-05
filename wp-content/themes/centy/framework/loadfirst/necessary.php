<?php

 
 /**
  * usefull debug class
  * 
  * @author frehsface
  */
class fDebug {
	private static $time = null;
	public static function startTime() {
		self::$time = microtime(true);
	}
	public static function endTime() {
		self::$time = round ( ( microtime(true) - self::$time ) * 1000, 2 );
	}
	public static function endTimePrint() {
		self::endTime();
		echo self::$time;
	}
} 	


class fSettings {
	// how often check the expiration date of the images?
	public static $image_check_caching_time_in_hours = 24;
	// how many does the images live until they die
	public static $image_caching_time_in_days = 1;
	// when adding custom site templates ( blog, single, portfolio ). Which attributes should these files have ?
	public static $template_data_names = array( 'name'=>'Name', 
								'type'=>'Type',
								'sidebar'=>'Sidebar',
								'comments'=>'Comments',
								'img'=> 'Img');
								
	public static $theme_options_admin_menu_slug = 'ff_options';
}





class fpagebuilderManager {
	public function savePage( $name, $data ) {
		
		$pbd_object = new fpagebuilderPage;
		$pbd_object->name = $name;
		$pbd_object->data = $data;
		
		$this->savePageObject( $pbd_object );
		
	}
	public function savePageObject( fpagebuilderPage $pagebuilderPage ) {
		$ser = serialize( $pagebuilderPage );	
		$ser = addslashes( $ser );
		//$ser = addslashes( $ser );
		
		fOpt::SetClean('pagebuilder_templates', $pagebuilderPage->name, $ser);

	}
	
	public function loadPage( $name ) {
		$neco = fOpt::GetClean('pagebuilder_templates', $name);
		if( $neco == null ) {
			echo 'Template "'.$name.'" does not exist. ';
			die();
		}
		
		$neco = unserialize( $neco );
		 
		return $neco;
		
		
	}
}


class fpagebuilderPage {
	public $name = null;
	public $data = null;
	
	private function _getColClass( $width ) {
		$newWidth = null;
		switch( $width ) { 
			case '20%' : $newWidth = 'onefifth'; break;
			case '25%' : $newWidth = 'onefourth'; break;
			case '33.33%' : $newWidth = 'onethird'; break;
			case '40%' : $newWidth = 'twofifth'; break;
			case '50%' : $newWidth = 'onehalf'; break;
			case '60%' : $newWidth = 'threefifth'; break;
			case '66.66%' : $newWidth = 'twothird'; break;
			case '75%' : $newWidth = 'threefourth'; break;
			case '80%' : $newWidth = 'fourfifth'; break;
			case '100%' : $newWidth = 'one'; break;
		}
		return $newWidth;
	}
	
	public function printPage() {
		$rows = $this->data;
		
		echo '<div class="template_builder_content">';
		foreach($rows as $one_row) {
			echo '<div class="row">';
				$lastCounter = 0;
				$colCount = count( $one_row );
				foreach( $one_row as $one_col ) {
					$lastCounter++;
					$lastClass = '';
					if( $lastCounter == $colCount ) $lastClass = ' last ';
					else { $lastClass = ''; }
					
					
					
					$width = $one_col['width'];
					$widgets = null;
					if( isset( $one_col['widgets'] ) )
						$widgets = $one_col['widgets'];
					if( strpos( $width, '%') === false) $width = $width.'%';
					echo '<div class="'.$this->_getColClass( $width ).$lastClass.' col">';
						if( !empty($widgets) ) {
							foreach( $widgets as $one_widget ) {
								//var_dump($one_widget);
								$widget_type = $one_widget['type'];
								$widget_data = null;
								if( isset($one_widget['data']) )
								$widget_data = $one_widget['data'];
														
								$widget_final = new $widget_type;
								$widget_data = $widget_final->escapeData( $widget_data );
 
								$widget_final->printFullComponent( $widget_data );
 
								//$content = do_shortcode( $content );
								//echo $content;
							}
						}
					echo '<div class="clear"></div></div>';
				}
			echo '<div class="clear"></div></div>';
		}
		echo '<div class="clear"></div>';
		echo '</div>';
	}			
}

