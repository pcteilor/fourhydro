<?php
/*
Plugin Name: Freshface Importer
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: A brief description of the Plugin.
Version: 1.0
Author: freshface
Author URI: http://URI_Of_The_Plugin_Author
License: A "Slug" license name e.g. GPL2
*/

//*
add_filter('plugin_action_links', 'freshface_import_plugin_setting_links', 10, 2 );
function freshface_import_plugin_setting_links($links, $file ) {
	$this_plugin = plugin_basename(__FILE__);
	if ( $file == $this_plugin ) {

		$arr = array('attachments','taxonomies','posts','menu','widgets');
		foreach ($arr as $key=>$value) {
			$settings_link = '<br /><a href="./plugins.php?freshface_import='.$value.'"> [ '.$value.' ] </a>';
			array_push($links, $settings_link);
        }
	}
	return $links;
}
/* */

global $_GET;
if( ! empty($_GET['freshface_import']) ){
	add_action( 'admin_init', 'freshface_import', 99 );
}

function freshface_import(){
    require_once 'ffImporter.php';
    new ffImporter();
}