<?php
$FWORK = array(); 
/**
 * Framework is basically divided into 3 parts:
 * ============================================
 * - frontend -> its mainly wrapping the classic wordpress functions ( for example the_content() is wrapped by fPostPrinter::postContent() )
 * - backend  -> here are located all custom theme pages and options ( for example Site Options, Sidebar Manager and others )
 * - engine   -> all support functions ( pagination, widgets, gallery querying and others )
 */
// versions
require_once get_template_directory().'/framework/versions.php';	
// necessary files for properly autoloading	
require_once get_template_directory().'/framework/loadfirst/loader.php';


if( IS_USER_VERSION ) {
	fLoader::loadForEndUser();
}
else {
	if( IS_DEMO_CONTENT ) 
		fLoader::loadFolderRecursive( get_template_directory() .'/framework/demo/');
	else
		fLoader::loadFolderRecursive( get_template_directory() .'/framework/deploy/');
	
	fLoader::loadFolderRecursive( get_template_directory().'/framework/loadfirst/');
	fLoader::loadFolderRecursive( get_template_directory().'/framework/engine/');
	fLoader::loadFolderRecursive( get_template_directory().'/framework/datastructures/');
	fLoader::loadFolderRecursive( get_template_directory().'/framework/libs/');
	fLoader::loadFolderRecursive( get_template_directory().'/printers/' );
	
	if ( is_admin() ) {
		fLoader::loadFolderRecursive( get_template_directory().'/framework/backend/');
		//fLoader::loadTemplates(get_template_directory().'/templates/blog/');
		//fLoader::loadTemplates(get_template_directory().'/templates/portfolio/');
		fLoader::loadTemplates(get_template_directory().'/templates/post/');
	}
	else {
		fLoader::loadFolderRecursive( get_template_directory().'/framework/frontend/');
		fLoader::loadFolderRecursive( get_template_directory().'/framework/backend/writepanels2/');
	}
}
//if( is_admin() || isset($_GET['s'] ) ) {

	fLoader::loadTemplates(get_template_directory().'/templates/blog/');
	fLoader::loadTemplates(get_template_directory().'/templates/portfolio/');
//}


// manage widgets
add_action( 'admin_menu', 'fEnv::registerMenus' );

// manage
add_action('admin_init', 'fw_common_scripts');  
add_action('admin_init', 'fEnv::printMenuStyles');

add_action('admin_menu', 'fEnv::handleSavingFunctions');         
add_action('init', 'fEnv::registerNavigationMenu' );
fImg::DeleteCache();




function fw_common_scripts(){
	//wp_enqueue_script(rand(time(), 50),  get_template_directory_uri().'/framework/backend/includes/media_invoker/media_invoker.js');
	//wp_enqueue_script(rand(time(2), 50),  get_template_directory_uri().'/framework/backend/writepanels2/json.js');
	
	wp_enqueue_script(rand(time(25), 50),  get_template_directory_uri().'/framework/extern/colorpicker/js/colorpicker.js');
	wp_enqueue_style(rand(time(22), 50),  get_template_directory_uri().'/framework/extern/colorpicker/css/colorpicker.css');
}
     // hustle backend admin menu's
 
  function manage_admin_menu()
  {
    global $theme_name;
    // main page
  }
  
  
do_action('ff_framework_loaded');  

?>