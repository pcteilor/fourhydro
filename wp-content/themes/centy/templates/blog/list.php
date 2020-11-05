<?php ffTemplater::requireBlogPreface(); ?>

            <!-- LIST -->

            <div id="list">
                <div class="container">
                    <div class="grid">
                        <div class="row">

                            <!-- POSTS -->

                            <ul class="<?php echo $blogClass; ?> posts">
<?php
	if ( have_posts() ) : while ( have_posts() ) : the_post();
?>

                                <!-- POST -->

                                <li id="post-<?php the_ID(); ?>" <?php post_class('grid'); ?>>
                                    <div class="row" data-href="<?php echo $fprinter->permalink(); ?>">
                                        <span class="<?php $fprinter->printPostClass(); ?>">
											<?php $fprinter->date(); ?>

											<?php $fprinter->title(); ?>

                                           	<?php $fprinter->the_content(); ?>
                                        </span>
                                        <?php $fprinter->printFeaturedImageList(); ?>
                                    </div>
                                </li>

                                
<?php
           endwhile; 
           else:
           	ffTemplater::requireNoPosts();
           endif;
?>
                            </ul>


<?php 
	ffTemplater::requireBlogSidebar();
?>
                        </div>

                        <!-- NAVIGATION -->
<?php
	fPagination::Render();
?>

                    </div>
                </div>
            </div>
