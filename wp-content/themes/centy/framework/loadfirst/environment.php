<?php
/**
 * Framework Environment
 */
class fEnv {
	private static $widgets = array();
	private static $templates = array();
	
	private static $admin_pages = array();
	private static $admin_styles = array();
	private static $admin_scripts = array();
	private static $admin_slugs = array( 'foptions' => 1 );
	private static $footer_content = array();
	
	
	private static $category_options = null;
	private static $single_options = null;
	private static $components_registered = array();
	
	private static $navigation_menus = array();
	
	public static function addFooterContent( $content ) {
		self::$footer_content[] = $content;
	}
	
	public static function printFooterContent() {
		foreach( self::$footer_content as $one_content ) {
			echo $one_content;
		}
	}
	
	public static function getImgPrevDir() {
		return get_template_directory_uri().'/';
	}
	public function time_elapsed_string($ptime) {
	    $etime = time() - $ptime;
	    
	    if ($etime < 1) {
	        return '0 seconds';
	    }
	    
	    $a = array( 12 * 30 * 24 * 60 * 60  =>  'year',
	                30 * 24 * 60 * 60       =>  'month',
	                24 * 60 * 60            =>  'day',
	                60 * 60                 =>  'hour',
	                60                      =>  'minute',
	                1                       =>  'second'
	                );
	    
	    foreach ($a as $secs => $str) {
	        $d = $etime / $secs;
	        if ($d >= 1) {
	            $r = round($d);
	            return $r . ' ' . $str . ($r > 1 ? 's' : '');
	        }
	    }
	}
	public static function curPageURL() {
 		$pageURL = 'http';
 		if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 			$pageURL .= "://";
 		if ($_SERVER["SERVER_PORT"] != "80") {
  			$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 		} else {
  			$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 		}
 		return $pageURL;
	} 	
	
	public static function getActualPageTemplate() {
		$dir = get_page_template();
		$pinfo = pathinfo( $dir );
		
		return $pinfo['filename'];
	}
	
	public static function addNavigationMenu( $name, $slug ) {
		//$to_add = array();
		//$to_add[ $slug ] = $name;
		self::$navigation_menus[ $slug ] = $name;
	}
	
	public static function registerNavigationMenu() {
			register_nav_menus( self::$navigation_menus);
	}
	
	public static function registerComponent( $name, $class_name ) {
		self::$components_registered[ $class_name ] = $name;
	}
	
	public static function getComponentName( $class_name ) {
		return self::$components_registered[ $class_name ];
	}
	
	public static function getComponentList() {
		return self::$components_registered;
	}
	
	public static function getCurrentCategoryOptions() {
		if( self::$category_options !== null)
			return self::$category_options;
		else {
			$category_options = array();
			$actual_cat = self::getActualCat();
			$category_options['cat'] = fOpt::GetNamespace('cm-cat-opt-'.$actual_cat);
			$category_options['sin'] = fOpt::GetNamespace('cm-sin-opt-'.$actual_cat);
			
			self::$category_options = $category_options;
			
			return $category_options;
		}
	}
	
	public static function getSingleOption( $option_name ) {
		$cat_options = self::getCurrentCategoryOptions();
		$option_name = 'fw_sin_'.$option_name;
		if( $cat_options['sin'][ $option_name ] == null ) {
			$catOpt = fCategoryOptionsStore::getInstance();
			$opt = $catOpt->getSingleOptionById( $option_name );
			//var_dump($opt['std']);
			return $opt['std'];
		}
		return $cat_options['sin'][ $option_name ];
	}
	
	public static function getCategoryOption( $option_name ) {
		$cat_options = self::getCurrentCategoryOptions();
		
		
		//'//'
		if( !isset($cat_options['cat'][ $option_name ]) || $cat_options['cat'][ $option_name ] == null ) {
			$catOpt = fCategoryOptionsStore::getInstance();
			$opt = $catOpt->getCategoryOptionById( $option_name );
			
			return $opt['std'];
		}
		//var_dump($cat_options['cat'][ $option_name ]);
		//echo $option_name . $cat_options['cat'][ $option_name ];
		return $cat_options['cat'][ $option_name ];
	}
		
	public static function addAdminMenu( $page_title, $menu_title, $menu_slug, $position ) {
		$one_admin_menu = array();
		$one_admin_menu['page_title'] = $page_title;
		$one_admin_menu['menu_title'] = $menu_title;
		$one_admin_menu['menu_slug'] = $menu_slug;
		self::$admin_pages[$position] = $one_admin_menu;
		self::$admin_slugs[ $menu_slug ] = 1;
	}
	
	public static function addAdminStyle( $menu_slug, $style_path ) {
		self::$admin_styles[ $menu_slug ][] = $style_path;
	}
	
	public static function addAdminScript( $menu_slug, $style_path, $is_integrated = false ) {
		self::$admin_scripts[ $menu_slug ][]['script'] = $style_path;
		self::$admin_scripts[ $menu_slug ][]['integrated'] = $is_integrated;
	}
	
