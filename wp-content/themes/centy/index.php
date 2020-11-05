<?php 
get_header();
 		if( !ffSP::get('category-feed-show')) {
			ffTemplater::requireSlider(); 
			ffTemplater::requireSlogan(); 
			ffTemplater::requireHomePortfolio();
			//ffTemplater::requireTestimonials(); 
			//ffTemplater::requireQuote();//*/
 		} else {
 			ffTemplater::requireLoopPost();
 		}	 
get_footer();
