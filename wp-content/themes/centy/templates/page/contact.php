<?php 
	ffTemplater::requirePagePreface();
?>
<?php 
/******************************************************************************/
/* AREA MAP
/******************************************************************************/

?>
<?php 
	if( $gmap->get('isEnabled') ) {
?>
		<!-- MAP -->

            <div
                class="ui_map ui_preloader"
                data-ui_map_latitude="<?php echo $gmap->get('latitude'); ?>"
                data-ui_map_longtitude="<?php echo $gmap->get('longtitude'); ?>"
                data-ui_map_zoom="<?php echo $gmap->get('zoom'); ?>"
            ></div>
<?php 
	} // END IF $gmap->get('isEnabled');
?>
            <!-- CONTACT -->

            <div id="contact">
                <div class="container grid">
                    <div id="post-<?php the_ID(); ?>" <?php post_class('row'); ?>>
                        <div class="col-5-12">
<?php 
$sidebar = ffWp::get('wpadditionalcontactinfo');
?>
<?php 
	if( $sidebar->get('enableAddress') ) {
?>
                            <!-- ADDRESS -->

                            <h5>
                                <?php echo $sidebar->get('address_title'); ?>
                            </h5>
                            <p>
                                <?php echo str_replace("\n",'</br>', $sidebar->get('address_content') ); ?>
                            </p>
<?php 
	} // END IF $sidebar->get('enableAddress');
?>
	
<?php 
	if( $sidebar->get('enableContact') ) {
?>	
                            <!-- CONTACTS -->

                            <h5>
                                <?php echo $sidebar->get('contact_title'); ?>
                            </h5>
	<?php 
		if( $sidebar->get('enableContactEmail') ) {
	?>	                            
                            <a
                                href="mailto:<?php echo $sidebar->get('contact_email_email'); ?>"
                                class="ui_button"
                            >
                                <?php echo $sidebar->get('contact_email_title'); ?>
                            </a>
	<?php 
		} // END IF $sidebar->get('enableContactEmail');
	?>                 
	<?php 
		if( $sidebar->get('enableContactPhone') ) {
			echo $phone;
		} // END if( $sidebar->get('enableContactPhone') ) { 
	?>

<?php 
	} // END IF $sidebar->get('enableContact');
?>                            
	
<?php 
	if( $sidebar->get('enableSocial') ) {
?>		
                            <!-- SOCIAL NETWORKS -->

                            <h5>
                                <?php echo $sidebar->get('social_title'); ?>
                            </h5>
                            <ul class="social">
                            	<?php 
                            		foreach( $socialLinks as $oneLink ) {
										if( $oneLink->type == 'googleplus' ) $oneLink->type = 'google-plus';
										echo '<li>';
											echo '<a href="'.$oneLink->link.'" class="icon-'.$oneLink->type.'-sign"></a>';
										echo '</li>';
									}
                            	?>
                            </ul>
<?php 
	} // END IF $sidebar->get('enableSocial');
?>                            
                        </div>

                        <!-- MESSAGE FORM -->

                        <div class="col-7-12">
                            <?php
                              if ( have_posts() ) : while ( have_posts() ) : the_post();
							  the_content();
							  endwhile; endif;
                            ?>
                        </div>
                    </div>
                </div>
            </div>