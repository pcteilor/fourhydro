<?php
	if ( have_posts() ) : while ( have_posts() ) : the_post();
?>

            <!-- POST -->

            <div id="post">
                <div class="container grid">
                    <div id="post-<?php the_ID(); ?>" <?php post_class('row'); ?>>
                        <div class="<?php echo $pageClass; ?>">

                            <!-- CONTENT -->

                            <div class="content post-content">
                                <?php $fprinter->title(); ?>
                                <?php $fprinter->the_content_upgraded(); ?>
                            </div>

 							<?php ffTemplater::requirePageComments(); ?>
                        </div>
                        
<?php 
						ffTemplater::requirePageSidebar();
?>                                            
                    </div>

                </div>
            </div>
<?php
           endwhile; endif;
?>