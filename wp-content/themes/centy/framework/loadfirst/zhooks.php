<?php 
add_action('template_redirect', 'framework_init_printers');
 function framework_init_printers() {
 	global $fprinter;
		
	$fprinter = fEnv::createHtmlPrinter();
	
	//($fprinter->formatedDate());
 }
  
$themeActivator = new fThemeActivator();
$themeActivator->checkActivation();


class fThemeActivator {
	public function checkActivation() {
		$is_themes = strpos( $_SERVER['REQUEST_URI'], 'themes.php');
			if ( is_admin() && isset($_GET['activated'] ) && $is_themes !== false ) { 
			$has_been_activated = fOpt::Get('activation', 'has_been_activated');
			if( $has_been_activated == null ) {
				$this->activationFirst();
			}
			else {
				$this->activationStd();  
			}
		} 		
	}
	
	private function activationFirst() {
		$this->importAllStartingData();
	}
	
	private function importAllStartingData() {
	}
	
	private function _createHomepage() {
		$firstPostName = 'First Homepage Page After Installation';
		if( get_page_by_title($firstPostName) == null ) {
		$my_post = array(
				'post_title'    => $firstPostName,
				'post_content'  => '[templatebuilder name="aboutus"]',
				'post_status'   => 'publish',
				'post_author'   => 1,
				'post_type'     => 'page'
		);
		
		// Insert the post into the database
		$pageId = wp_insert_post( $my_post );
		fOpt::Set('homepage', 'content-page', $pageId );
		}
	}
	
	private function activationStd() {

	}
	
	private function importCategoryManager() {
		
	}
	
	private function importSliderManager() {
		
	}
	
	private function importPageBuilder() {
		
	}
}

//add_action('create_category', 'framework_create_cat');
//add_action('delete_category', 'framework_delete_cat');
function framework_delete_cat( $cat_id){
	/*fOpt::DeleteNamespace('cm-cat-opt-'.$cat_id);
	fOpt::DeleteNamespace('cm-sin-opt-'.$cat_id);*/
}
function framework_create_cat( $cat_id ) {
	/*$data = fcreate_category_options_store();

	$cat_ns = 'cm-cat-opt-'.$cat_id;
	$sin_ns = 'cm-sin-opt-'.$cat_id;
	
	$cat_op = $data->getCategoryOptions();
	foreach( $cat_op  as $one_opt ) {
			 
		if( $one_opt['id'] != null && fOpt::Get($cat_ns, $one_opt['id'] ) == null) {
			
			fOpt::Set($cat_ns, $one_opt['id'], $one_opt['std']);
		}
	} 
	
	$sin_op = $data->getSingleOptions();
	foreach( $sin_op  as $one_opt ) {
		if( $one_opt['id'] != null && fOpt::Get($sin_ns, $one_opt['id'] ) == null )
			fOpt::Set($sin_ns, $one_opt['id'], $one_opt['std']);
	} 	*/
}
//add_action('shutdown', 'fill_category_manager');
function fill_category_manager() {
	/*$cats = get_all_category_ids();
	foreach( $cats as $one_cat ) {
		echo $one_cat;
		framework_create_cat( $one_cat );
	}*/
}

add_action('wp_footer', 'some_my_shit');
function some_my_shit( ) {
	fEnv::printFooterContent();
}

function theme_queue_js(){
	
	
	if (!is_admin()){
		if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
}
add_action('get_header', 'theme_queue_js');


function file_get_contents_utf8($fn) { 
     $content = file_get_contents($fn); 
      return mb_convert_encoding($content, 'UTF-8', 
          mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true)); 
} 

