<?php 
	if( !empty($portfolioPosts) ) {
?>

<!-- WORKS -->

            <div id="works">
                <div class="container">
                    <ul class="seamless grid items fade">
<?php 
					foreach( $portfolioPosts as $onePost ) {
?>
                        <!-- WORK -->

                        <li class="col-1-3">
                            <a href="<?php echo get_permalink( $onePost->ID); ?>">
                                <span
                                    class="image ui_slider"
                                    data-ui_slider_auto="false"
                                >
                                    <ul>
<?php 
										
										$gallery = ffGalleryCollection::getGallery( $onePost->ID );
										$featuredImage = $gallery->getFeaturedImage();
										$gallery->loadGalleryFromFFMeta('wpgallery items');
										
									
										if( null !== $featuredImage ) {
											echo '<li>';
												echo '<img src="'.$featuredImage->image->resize(768, $fixedPortfolioImageHeight, true).'" alt="'.$featuredImage->altText.'" />';
											echo '</li>';
										}
										
										foreach( $gallery as $oneImage ) {
											echo '<li>';
												echo '<img src="'.$oneImage->image->resize(768, $fixedPortfolioImageHeight, true).'" alt="'.$oneImage->altText.'" />';
											echo '</li>';
										}
?>

                                    </ul>
                                </span>
                                <span class="description">
                                    <h4>
<?php 
										echo get_the_title( $onePost->ID );
?>
                                    </h4>
                                    <p>
<?php 
										echo ffWP::get('wpsmalldescription description', $onePost->ID);
?>
									</p>
                                </span>
                            </a>
                        </li>

<?php 
					} // END foreach( $portfolioPosts as $onePost )
?>                        
                    </ul>
                </div>
            </div>
<?php 
	}
?>