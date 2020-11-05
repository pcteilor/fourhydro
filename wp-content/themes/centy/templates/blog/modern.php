
<?php ffTemplater::requireBlogPreface(); ?>

<?php ffTemplater::requireBlogModernFeaturedSlider(); ?>

            <!-- BLOG -->

            <div id="blog">
                <div class="container ui_filter">

<?php 
				if( ffSP::get('template filterable-show') ==1 ) {
?>
                    <!-- CATEGORY SWITCH -->

                    <div class="ui_switch ui_filter_switch">
                        <ul class="float">
                            <li class="active">
                                <a data-ui_switch_value="all">
                                    <span>
                                         <?php echo ffOpt::get('translation post sortable-all'); ?>
                                    </span>
                                </a>
                            </li>                        
                        	<?php 
                        		foreach( $ffAllTags as $oneTag ) {
									echo '<li>';
										echo '<a data-ui_switch_value="'.$oneTag->term_id.'">';
											echo $oneTag->name;
										echo '</a>';
									echo '</li>';
								}
                        	?>
                        </ul>
                    </div>

                    <!-- CATEGORY SELECT -->

                    <div class="ui_select">
                        <label>
                            <i class="icon-folder-open"></i>
                            <span>
                                <?php echo ffOpt::get('translation post sortable-all'); ?>
                            </span>
                        </label>
                        <ul>                       
                            <li class="active">
                                <a data-ui_select_value="all">
                                    <i class="icon-folder-open"></i>
                                    <span>
                                        <?php echo ffOpt::get('translation post sortable-all'); ?>
                                    </span>
                                </a>
                            </li>
                        	<?php 
                        		foreach( $ffAllTags as $oneTag ) {
									$first = $tagId == 0;
									$last = $tagId == count($tagList) - 1;
									$order = $first || $last ? (' class="' + ($first  ? 'first ' : '') + ($last ? 'last" ' : '" ')) : '';
									echo '<li'.$order.'>';
										echo '<a data-ui_select_value="'.$oneTag->term_id.'">';
											echo '<span>';
												echo $oneTag->name;
											echo '</span>';
										echo '</a>';
									echo '</li>';
								}
                        	?>                             
                        </ul>
                    </div>
<?php 
				} // END if( ffSP::get('template filterable-show') ==1 ) {
?>
                    <!-- POSTS -->

                    <div class="grid">
                        <ul class="row items fade ui_filter_items">
<?php 
							echo $blogPosts;
?>

                        </ul>
                    </div>
  
<?php
	fPagination::Render();
?>

                </div>
            </div>