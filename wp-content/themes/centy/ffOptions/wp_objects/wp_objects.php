<?php
  
if( ! function_exists('register_post_type') ){
    exit;
}



// Add Portfolio

new ffCustomPostType('portfolio', 'Portfolio', 'Portfolio');
$t6 = new ffCustomTax('portfolio-tag', 'Portfolio Tags');
//$t6->getArgs()->set_hierarchical(true);
$t6->addSupport('portfolio');
$t5 = new ffCustomTax('portfolio-category', 'Portfolio categories', 'Portfolio category');
$t5->getArgs()->set_hierarchical(true);
$t5->addSupport('portfolio');

