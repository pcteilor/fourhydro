<?php

//$title = ffSP::get('search title');
$prefaceTitle = ffSP::Get('template preface title');
$prefaceDescription = ffSP::Get('template preface description');


if( is_category() ) {
	$searchedTerm = single_cat_title(null, false );
}
else if( is_search() ) {
	$searchedTerm = $_GET['s'];
	
} else if ( is_tag() ) {
	$searchedTerm = single_tag_title( null, false);
	
} else if ( is_archive() && !is_category() ) {
	if( is_day() )
		$searchedTerm = get_the_time( ffOpt::get('translation time format-post-cat'));
	else if( is_month() )
		$searchedTerm = get_the_time( 'F Y');
	else if( is_year() )
		$searchedTerm = get_the_time( 'Y');
}

$prefaceTitle = ff_replace_preface( $prefaceTitle, $searchedTerm );
$prefaceDescription = ff_replace_preface( $prefaceDescription, $searchedTerm );

function ff_replace_preface( $text, $replacement ) {
	return str_replace('%s', $replacement, $text );
}