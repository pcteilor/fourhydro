<?php
	
	$categoryId = ffSP::get('template slider-feed');
	if( $categoryId == 'default' ) 
		$categoryId = fEnv::getActualCat();

	// Configuration
	$numberOfPosts = ffSP::get('template slider-numberofposts');
	$categories = $categoryId;
	$orderBy = 'post_date';
	$oder = 'DESC';
	
	$args = array(
		'numberposts'  => 999,
		//'category'        => 1,
		//'orderby'         => $orderBy,
		//'order'           => $oder,
		);
	
	$sliderPostsFeed = get_posts('numberposts=-1' );
//	var_dump( $sliderPostsFeed );
//	var_dump( $sliderPostsFeed );*/


	function ff_featured_blog_slider_post_get_content( $onePost ) {
		return substr($onePost->post_content,0,220 );
	}
	
	get_the_content();