	public static function printMenuStyles() {
		$custom_menu_slug = null;	
		if( isset( $_GET['page'] ) )
			$custom_menu_slug = $_GET['page'];
		else return;
		
		if( isset(self::$admin_styles[$custom_menu_slug]) ) {
			foreach( self::$admin_styles[$custom_menu_slug] as $one_style ) {
				wp_enqueue_style( rand(time(), 50), $one_style);
				//echo $one_style;
			}
			
		}
 
		if( isset(self::$admin_scripts[$custom_menu_slug]) ) {
			foreach( self::$admin_scripts[$custom_menu_slug] as $one_style ) {
				
				if( isset($one_style['integrated']) ) {
				//	$stop();
					//var_dump($one_style['integrated'] );
					//wp_enqueue_script($one_style['script']);
				
				}
				else  {
					wp_enqueue_script(rand(time(), 50),  $one_style['script']);
				}
				
			}
			
		}
	}
	
	public static function componentButtonGetColors() {
		$to_return = array( array('name'=>'Yellow', 'value'=>'yellow'),
		array('name'=>'Grey', 'value'=>'grey'),
		array('name'=>'Blue', 'value'=>'blue'),
		array('name'=>'Orange', 'value'=>'orange'),
		array('name'=>'Green', 'value'=>'green'),
		array('name'=>'Red', 'value'=>'red'),
		);
		
		return $to_return;
	}
	
	public static function handleSavingFunctions() {
		if( !isset( $_GET['page'] ) ) return;
		
		$slug = $_GET['page'];
		if( !isset( self::$admin_slugs[$slug]) ) return;
		
		if( function_exists( $slug.'_save' ))
			call_user_func( $slug.'_save' );
	}
	
	public static function registerMenus() {
		 add_menu_page('Theme Options' , 'Theme Options', 'administrator', fSettings::$theme_options_admin_menu_slug, fSettings::$theme_options_admin_menu_slug.'_view');
		 
		 //var_dump( self::$admin_pages);
		 ksort( self::$admin_pages);
		 //var_dump( self::$admin_pages);
		 if( !empty(self::$admin_pages) ) {
		 	foreach( self::$admin_pages as $one_page ) {
		 		add_submenu_page( fSettings::$theme_options_admin_menu_slug, $one_page['page_title'], $one_page['menu_title'], 'administrator', $one_page['menu_slug'], $one_page['menu_slug'].'_view' );
		 	}
		 }
	}
	
	public static function addWidget($widget_name) {
		self::$widgets[] = $widget_name;
	}
	
	public static function registerWidgets() {
		foreach( self::$widgets as $one_widget ) {
			register_widget( $one_widget );			
		}
	}
	
	public static function addTemplate( $data ) {
	
		self::$templates[ $data['type'] ][ $data['sidebar'] ][] = $data;
	}
	
