<?php
  
if( ! function_exists('is_admin') ) { exit; }
if( is_admin() ) {
	require_once dirname( __FILE__ ) . '/ffInstall.php';
	new ffInstall();
}

