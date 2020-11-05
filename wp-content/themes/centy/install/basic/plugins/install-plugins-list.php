<?php
  
global $ff_plugins_to_install;
$ff_plugins_to_install = array(
	array(
		'name'     				=> 'Contact Form 7', // The plugin name
		'slug'     				=> 'contact-form-7', // The plugin slug (typically the folder name)
		'required' 				=> true, // If false, the plugin is only 'recommended' instead of required
		'version' 				=> '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
		'force_activation' 		=> false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
		'force_deactivation' 	=> false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
	'ff_path' => 'contact-form-7/wp-contact-form-7.php',
  ),

	array(
		'name' 		=> 'Really Simple CAPTCHA',
		'slug' 		=> 'really-simple-captcha',
		'required' 	=> true,
		'force_activation' 		=> false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
	'ff_path' => 'really-simple-captcha/really-simple-captcha.php',
	),

	array(
		'name' 		=> 'Revolution Slider',
		'slug' 		=> 'revslider',
		'source'   				=> dirname(dirname( __FILE__ )) . '/revslider/revslider.zip', // The plugin source
		'required' 				=> true, // If false, the plugin is only 'recommended' instead of required
		'version' 				=> '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
		'force_activation' 		=> false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
	),

);

global $_GET;

if( ! empty($_GET['ff_install']) ){
	foreach ($ff_plugins_to_install as $key=>$value) {
		$ff_plugins_to_install[$key]['force_activation'] = true;
	}
}
