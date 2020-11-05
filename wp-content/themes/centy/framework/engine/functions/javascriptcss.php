<?php
function ff_include_all_scripts() {	
	
	/*******************************************************************************
	 * HELPERS
	*******************************************************************************/

	$turl = get_template_directory_uri();
	$colorSkin = ffOpt::get('skins color');
	$switcher = IS_DEMO_CONTENT;
	
	/*******************************************************************************
	 * HEADER
	*******************************************************************************/
/*
	<link href="<?php echo get_template_directory_uri(); ?>/css/reset.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/css/grid.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/css/awesome.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/css/animations.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/lib/revolution/css/revolution.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/lib/bxslider/jquery.bxslider.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/lib/fancybox/jquery.fancybox.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/lib/switcher/css/switcher.css" rel="stylesheet" />
	<link href="<?php echo get_template_directory_uri(); ?>/css/main.css" rel="stylesheet" /> */
	
	// STYLES
	wp_enqueue_style( 'cn-reset', $turl.'/css/reset.css' );
	wp_enqueue_style( 'cn-grid', $turl.'/css/grid.css' );
	wp_enqueue_style( 'cn-awesome', $turl.'/css/awesome.css' );
	wp_enqueue_style( 'cn-animations', $turl.'/css/animations.css' );
	wp_enqueue_style( 'cn-bxslider-plugin', $turl.'/lib/bxslider/jquery.bxslider.css' );
	wp_enqueue_style( 'cn-fancybox', $turl.'/lib/fancybox/jquery.fancybox.css' );
	wp_enqueue_style( 'cn-main', $turl.'/css/main_'.$colorSkin.'.css' );
	//wp_enqueue_style( 'cn-main', $turl.'/css/main.css' );
	if ($switcher)
		wp_enqueue_style( 'cn-switcher-plugin', $turl.'/lib/switcher/css/switcher_'.$colorSkin.'.css' );

	if( is_home() ) {
		//wp_enqueue_style( 'rw-slider', $turl.'/templates/slider/'.ffTemplater::getSliderType().'.css');
	}

	// HOMEPAGE ONLY
	if( is_home() ) {
		//wp_enqueue_style( 'rw-home', $turl.'/templates/home/home-1.css' );
		//wp_enqueue_style( 'rw-message', $turl.'/templates/home/message-1.css' );
	}

	// SINGLE PAGE
	if( is_page() ) {
			
	}
	// SINGLE BLOG & PORTFOLIO
	else if( is_singular() ) {
		//var_dump( get_post_type());
		//die();
		//$single_template = str_replace('.php', '.css', fEnv::getActualTemplate() );
		//wp_enqueue_style( 'rw-single', $turl.'/templates/'.$single_template );
	}
	// ALL THE CATEGORY
	else {
		//$category_template = str_replace('.php', '.css', fEnv::getActualTemplate() );
		//wp_enqueue_style( 'rw-category', $turl.'/templates/'.$category_template );
	}

	
	
	// SCRIPTS
	
	/*******************************************************************************
	 * FOOTER
	*******************************************************************************/
	if ( is_singular() ) wp_enqueue_script( 'comment-reply' );
	
	wp_enqueue_script('cn-respond', $turl.'/js/include/respond.js', false, false, true );
	wp_enqueue_script('cn-include', $turl.'/js/include/retina.js', false, false, true );
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-ui-core');
	wp_enqueue_script('cn-jquery-mobile', $turl.'/js/include/jquery.mobile.js', false, false, false );
	wp_enqueue_script('cn-browser', $turl.'/js/include/browser.js', false, false, true );
	wp_enqueue_script('cn-scale', $turl.'/js/include/scale.js', false, false, true );
	wp_enqueue_script('cn-quicksand', $turl.'/js/include/quicksand.js', false, false, true );
	wp_enqueue_script('cn-tinysort', $turl.'/js/include/tinysort.js', false, false, true );
	wp_enqueue_script('cn-path', $turl.'/js/include/caroufredsel.js', false, false, true );
	wp_enqueue_script('cn-bxslider', $turl.'/lib/bxslider/jquery.bxslider.min.js', false, false, true );
	wp_enqueue_script('cn-fancybox', $turl.'/lib/fancybox/jquery.fancybox.pack.js', false, false, true );
	wp_enqueue_script('cn-main', $turl.'/js/main.js', false, false, true );
	if ($switcher)
		wp_enqueue_script('cn-switcher', $turl.'/lib/switcher/js/switcher.js', false, false, true );
}

add_action('wp_enqueue_scripts', 'ff_include_all_scripts'); // For use on the Front end (ie. Theme)

function ff_include_all_scripts___theme_skinaccent() {
	wp_enqueue_style( 'cn-revslider-responsive', get_template_directory_uri() . '/css/revslider_responsive.css' );
}

add_action('wp_enqueue_scripts', 'ff_include_all_scripts___theme_skinaccent', 11);
