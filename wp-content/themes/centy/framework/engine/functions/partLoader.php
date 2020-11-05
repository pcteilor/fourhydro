<?php
class ffPartLoader {
	private static $_instance = null;
	
/******************************************************************************/
/* DESCRIPTION
/******************************************************************************/
	public function loadUpperDescription404() {
		$upperDescriptionTitle= fOpt::Get('translation', 'page-404-description-upper');
		$showBreadcrumbs = false;
		require get_template_directory().'/templates/description/description-upper.php';
	}
	
	public function loadLowerDescription404() {
		$lowerDescriptionTitle = fOpt::Get('translation', 'page-404-description-lower');
		require get_template_directory().'/templates/description/description-lower.php';
	}
	
	public function loadUpperDescription() {
		
		if( is_home() ) return;
		$upperDescriptionTitle = null;
		
		if( is_page() && metaboxManager::getMeta('slider_show') == metaboxManager::CHECKED_FIELD ) return;
		
		if( is_page() ) {
			
		//	if( metaBoxManager::getMeta('description_show') != metaBoxManager::CHECKED_FIELD ) return;
			$upperDescriptionTitle = get_the_title();//metaBoxManager::getMeta('description_upper');
			( metaBoxManager::getMeta('description_bc_show') == metaBoxManager::CHECKED_FIELD ) ? $showBreadcrumbs = true : $showBreadcrumbs = false;
		} else if ( is_category() || is_singular() ) {  
			
			$upperDescriptionTitle= fEnv::getCategoryOption('description_text_big');
			if( empty($upperDescriptionTitle) )
			if( is_singular() ) {
				$upperDescriptionTitle = get_cat_name(fEnv::getActualCat());
			} else { 
				$upperDescriptionTitle = single_cat_title('', false);
			}
			$showBreadcrumbs = fEnv::getCategoryOption('description_breadcrumbs_show');
        } 
		
		else if( is_search() ) {
			global $s;
			$upperDescriptionTitle = fEnv::getCategoryOption('description_text_big');
			$upperDescriptionTitle = str_replace('%', $s, $upperDescriptionTitle);
			$showBreadcrumbs = false;
		} else if( is_tag() ) {// || is_author() || is_date() || is_archive() ) {
			$upperDescriptionTitle = fEnv::getCategoryOption('description_text_big');
			$upperDescriptionTitle = str_replace('%', single_tag_title('', false), $upperDescriptionTitle);
			$showBreadcrumbs = false;
		} else if( is_archive() && !is_author() ) {// || is_author() || is_date() || is_archive() ) {
			
			//var_dump( $GLOBALS );
			$upperDescriptionTitle = fEnv::getCategoryOption('description_text_big');
			if( is_day() )
				$upperDescriptionTitle = str_replace('%', get_the_date(), $upperDescriptionTitle);
			else if( is_month() ) 
				$upperDescriptionTitle = str_replace('%', get_the_date('F Y'), $upperDescriptionTitle);
			else if( is_year() ) 
				$upperDescriptionTitle = str_replace('%', get_the_date('Y'), $upperDescriptionTitle);
			$showBreadcrumbs = false;			
		} else if( is_author() ) {// || is_author() || is_date() || is_archive() ) {
			

								
			$upperDescriptionTitle = fEnv::getCategoryOption('description_text_big');
			if ( have_posts() ) {
				the_post();
				$upperDescriptionTitle = str_replace('%', get_the_author(), $upperDescriptionTitle);
				rewind_posts();
			}
			$showBreadcrumbs = false;		
		} 
		
		require get_template_directory().'/templates/description/description-upper.php';
	}
	
	public function loadLowerDescription() {
		if( is_page() || is_404()  ) {
		//	if( metaBoxManager::getMeta('description_show') != metaBoxManager::CHECKED_FIELD ) return;
			$lowerDescriptionTitle = metaBoxManager::getMeta('description_lower');
		} else if( is_search() ) {
			$lowerDescriptionTitle = fOpt::Get('translation', 'search-description-lower');
			
		} else {
			$lowerDescriptionTitle = fEnv::getCategoryOption('description_text_small');
		}
		if( empty( $lowerDescriptionTitle ) )
			$lowerDescriptionTitle = 'Hello world! Please change me in Site Preferences -> This Category/Section -> Lower Description Bar'; 
			//$lowerDescriptionTitle = fOpt::Get('header', 'descriptionbar-content-lowe');
			
		require get_template_directory().'/templates/description/description-lower.php';
	}
	
	public function loadSidebar() {
		if( is_category() ) {
			$templateInfo =  fEnv::getActualTemplateInfo() ;
			if( $templateInfo['type'] !== 'Portfolio' )
				require get_template_directory().'/templates/sidebars/sidebar.php';
		} else {
			require get_template_directory().'/templates/sidebars/sidebar.php';
		}
	}
	
	public function checkIfIs404() {
		
		global $post;
		
		
		$pageId = fOpt::Get('translation','404-page-id');
		$post = get_page( $pageId );
			setup_postdata( $post );

	}
	
	public static function getInst() {
		if( self::$_instance == null ) {
			self::$_instance = new ffPartLoader();
		}
		
		return self::$_instance;
	}
	
	
	
}