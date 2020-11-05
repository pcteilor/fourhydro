<?php

$ffAllTags = null;
ob_start();
$itemCounter = 0; 
	if ( have_posts() ) : while ( have_posts() ) : the_post();
							global $post;

							$allTagsForOnePost = ( wp_get_object_terms( $post->ID, 'portfolio-tag') );
							$currentPostFilterValue = '';
							if( !empty ($allTagsForOnePost ) ) {
								foreach( $allTagsForOnePost as $oneTag ) {
									$ffAllTags[$oneTag->term_id] = $oneTag;
									
									$currentPostFilterValue .= $oneTag->term_id;
									if( $oneTag !== end( $allTagsForOnePost ) ) 
										$currentPostFilterValue .= ',';
								}
							}
							$numberOfColumns = ffSP::get('template filterable number-of-columns');
?>
                            <!-- WORK -->

                            <li
                            	id="post-<?php the_ID(); ?>" <?php post_class('col-1-'.$numberOfColumns); ?>
                                
                                data-id="<?php echo $itemCounter; ?>"
                                data-ui_filter_value="<?php echo $currentPostFilterValue; ?>"
                            >
                                <a href="<?php echo get_permalink(); ?>">
									<?php $fprinter->printFeaturedImage(); ?>
                                    <span class="description">
                                        <?php 
                                        	$fprinter->title();
                                        ?>
                                        <p>
                                        <?php 
                                        
                                        	echo ffWP::get('wpsmalldescription description');
                                        ?>
                                        </p>
                                    </span>
                                </a>
                            </li>
<?php            
	$itemCounter++;	
	endwhile; endif;
	
	$portfolioContent = ob_get_contents();
	ob_end_clean();
	
	ffCurrOpt::set('portfolio preface tags', $ffAllTags)
?>        