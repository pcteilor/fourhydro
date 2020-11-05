<?php
  
class fullInstalParts{
	protected $last_function = 'final_check';

	protected $steps = array(
		'attachments' => 'Attachments',
		'taxonomies'  => 'Categories, Tags',
		'posts'       => 'Posts, Pages, Custom posts',
		'menu'        => 'Navigation Menu',
		'widgets'     => 'Widgets',
		'options'     => 'Settings and options',
		'final_check' => 'Final check',
	);
	
	function __construct(){
        require_once 'ffImporter/ffImporter.php';
		$this->printInfo();
	}
	
	function printInfo(){

		header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

		echo "<!DOCTYPE html><head><meta charset='utf-8' />";
		echo "<link rel='stylesheet' href='".get_template_directory_uri()."/install/to/install-demo.css' type='text/css'>";
		echo "<style type='text/css'>";
		echo "</style>";
		echo "</head><body>";
		//readfile( dirname(__FILE__) . '/install-demo.css' );

		$installed = 1 * ffOpt::GetDBDirect('fullthemeinstall', $this->last_function );

		$ready_before = 1;

		if( empty($installed) ){
			global $_GET;
			if( empty($_GET['installation']) ){

				$ready_before = 0;

				echo '<div class="warning"><p>';
				echo 'The Full Installation is meant for <strong>empty sites only</strong> because it can overwrite/delete your existing content or settings. There is no going back after you install it.';
				echo '<br /><br />';
				echo 'But if you are an experienced developer and are absolutely sure that you want to install the Full Installation over an existing site for whatever reason, then we suggest you <strong>backup</strong> your MySQL database before running the Full Installation.';
				echo '<br /><br />';
				echo 'NOTE: We cannot be held responsible for any data loss or problems resulting from installing the Full Installation over an existing site.';
				echo '</p></div>';
				echo '</body></html>';
				return;

			}else{
				echo '<div class="warning"><p>DO NOT leave this page until the installation has finished.</p></div>';
			}
		}
		

		$installFunction = '';

		foreach ($this->steps as $function => $description ) {
			$installed = 1 * ffOpt::GetDBDirect('fullthemeinstall', $function );

			if( $installed ){
				echo "<p class=ready>$description</p>";
			}else{
				if( $ready_before ){
					echo "<p class=activating>$description</p>";
					$ready_before = 0;
					$installFunction = $function;
				}else{
					echo "<p class=not_ready>$description</p>";
				}
			}
		}

		echo "\n";
		echo str_repeat(" ", 20480);
		echo "\n";

		if( empty( $installFunction ) ){
			//echo 'all installed';
		}else{
			ob_start();
			$this->$installFunction();
			$ob = ob_get_contents();
			ob_end_clean();
			
			if( empty( $ob ) ) {
				echo '<script>window.setTimeout(function(){location.reload();}, 200);</script>';
			}else{
				echo '<h1>Something WRONG ^$@#@^#^!#</h1>';
				echo $ob;
			}
		}
		
		echo '</body></html>';
	}
	
	function attachments(){
		//require_once dirname( __FILE__ ) . '/data/data-images.php';
		$importer = new ffImporter();
		$importer->import('attachments');

		ffOpt::SetDBDirect('fullthemeinstall', 'attachments', 1 );
	}

	function taxonomies(){
		$importer = new ffImporter();
		$importer->import('taxonomies');

		ffOpt::SetDBDirect('fullthemeinstall', 'taxonomies', 1 );
	}

	function posts(){
		$importer = new ffImporter();
		$importer->import('posts');

		ffOpt::SetDBDirect('fullthemeinstall', 'posts', 1 );
	}

	function menu(){
		$importer = new ffImporter();
		$importer->import('menu');

		ffOpt::SetDBDirect('fullthemeinstall', 'menu', 1 );
	}

	function widgets(){
		$importer = new ffImporter();
		$importer->import('widgets');

		ffOpt::SetDBDirect('fullthemeinstall', 'widgets', 1 );
	}

	function options(){
		// Conecting menus
		ffOpt::SetDBDirect('fullthemeinstall', 'options', 1 );

		global $wpdb;
		$r = mysql_query( "SELECT `term_id` FROM ".$wpdb->terms." WHERE `name` = 'navigation'" );
		$row = mysql_fetch_array( $r );
		if( empty($row) ) return;
		if( empty($row['term_id']) ) return;
		$navID = $row['term_id'];

		$menus = array (
			0 => "",
			'nav_menu_locations' => array (
				'navigation' => $navID,
			)
		);

		update_option( 'theme_mods_'.THEMENAMELOW, $menus );
	}
	
	function final_check(){
		ffOpt::SetDBDirect('fullthemeinstall', 'final_check', 1 );
	}

}