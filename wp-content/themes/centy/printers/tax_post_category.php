<?php

class htmlCategoryPrinter extends htmlPTPrinter {
	public function printPostClass() {
		$gallery = ffGalleryCollection::getGallery();
		if( null == $gallery->getFeaturedImage() ) echo 'col-9-9';
		else echo 'col-5-9';
	}
	

	
	public function printFeaturedImage() {
		
		$gallery = ffGalleryCollection::getGallery();
		$featuredImage = $gallery->getFeaturedImage();
		if( null == $featuredImage ) return false;
		
		$readMoreText = ffOpt::get('translation post read-more');
		$fixedHeight = ffSP::get('template fixed_height');
		
		echo '<span class="col-4-9 image">';
			echo '<img src="'.$featuredImage->image->resize(730, $fixedHeight, true).'" alt="'.$featuredImage->altText.'" />';
			echo '<span class="hover">';
				echo '<span>';
					echo $readMoreText;
				echo '</span>';
			echo '</span>';
		echo '</span>';
	}
	
	
	public function modernTitle() {
		echo '<h4>';
		echo '<a href="'.get_permalink().'">';
			the_title();
		echo '</a>';
		echo '</h4>';
	}
	
	public function modernDate() {
		$timeFormat = ffOpt::get('translation time format-post-cat-modern');
		echo '<p class="date">';
			echo get_the_date( $timeFormat );//Y,M j
		echo '</p>';
	}
    // extends htmlPostPrinter !!!
}