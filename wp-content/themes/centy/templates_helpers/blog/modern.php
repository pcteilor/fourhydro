<?php


$ffAllTags = null;
ob_start();
	$counter = 0;
	if ( have_posts() ) : while ( have_posts() ) : the_post();
		$allTagsForOnePost = get_the_tags();
		
		$currentPostFilterValue = '';
		if( !empty ($allTagsForOnePost ) ) {
			foreach( $allTagsForOnePost as $oneTag ) {
				$ffAllTags[$oneTag->term_id] = $oneTag;
					
				$currentPostFilterValue .= $oneTag->term_id;
				if( $oneTag !== end( $allTagsForOnePost ) )
					$currentPostFilterValue .= ',';
			}
		}
?>
                            <!-- POST -->

                            <li
                                
                                data-id="<?php echo $counter; ?>"
                                data-ui_filter_value="<?php echo $currentPostFilterValue; ?>"
                                id="post-<?php the_ID(); ?>" <?php post_class('col-1-3'); ?>
                            >
<?php 
							$featuredImage = ffGalleryCollection::getGallery()->getFeaturedImage();
							//var_dump( $featuredImage );
							if( null != $featuredImage ) {
								$fixedHeight = ffSP::get('template fixed_height');
								echo '<a class="image" href="'.get_permalink().'">';
									echo '<img src="'.$featuredImage->image->resize(768, $fixedHeight, true).'" alt="'.$featuredImage->altText.'" >';
								echo '</a>';
							}
?>
                                <div class="description post-content">
                                    
                                        <?php $fprinter->modernDate(); ?>
                                    
									<?php $fprinter->modernTitle(); ?>
                                    <?php $fprinter->the_content(); ?>
                                </div>
                            </li>
<?php
			$counter ++;
           endwhile; endif;
$blogPosts = ob_get_contents();
ob_end_clean();

if( empty( $ffAllTags ) ) $ffAllTags = array();
?>