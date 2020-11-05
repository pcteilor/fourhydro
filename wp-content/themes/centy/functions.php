<?php
/**
 * Hi, thank you for purchasing our template. From this file (functions.php) is included and started the whole framework,
 * and I will do my best to comment all the files. Below are included few useful notices, please read them:
 */


/**
 * Constant Definition
 * ===================
 * - theses constants are important for proper framework set-up
 * !!!!! DO NOT CHANGE WHEN CUSTOMIZING !!!!!!
 */
add_theme_support( 'post-thumbnails' );

global $fprinter;		// printer is class common to all templates ( printing titles, time, comments and other stuff )

////////////////////////////////////////////////////////////////////////////////
// FRAMEWORK INIT
////////////////////////////////////////////////////////////////////////////////
define('THEMENAME', 'Centy');
define('THEMENAMELOW','centy');
define('CUSTOM_HOME_LOOP', 1);

// DEMO or RELEASE ?
if( isset( $_SERVER['SCRIPT_URI'] ) && strpos($_SERVER['SCRIPT_URI'],'http://demo.freshface.net/file/') !== false )
	define('IS_DEMO_CONTENT', true); //!!!!! DO NOT CHANGE !!!!!!
else if ( isset( $_SERVER['SERVER_NAME'] ) && strpos($_SERVER['SERVER_NAME'],'rawofnature.com') !== false )
	define('IS_DEMO_CONTENT', true); //!!!!! DO NOT CHANGE !!!!!!
else
	define('IS_DEMO_CONTENT', false);
/*
if( strpos($_SERVER['SERVER_NAME'],'localhost') !== false )
	define('IS_DEMO_CONTENT', true);//
else 
	define('IS_DEMO_CONTENT', false);*/

//define('IS_DEMO_CONTENT', false);
define ('IS_USER_VERSION', false);

define('DEFAULT_CATEGORY_TEMPLATE', 'blog/blog-sidebar.php');
define('DEFAULT_SINGLE_TEMPLATE', 'single-blog/single-sidebar.php');

/**
 * !!!!AUTHOR DEFINITION!!!!
 * if you want to change the themename and author for your client, do it here NOT in "Constant Definition" :)
 */
define('CUSTOM_THEMENAME', 'Centy');
define('CUSTOM_AUTHORNAME', 'freshface');

if( file_exists(dirname(__FILE__).'/ffOptions/core/ff.php') ){
    require_once dirname(__FILE__).'/ffOptions/core/ff.php';
}

require get_template_directory().'/framework/init.php';

add_theme_support( 'automatic-feed-links' );

////////////////////////////////////////////////////////////////////////////////
// SHOW MYSQL ERRORS
////////////////////////////////////////////////////////////////////////////////
global $wpdb;
$wpdb->show_errors();

////////////////////////////////////////////////////////////////////////////////
// Theme installation
////////////////////////////////////////////////////////////////////////////////

if( function_exists('is_admin') and is_admin() ){
	if( file_exists( dirname( __FILE__ ) . '/install/install.php' ) ){
		require_once dirname( __FILE__ ) . '/install/install.php';
	}
}

////////////////////////////////////////////////////////////////////////////////
// MENU REGISTRATION
////////////////////////////////////////////////////////////////////////////////
fEnv::addNavigationMenu( __('Navigation', 'lcp-lang'), 'navigation');
fEnv::addNavigationMenu( __('Footer', 'lcp-lang'), 'footer');

////////////////////////////////////////////////////////////////////////////////
// CUSTOM FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

if ( ! isset( $content_width ) ) $content_width = 960;
function ffgtd() {
	return 'wgenglish';
}

 function ff_register_footer_sidebars() {
 	$footerSidebars = ffOpt::Get('footer widgetized-areas');
 	
 	if( empty($footerSidebars ) ) return;
 	
 	foreach( $footerSidebars as $sidebarCount=> $oneSidebar ) {
 		if( $sidebarCount == 0 ) continue;
 		$width = $oneSidebar->get('width');
 		
 		
 		ff_register_default_sidebar('Footer Sidebar '.$sidebarCount.' - '.$width , 'footer-'.$sidebarCount, $width);
 	}
 }
 
 function ff_register_other_sidebars() {
 	ff_register_default_sidebar( 'Blog Sidebar', 'blog' );
 	ff_register_default_sidebar( 'Page Sidebar', 'page' );
 }
 ff_register_footer_sidebars();
 ff_register_other_sidebars();
 
 function ff_register_default_sidebar($name, $id, $size = null){
 	register_sidebar(
 	array(
 	'name' => __( $name , ffgtd()),
 	'id' => THEMENAMELOW . '-' . $id,
 	'description' => '',
 	'before_widget' => '<div id="%1$s" class="widget %2$s">',
 	'before_title'  => '<h5>',
 	'after_title'   => '</h5>',
 	'after_widget'  => '</div>',
 	)
 	);
 }


  $custom_sidebar_collection = new fSidebarCollection();
  foreach( $custom_sidebar_collection->getSidebars() as $id => $name ) {
    ff_register_default_wrapped_sidebar( $name, 'custom'.$id, 'This is a custom sidebar' );
  }

