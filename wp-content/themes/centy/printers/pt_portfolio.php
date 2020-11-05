<?php

class htmlPortfolioPrinter extends htmlPTPrinter {

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* PORTFOLIO - SORTABLE STUFF
/*----------------------------------------------------------------------------*/
/******************************************************************************/

    protected $tag_slug = 'portfolio-tag';

    // rest is in parent classes
    
    public function printFeaturedImage() {
    	
    	$gallery = ffGalleryCollection::getGallery();
    	$featuredImage = $gallery->getFeaturedImage();
    	$height = ffSP::get('template fixed_height');
    	if( null === $featuredImage ) return false;
    	
		echo '<span class="image">';
			echo '<img src="'.$featuredImage->image->resize(940, $height, true).'" alt="'.$featuredImage->altText.'" />';
		echo '</span>';
    }
    public function title() {
    	echo '<h4>';
    		echo get_the_title();
    	echo '</h4>';
    }
    
    
    
    public function getSocialLinks() {
    	if ( !ffOpt::get('social sharing-enable ')) return '';
    
    	$sharer = new ffSocialSharer();
    	if( ffOpt::get('social sharing-enable-facebook') )
    		$sharer->addPossibleLink('facebook');
    
    	if( ffOpt::get('social sharing-enable-twitter') )
    		$sharer->addPossibleLink('twitter');
    
    	if( ffOpt::get('social sharing-enable-google') )
    		$sharer->addPossibleLink('googleplus');
    
    	$title = get_the_title();
    	$url = get_permalink();
    	$socialLinks = $sharer->getShareLinks($url, $title);
    
    
    	$output = '';
    	$output .= '<ul class="float social">';
    	foreach( $socialLinks as $oneLink ) {
    		if( $oneLink->type == 'googleplus' )
    			$oneLink->type = 'google-plus';
    		$output .= '<li>';
    		$output .= '<a href="'.$oneLink->url.'" class="icon-'.$oneLink->type.'-sign">';
    		$output .= '</a>';
    		$output .= '</li>';
    			
    			
    	}
    	$output .= '</ul>';
    	echo $output;
    
    }
    
    public function printSingleSlider() {
    	/**
                        <!-- SLIDE -->

                        <li>
                            <img
                                src="photos/detail/01.jpg"
                                alt=""
                            />
                        </li>
    	 */
    	$gallery = ffGalleryCollection::getGallery();
    	
    	$featuredImage = $gallery->getFeaturedImage();
    	$gallery->loadGalleryFromFFMeta('gallery items');
    	
    	
    	if( null !== $featuredImage ) {
    		$this->_printOneSlide( $featuredImage );
    	}
    	
    	foreach( $gallery as $oneImage ) {
    		$this->_printOneSlide( $oneImage );
    	}
    	
    }
    
    private function _printOneSlide( $image ) {
    	$height = ffSP::get('template fixed_height_featured');
    	echo '<!-- SLIDE -->';
    	echo '<li>';
    		echo '<img src="'.$image->image->resize(940, $height, true).'" alt="'.$image->altText.'" />';
    	echo '</li>';
    }

}