	public static function getTemplates() {
		return self::$templates;
	}
	/**
	 * openUrl - get content of the website
	 * 
	 * @param string $url url to the website in http://xxx.com format
	 * 
	 * @return string
	 */
	public static function openUrl( $url ) {
		/* gets the data from a URL */
		
		if( function_exists  (  'curl_init'  ) )
		{		  
			
			$ch = curl_init();
			$timeout = 5;
			curl_setopt($ch,CURLOPT_URL,$url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
			curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
			
			$data = curl_exec($ch);
			curl_close($ch);
			
			return $data;
		}      
	}
	
  public static function getActualCat() {
      //var_dump( is_tag() );
      if( is_singular() ) {
          $category = get_the_category();
          if( empty($category ) ) return 0;
          return $category[0]->cat_ID;
      }
      if( is_front_page() ) return 'index';
      if( is_search() )     return 'search';
      if( is_archive() ){
          if( is_author() ) return 'author';
          if( is_tag()    ) return 'tag';
          if( is_date()   ) return 'date';

          global $wp_query;
          if( is_category() ){
              $cat = get_category_by_slug( $wp_query->get('category_name') );
              if( is_object( $cat ) ){
                  return $cat->cat_ID;
              }
          }
          if( is_tax() ){
              if( 1 == count( $wp_query->query ) ){
                  $key = key( $wp_query->query );
                  //if( strpos($key, 'category') ){
                      $term = get_term_by( 'slug', $wp_query->query[$key], $key, OBJECT);
                      if( is_object( $term ) ){
                          return $term->term_id;
                      }
                  //}
              }
          }
          return 'archive';
      }
      return 'archive';
  }

	public static function getActualTemplateInfo() {
		$act_temp = self::getActualTemplate();
		
		$temp_info = self::getTemplates();
		/*$temp_info = array();
		foreach( $temp_info_ummerged as $key => $oneArray ) {
			if( is_array( $oneArray ) ) {
				$temp_info = array_merge( $temp_info, $oneArray );
			}
		}
		
		var_dump( $temp_info );*/
		if( !isset( $temp_info['Portfolio']['Fullwidth'] ) )// && !is_array(  $temp_info['Portfolio']['Fullwidth'] )) 
			$temp_info['Portfolio']['Fullwidth'] = array();
    if( !empty($temp_info['Blog']['Right']) and !empty($temp_info['Portfolio']['Fullwidth']) ){
        $to_search = array_merge( $temp_info['Blog']['Right'], $temp_info['Portfolio']['Fullwidth']);
    }else if( !empty($temp_info['Blog']['Right']) ){
        $to_search = $temp_info['Blog']['Right'];
    }else if( !empty($temp_info['Portfolio']['Fullwidth']) ){
        $to_search = $temp_info['Portfolio']['Fullwidth'];
    }else{
        $to_search = array();
    }
		if( empty($to_search) ) return false;
		foreach( $to_search as $one_temp ) {
			$filename = $one_temp['Filename'];
			if( $filename == $act_temp )
				return $one_temp;
		}
		
		//$blog = $temp_info['Blog'];
		//var_dump( array_search( $act_temp, $temp_info));
		/*var_dump($temp_info);
		foreach( $temp_info as $one_temp ) {
			echo 'aaa';	
			$filename = $one_temp['Filename'];
			echo $filename;
			if( $filename == $act_temp )
				return $one_temp;
		}
		*/
		return false;
	}
	public static function getActualTemplate() {
		
		if( !is_single() ) {
			$actual_cat = self::getActualCat();
			$actual_template = fOpt::Get('cm-cat-opt-'.$actual_cat, 'category_template');
			
			if( $actual_template == null) {
				$actual_template = DEFAULT_CATEGORY_TEMPLATE;
				fOpt::Set('cm-cat-opt-'.$actual_cat, 'category_template', $actual_template);
			}
		
		
			
			return $actual_template;
		} else {
			global $post;
			//global $wp_query;
			//var_dump( $wp_query );
			$template = get_post_meta($post->ID, 'fw_custom_post_template', true);
			$template = null;
			if( $template != '' && $template != 'empty' ) {
				return $template;
			}
			$actual_cat = self::getActualCat();
			$actual_template = fOpt::Get('cm-sin-opt-'.$actual_cat, 'single_template');
			
			if( $actual_template == null) {
				$actual_template = DEFAULT_SINGLE_TEMPLATE;
				fOpt::Set('cm-cat-opt-'.$actual_cat, 'single_template', $actual_template);
			}			
			return $actual_template;			
			
		}
	}
	
	
	public static function getPostMainImage( $id = null) {
		if( $id == null )
			global $post;
		else  {
			$post = new stdClass();
			$post->ID = $id;
		}
	    $featured_img = get_post_thumbnail_id( $post->ID );
	    if( $featured_img != '')
	    {
	        $attachment = get_post( $featured_img );
	        $to_return['title'] = $attachment->post_title;
	        $to_return['description'] = $attachment->post_content;
	        $to_return['url'] = wp_get_attachment_url( $attachment->ID);
	        //echo 'dick';
	        return $to_return;
	    }
	    $attachment_args = array(
	         'post_type' => 'attachment',
	         'numberposts' => 1,          // one attachement image per post
	         'post_status' => null,
	         'post_parent' =>$post->ID,
	         'orderby' => 'menu_order ID'
	    );
	    $attachments = get_posts($attachment_args);
		//var_dump($attachments);
		if(empty($attachments)) return false;
	    $to_return = array();
	    $to_return['title'] = $attachments[0]->post_title;
	    $to_return['description'] = $attachments[0]->post_content;
	    $to_return['url'] = wp_get_attachment_url( $attachments[0]->ID);
	    //var_dump($attachments);
	    return $to_return;
	}	

	public static function createHtmlPrinter() {
    if( is_singular() ){
        $post_type = get_post_type();
        $class_name = "html".strtoupper(substr($post_type,0,1)).substr($post_type,1)."Printer";
        if( class_exists($class_name) ){
            return new $class_name();
        }else{
            return new htmlPTPrinter();
        }
    }else{
    	if( is_home() && ffSP::get('category-feed-show')) {
    		return new htmlCategoryPrinter();
    	}
        if( is_tag() || is_category() ){
      			$actualTemplateInfo = fEnv::getActualTemplateInfo();
      			$actualTemplateType = $actualTemplateInfo['type'];
            return new htmlCategoryPrinter();
        }
        if( is_tax() ){
            $term = get_queried_object();
            //ffOptEnv::print_r( $term);
            $class_name = str_replace('-','_',$term->taxonomy);
            $class_name = 'html_'.$class_name.'_Printer';
            //echo $class_name;
            if( class_exists($class_name) ){
                return new $class_name();
            }
            $class_name = str_replace("tag","category",$class_name);
            if( class_exists($class_name) ){
                return new $class_name();
            }
            return new htmlCategoryPrinter();
        }
        // search, archives
        return new htmlPTPrinter();
    }
	}
}

?>