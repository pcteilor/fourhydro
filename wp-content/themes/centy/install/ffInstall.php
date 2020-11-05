<?php
  
class ffInstall{
	static private $instance;
	
	protected function requireFiles(){
		require_once dirname( __FILE__ ) . '/ffGetByTitle.php';
		require_once dirname( __FILE__ ) . '/basic/plugins/install.php';
		require_once dirname( __FILE__ ) . '/basic/plugins/install-plugins-list.php';
		require_once dirname( __FILE__ ) . '/basic/revslider/install.php';
	}
////////////////////////////////////////////////////////////////////////////////
// Wordpress hooks
////////////////////////////////////////////////////////////////////////////////

	protected function runStuff(){
		//genOptionsUpgrater::init();
		revsliderInstall::addDefaultSliders();
		revsliderInstall::addDefaultStyles();
		revsliderInstall::updateFileDynamicCaptions();
	}
	
	static public function pluginsAreInstalled(){
		require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		global $ff_plugins_to_install;
		foreach ($ff_plugins_to_install as $plugin) {
			if( 1 * is_plugin_active( $plugin['ff_path'] ) ){
			}else{
				return false;
			}
		}
		return true;
	}

	public function action_wp_after_switch_theme(){
		if( ! $this->pluginsAreInstalled() ){
			$this->addDarkBackground();
			$this->addBasicInstallPlugin( 1 );
		}
	}
	
	public function action_wp_admin_init(){
		if( empty($_GET['ff_install']) ){
			return;
		}

		if( 'basic' == $_GET['ff_install'] ) {
			if( empty( $_GET['install-action'] ) ){
				return;
			}
			$action = ceil( 1 *  $_GET['install-action'] );
			if( $action < 1 ) return;
			if( $action > 4 ) return;
			$this->addDarkBackground();
			$this->addBasicInstallPlugin( $action );
		}
		if( 'full-demo-content' == $_GET['ff_install'] ) {
			$this->addDarkBackground();
			$this->addFullDemoContentInstallFrame();
		}
	}

	public function action_wp_admin_footer(){
	}

////////////////////////////////////////////////////////////////////////////////
// Class init
////////////////////////////////////////////////////////////////////////////////

	public function init(){
		ffInstall::getInstance();
	}

	function getInstance(){
		if( empty( ffInstall::$instance ) ){
			ffInstall::$instance = new ffInstall();
		}
		return ffInstall::$instance;
	}

	function __construct(){
		if( ! function_exists('is_admin') ) { exit; }
		if( ! is_admin() ) { exit; }

		$this->requireFiles();
		$this->runStuff();

		add_action( 'admin_init', array($this, 'action_wp_admin_init') );
		add_action( 'admin_footer', array($this, 'action_wp_admin_footer') );
		add_action( 'after_switch_theme', array($this, 'action_wp_after_switch_theme') );
	}
	
////////////////////////////////////////////////////////////////////////////////
// Javascript
////////////////////////////////////////////////////////////////////////////////

	function addDarkBackground(){
		wp_enqueue_script('jquery');
		wp_enqueue_script(
			  'ff_install_background_js',
			  get_template_directory_uri().'/install/install-background.js',
			  array('jquery'),
			  md5( filemtime( get_template_directory().'/install/install-background.js' ) ),
			  false  // into footer
		);
		
		wp_register_style( 'ff_install_background_css', get_template_directory_uri().'/install/install-background.css' );
		wp_enqueue_style( 'ff_install_background_css' );
	}
	
	function addFullDemoContentInstallFrame(){
		wp_enqueue_script(
			  'ff_install_demo_js',
			  get_template_directory_uri().'/install/to/install-demo.js',
			  array('ff_install_background_js'),
			  md5( filemtime( get_template_directory().'/install/to/install-demo.js' ) ),
			  false  // into footer
		);
	}
	
	function addBasicInstallPlugin( $action ){
		wp_enqueue_script(
			  'ff_install_basic_js_'.$action,
			  get_template_directory_uri().'/install/basic/plugins/js-plugins-install-'.$action.'.js',
			  array('ff_install_background_js'),
			  md5( filemtime( get_template_directory().'/install/basic/plugins/js-plugins-install-'.$action.'.js' ) ),
			  false  // into footer
		);
	}
}