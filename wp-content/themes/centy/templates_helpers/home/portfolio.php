<?php
//var_dump( ffSP::Get('portfolio-feed categories') );
$categoryId = ffSP::Get('portfolio-feed categories');
$numberposts = ffSP::Get('portfolio-feed numberposts');




$args = array(
		'posts_per_page'  => $numberposts,
		'offset'          => 0,
		'orderby'         => 'post_date',
		'order'           => 'DESC',
		'include'         => '',
		'exclude'         => '',
		'meta_key'        => '',
		'meta_value'      => '',
		'post_type'       => 'portfolio',
		'post_mime_type'  => '',
		'post_parent'     => '',
		'post_status'     => 'publish',
	'suppress_filters' => true );

if( !empty($categoryId) ) {
	$args['tax_query'] = array(
			array(
					'taxonomy' => 'portfolio-category',
					'field' => 'id',
					'terms' => $categoryId,
			),
	);//CONOPT
}

$portfolioPosts  = get_posts( $args );
$fixedPortfolioImageHeight = ffSP::get('portfolio-feed fixed_height');