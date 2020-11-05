<?php
  
if( ! function_exists('register_post_type') ){
    exit;
}

require_once dirname(__FILE__) . '/post_types/ffCustomPostType.php';
require_once dirname(__FILE__) . '/post_types/ffCustomPostTypeArgs.php';
require_once dirname(__FILE__) . '/post_types/ffCustomPostTypeLabels.php';
require_once dirname(__FILE__) . '/post_types/ffCustomPostTypeMessages.php';
require_once dirname(__FILE__) . '/post_types/ffCustomPostTypeSupports.php';

require_once dirname(__FILE__) . '/tax/ffCustomTax.php';
require_once dirname(__FILE__) . '/tax/ffCustomTaxArgs.php';
require_once dirname(__FILE__) . '/tax/ffCustomTaxLabels.php';

?>