<?php
/**
 * Templater class is loading all custom made templates
 */

class ffTemplater {
	
	public static function get_template_part_WP( $dir, $helperDir ) {
		
	}
	
	public static function requireAttachment() {
		self::requireTemplate('page', 'attachment');
	}
	public static function requireFooterBottom() {
		//var_dump(  ((int)ffOpt::Get('bottom-text-show') + (int)ffOpt::Get('bottom-menu-show') + (int)ffOpt::Get('bottom-social-show')) );
		if( ((int)ffOpt::Get('footer bottom-text-show') + (int)ffOpt::Get('footer bottom-menu-show') + (int)ffOpt::Get('footer bottom-social-show')) >= 1 )
			self::requireTemplate('footer', 'footer-bottom');
	}
	public static function portfolioSingleRelated() {
		self::requireTemplate('portfolio', 'related');
	}
	
	public static function requireBlogPostComments() {
		if( comments_open() )
			comments_template( '/templates/comments/blog.php');
	}
	
	public static function portfolioRequestButton() {
		( is_singular() ) ? $namespace = 'request-single' : $namespace = 'request-category';
		 
		if( ffSP::get('template '.$namespace.' request-show') == 1 )
			self::requireTemplate('portfolio', 'request');
	}
	
	public static function requirePagePreface() {
		if( ffWP::get('wppreface show'))
			self::requireTemplate('page', 'preface');
	}
	
	public static function requirePortfolioPreface() {
		global $ffAllTags;
		self::requireTemplate('portfolio', 'preface');
	}
	
	public static function requireBlogSidebar() {

		if( ( ffSP::Get('sidebar show-sidebar') == 1 ) && ( is_category() || is_single() ) && ( !is_date() && !is_search()  )  ) {
			
			self::requireTemplate('blog', 'sidebar');
		}
	}
	
	public static function requirePageComments() {
		if( comments_open() && ffWP::get('wppagesettings comments-show') )
			comments_template( '/templates/comments/page.php');
	}
	
	public static function requirePageSidebar() {
		if( $showSidebar = ffWP::get('wppagesettings sidebar-show') )
			self::requireTemplate('page', 'sidebar');
	}
	
	public static function requireFooterTop() {
		self::requireTemplate('footer', 'footer-top');
	}
	
	public static function requireTemplate( $type, $filename ) {
		global $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID, $fprinter;
		$slug = 'templates/'.$type.'/'.$filename;
		//do_action( "get_template_part_{$slug}", $slug, $name );
		do_action( "get_template_part_{$slug}", $slug, '' );

		if( file_exists(get_template_directory().'/templates_helpers/'.$type.'/'.$filename.'.php') )
			require get_template_directory().'/templates_helpers/'.$type.'/'.$filename.'.php';
		
		require get_template_directory().'/templates/'.$type.'/'.$filename.'.php';
		//$dir = 'templates/'.$type.'/'.$filename;
		//$helperDir = get_template_directory().'/templates_helpers/'.$type.'/'.$filename.'.php');
		//self::get_template_part_WP($dir, $helperDir);
		/*global $fprinter;
		if( file_exists(get_template_directory().'/templates_helpers/'.$type.'/'.$filename.'.php') )
			require get_template_directory().'/templates_helpers/'.$type.'/'.$filename.'.php';
		global $wp_query;
		$wp_query->set('fprinter', $fprinter);
		get_template_part('templates/'.$type.'/'.$filename);*/
	//	require get_template_directory().'/templates/'.$type.'/'.$filename.'.php';
	}
	
	public static function requireSlider() {
		self::requireTemplate('home', 'slider');
	}
	
	public static function requireSlogan() {
		if( ffSP::get('slogan show') == true ) 
			self::requireTemplate('home', 'slogan');
	}
	
	public static function requireHomePortfolio() {
		if( ffSP::get('portfolio-feed show') == true )
			self::requireTemplate('home', 'portfolio');
	}
	
	public static function requireTestimonials() {
		if( ffSP::get('testimonials show') == true )
			self::requireTemplate('home', 'testimonials');
	}
	
	public static function requireQuote() {
		if( ffSP::get('request show') == true )
			self::requireTemplate('home', 'quote');
	}

	public static function requireNavigation() {
		$position = ffOpt::get('header logo navigation-position');
		self::requireTemplate('navigation', 'navigation-'.$position);
	}
	
	public static function requireLoopPost() {
		global $fprinter;
		$template_type = ffSP::get('template template');
		
		self::requireTemplate('blog', $template_type);
	}
	
	public static function requireArchiveLoopPost() {
		self::requireTemplate('blog', 'list');
	}

	public static function requireBlogSinglePreface() {
		if( ffWP::get('wpintro show'))
			self::requireTemplate('blog', 'preface-single');
	}
	
	public static function requireBlogPreface() {
		if( ffSP::get('template preface-show'))
			self::requireTemplate('blog', 'preface');
	}
	
	public static function requireNoPosts() {
		self::requireTemplate('blog', 'noposts');
	}
	
	public static function requireSinglePost() {
		self::requireTemplate('blog','single');
	}
	
	public static function requireBlogModernFeaturedSlider() {
		if( ffSP::get('template slider-show') == 1)
			self::requireTemplate('blog', 'modern-featured-slider');
	}
	
	public static function requirePageDefault() {
		self::requireTemplate('page', 'page');
	}
	
	public static function requirePageContact() {
		
		self::requireTemplate('page', 'contact');
	}
	
	public static function requirePageAbout() {
		self::requireTemplate('page', 'about');
	}	
	
	public static function requirePortfolio() {
		self::requireTemplate('portfolio', 'portfolio');
	}
	
	public static function requireSinglePortfolio() {
		self::requireTemplate('portfolio', 'single');
	}
}


