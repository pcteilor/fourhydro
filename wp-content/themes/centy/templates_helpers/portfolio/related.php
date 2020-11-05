<?php 


global $post;
global $wpdb;
$sql = "SELECT term_taxonomy_id FROM $wpdb->term_relationships WHERE object_id=$post->ID";

$results =  $wpdb->get_results( $sql );
$term_taxonomy_id= (!empty($results) && isset( $results[0] ) && isset( $results[0]->term_taxonomy_id ) ) ? $results[0]->term_taxonomy_id : null;

$relatedPosts = '';

$args = array(
		'posts_per_page'  => 3,
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

if( !empty( $categoryId ) ) {
	// $categoryId is number of category, use 0 - "zero" for all categories
	$args['tax_query'] = array(
			array(
					'taxonomy' => 'portfolio-category',
					'field' => 'id',
					'terms' => $term_taxonomy_id,
			),
	);
}
$portfolioPosts = null;
$portfolioPosts  = get_posts( $args );



//var_dump(ffSP::get_term_taxonomy() );
//die();