<?php

class ffWpHooks{
	static protected $instance;

	function __construct(){
		if( empty( ffWPHooks::$instance ) ){
			ffWPHooks::$instance = $this;
			$this->addHooks();
		}
	}

	private $areHooksAdded = FALSE;

	public function addHooks(){
		if( $this->areHooksAdded ){
			return;
		}

		add_action( 'add_meta_boxes', array('ffWpHooks', 'add_meta_boxes') );
		add_action( 'save_post',      array('ffWpHooks', 'save_post') );

		// Setup Admin Thumbnail Size
		if ( function_exists( 'add_theme_support' ) ) {
			add_image_size( 'admin-thumb', 50, 50, true );
		}
		// Thumbnails to Admin Post View
		add_filter('manage_posts_columns',       array( $this, 'manage_posts_columns' ),       1);
		add_action('manage_posts_custom_column', array( $this, 'manage_posts_custom_column' ), 1, 2);
		
		$this->areHooksAdded = TRUE;
	}

	// ffOptions

	static public function save_post( $ID ){
		global $_POST;
		if( isSet($_POST['action']) )
			if( 'inline-save' == $_POST['action'] )
				return;

		if( !isSet($_POST['post_ID']) ){
			return;
		}

		new ffSalWritepanels( $ID );
	}

	public static function add_meta_boxes(){

		$salWP = new ffSalWritepanels();

		if( $salWP->isWritepanelActive() ){

			$post_type = $salWP->getPostType();
			$salWPdata = $salWP->getData();

			foreach($salWPdata->getChilds() as $key=>$wpBoxData) {
				$WP_position = $wpBoxData->getParam('position');
				if( empty($WP_position) ){
					$WP_position = "advanced";
				}

				add_meta_box(
					'ffWritepanel-'.$post_type.'-'.$wpBoxData->getID(),
					$wpBoxData->getTitle(),
					array( new ffPrinterBEWP($wpBoxData) , 'printStructure'),
					$post_type,
					$WP_position
				);
			}
		}
	}
	
	// Nice thums in wpadmin->posts->view all
	
	function manage_posts_columns($defaults){
		$ret = array();
		$index = 0;
		foreach ($defaults as $key=>$value) {
			$index ++;
			if( 2 == $index ){
				$ret['ff_post_format_column'] = '';
			}
			if( 3 == $index ){
				$ret['ff_featured_column'] = __('Image','default');
			}
			$ret[$key] = $value;
		}
		return $defaults = $ret;
	}

	function manage_posts_custom_column($column_name, $id){
		if($column_name === 'ff_featured_column'){
			echo get_the_post_thumbnail( $id, array(50,30) );
		}
		if($column_name === 'ff_post_format_column'){
			$format = ffWP::get('freshformat type');
			$icon = ffOpt::get('postformat icons '.$format);
			echo '<span class="fa_icon_container"><span class="fa_icon_wrapper"><span class="fa_icon"><i class="'.$icon.'"></i><span></span></span></span></span>';
		}
	}

}