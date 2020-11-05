<?php

// NO CACHE !!!

header( 'Expires: Sat, 26 Jul 1997 05:00:00 GMT' );
header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT' );
header( 'Cache-Control: no-store, no-cache, must-revalidate' );
header( 'Cache-Control: post-check=0, pre-check=0', false );
header( 'Pragma: no-cache' );

// stupid WP :(

define( 'IFRAME_REQUEST' , true );

require realpath(dirname(__FILE__).'/../../../../../../wp-load.php');

if( ! function_exists('is_admin') ) { die('Function is_admin does not exist!'); }
if( ! is_user_logged_in() ) { die('You are not logged in!'); }

$user = wp_get_current_user();

if( ! in_array("administrator", $user->roles) ){
    die('You are not administrator!');
}

require_once dirname(__FILE__).'/ffSPAjaxLoaderClass.php';
new ffSPAjaxLoaderClass();

exit;
