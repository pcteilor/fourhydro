<?php 
	if( !empty( $portfolioPosts ) ) { 
?>
          <!-- RELATED PROJECTS -->

            <div id="related">
                <div class="container">
                    <h5>
                        <?php echo ffOpt::get('translation post related-projects'); ?>
                    </h5>
                    <div class="grid">
                        
<?php

							$counter = 1;
							$postCount = count($portfolioPosts );
							
							foreach( $portfolioPosts as $onePost ) {
								if( $counter%3 == '1')
									echo '<ul class="row items fade">';
															
								$gallery = ffGalleryCollection::getGallery( $onePost->ID );
								$featuredImage = $gallery->getFeaturedImage();
?>
                            <!-- PROJECT -->

                            <li class="col-1-3">
                                <a href="<?php echo get_permalink( $onePost->ID); ?>">
<?php 
                                	if( null !== $featuredImage ) {
										$height = ffSP::get('template fixed_height');
?>
                                    <span class="image">
                                        <img
                                            src="<?php echo $featuredImage->image->resize(940, $height, true); ?>"
                                            alt="<?php echo $featuredImage->altText; ?>"
                                        />
                                    </span>
<?php 
									} // END if( null !== $featuredImage ) {
?>                                    
                                    <span class="description">
                                        <h4>
                                            <?php echo $onePost->post_title; ?>
                                        </h4>
                                        <p>
                                            <?php echo ffWP::get('wpsmalldescription description', $onePost->ID); ?>
                                        </p>
                                    </span>
                                </a>
                            </li>
<?php 						
								if( $counter%3 == 0 || $counter == $postCount ) echo '</ul>'; 
								$counter++;
							} // END foreach( $portfolioPosts as $onePost ) {
?>

                        
                    </div>
                </div>
            </div>
<?php 
	} // if( !empty( $portfolioPosts ) ) { 
?>