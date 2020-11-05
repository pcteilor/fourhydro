<?php
	if ( have_posts() ) : while ( have_posts() ) : the_post();
?>
			<?php $fprinter->printAttachmentImage(); ?>

            <!-- POST -->

            <div id="post">
                <div class="container grid">
                    <div id="post-<?php the_ID(); ?>" <?php post_class('row'); ?>>

                        <div class="col-1-12 gap"></div>
                        <div class="col-8-12">

                            <!-- CONTENT -->

                            <div class="content post-content">
                                <?php $fprinter->title(); ?>
                                <?php the_content(); ?>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
<?php
           endwhile; endif;
?>