<?php

	//var_dump( $sliderPostsFeed );

	//var_dump( get_posts() );
	if( !empty($sliderPostsFeed) ) {
?>
<div id="featured">
                <div
                    class="container ui_slider"
                    data-ui_slider_mode="horizontal"
                >
                    <ul>
<?php
					foreach( $sliderPostsFeed as $onePost ) {
						$postGallery = ffGalleryCollection::getGallery($onePost->ID);
						$featuredImage = $postGallery->getFeaturedImage();
?>
						<!--  POST -->
                        <li class="grid">
                            <div class="row">
                                <div class="col-1-2">
                                    <?php
                                    	if( null != $featuredImage ) {
											echo '<img src="'.$featuredImage->image->resize(768,391, true).'" alt="'.$featuredImage->altText.'" />';
										}
                                    ?>
                                </div>
                                <div class="col-1-2 content post-content">
                                    <h1>
                                    <a href="<?php  echo get_permalink( $onePost->ID); ?>">
                                        <?php echo $onePost->post_title; ?>
                                        </a>
                                    </h1>
                                    
                                    <p class="date">
                                        <?php echo date( ffOpt::get('translation time format-post-cat-modern'), strtotime($onePost->post_date_gmt) ); ?>
                                    </p>
                                    <p>
                                        <?php echo ff_featured_blog_slider_post_get_content( $onePost ); ?>
                                    </p>
                                    <a
                                        href="<?php echo get_permalink( $onePost->ID); ?>"
                                        class="ui_button"
                                    >
                                        <?php echo ffOpt::get('translation post read-more'); ?>
                                    </a>
                                </div>
                            </div>
                        </li>
<?php
					}	// END FOREACH
?>
                    </ul>
                </div>
            </div>
<?php
	}
?>