add_action( 'after_setup_theme', 'lcp_setup' );
  
function lcp_setup()
{
  // suport functions
  add_theme_support( 'nav-menus' );

}

require dirname(__FILE__).'/ffOptions/wp_objects/ff.php';
require dirname(__FILE__).'/ffOptions/wp_objects/wp_objects.php';

add_action('wp_head', 'print_header_styles', 999 );
function print_header_styles() {
	print_custom_css();
}

add_action('wp_footer', 'print_footer_styles', 999);
function print_footer_styles() {
	print_custom_javascript( 'customcode custom-javascript' );
	print_custom_javascript( 'customcode custom-tracking' );
}

function print_custom_javascript( $opt_path ) {
	$js = ffOpt::Get( $opt_path );
	$js = trim($js);
	if(empty($js)) return;

	if( strpos($js, '<script') === false ) {
		$js = '<script type="text/javascript">'.$js.'</script>';
	}

	echo $js;
}

function print_custom_css() {
	$css = ffOpt::Get('customcode custom-css');
	$css = trim($css);
	if(empty($css)) return;

	if( strpos($css, '<style') === false ) {
		$css = '<style type="text/css">'.$css.'</style>';
	}
	
	echo $css;
}

remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 99);


function ff_is_portfolio() {
	global $wp_query;
	if( isset($wp_query->tax_query->queries[0]['taxonomy']) && $wp_query->tax_query->queries[0]['taxonomy'] == 'portfolio-category') {
		return true;
	}
	return false;
}

function ff_layout_class() {
	if( ff_is_portfolio() ) {
		echo 'class="ui_filter"';
	}
}

function ff_get_body_data_page() {
	global $wp_query;
	if( isset($wp_query->tax_query->queries[0]['taxonomy']) && $wp_query->tax_query->queries[0]['taxonomy'] == 'portfolio-category') {
		echo 'portfolio';
	} else if ( isset($wp_query->tax_query->queries[0]['taxonomy']) && $wp_query->tax_query->queries[0]['taxonomy'] == 'category') {
		$template_type = ffSP::get('template template');
		
		if( $template_type == 'modern')
			echo 'blog';
		else
			echo 'list';
	} else if( is_singular() && get_post_type() == 'post') {
		echo 'post';
	} else if( is_singular() && get_post_type() == 'portfolio' ) {
		echo 'detail';
	}
	else if ( basename(get_page_template()) == 'page-contact.php' )
		echo 'contact';
	
	else if ( basename(get_page_template()) == 'page-about.php' )
		echo 'about';	
	
	else if( (is_archive() && !is_category()) || is_search()  )
		echo 'list';
	else if( is_attachment() ) 
		echo 'detail';
	else 
		echo 'home';
	
	//if( is_page() &&)
}

function ff_nav_menu_does_not_exists() {
	echo '<span style="red">NAV MENU DOES NOT EXISTS</span>';
}

add_filter('show_admin_bar', '__return_false');

function ff_get_body_data_boxed() {
	echo ffOpt::get('skins layout');
}

function ff_post_nav_link() { 
	return posts_nav_link();
}

function ff_link_pages() {
	return wp_link_pages();
}

function ff_paginate_comment_link() {
	return paginate_comments_links();
}


function ff_body_background_style() {
	if( 'true' == ffOpt::get('skins layout') ) {
		$bgId = ffOpt::get('skins background');
		( $bgId == 9 ) ? $ext = '.jpg' : $ext = '.png';
		$bgUrl = get_template_directory_uri().'/lib/switcher/img/boxed/0'.$bgId.$ext;
		
		
		
		echo 'background-image:url('.$bgUrl.');';
	}
}