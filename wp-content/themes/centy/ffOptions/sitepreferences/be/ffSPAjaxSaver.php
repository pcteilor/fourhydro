<?php

define( 'IFRAME_REQUEST' , true );

require realpath(dirname(__FILE__).'/../../../../../../wp-load.php');

if( ! function_exists('is_admin') ) { die('Function is_admin does not exist!'); }
if( ! is_user_logged_in() ) { die('You are not logged in!'); }

$user = wp_get_current_user();

if( ! in_array("administrator", $user->roles) ){
    die('You are not administrator!');
}

require_once dirname(__FILE__).'/ffSPAjaxSaverClass.php';
new ffSPAjaxSaverClass();

exit;
