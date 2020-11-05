 <!-- PREFACE -->

            <div id="preface">
                <div class="container grid">
                    <div id="post-<?php the_ID(); ?>" <?php post_class('row'); ?>>
<?php 
					if( ffWP::get('wpintro show') ) {
?>                    
                        <div class="col-2-3">
                            <h2>
                           	<?php 
                           		$fprinter->title();
                           	?>
                            </h2>
                            <p>
                                <?php echo ffWP::get('wpsmalldescription description'); ?>
                            </p>
                        </div>                        
<?php 
					} // END if( ffWP::get('intro show') ) {
?>                        
                        <div class="<?php echo $prevNextClass; ?> right">
<?php 
						if( !empty( $prevPost ) ) {
?>                        
                            <a
                                href="<?php echo get_permalink( $prevPost->ID ); ?>"
                                class="ui_button"
                            >
                                <i class="icon-angle-left"></i>
                                <span>
                                     <?php echo ffOpt::get('translation post post-prev'); ?>
                                </span>
                            </a>
<?php 
						} // END if( !empty( $prevPost ) )
?>          
<?php 
						if( !empty( $nextPost ) ) {
?>                  
                            <a
                                href="<?php echo get_permalink( $nextPost->ID ); ?>"
                                class="ui_button"
                            >
                                <span>
                                     <?php echo ffOpt::get('translation post post-next'); ?>
                                </span>
                                <i class="icon-angle-right"></i>
                            </a>
<?php 
						} // END if( !empty( $nextPost ) )
?>                                      
                        </div>
                    </div>
                </div>
            </div>

            <!-- SLIDER -->

            <div>
                <div class="container">
                    <div
                        class="container ui_slider"
                        data-ui_slider_controls="false"
                        data-ui_slider_pager="thumbnails"
                    >
                        <ul>
    						<?php 
    							$fprinter->printSingleSlider();
    						?>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- CONTENT -->

            <div id="detail">
                <div class="container grid">
                    <div class="row">

                        <!-- DESCRIPTION -->

                        <div class="col-11-16">

                            <?php 
                            	$fprinter->contentPortfolioSingle();
                            ?>
                        </div>
                        <div class="col-1-16 gap"></div>

                        <!-- SIDEBAR -->

                        <div
                            id="sidebar"
                            class="col-4-16"
                        >

                            <!-- INFO -->
<?php 

?>
							<?php 
								foreach( $sidebarInfo as $oneInfo ) {
									echo '<h5>';
										echo $oneInfo->get('title');
									echo '</h5>';
									
									echo '<p>';
										echo str_replace("\n", '</br>',$oneInfo->get('text'));
									echo '</p>';
								}
							?>
<?php 

?>
							<ul class="float links">
								<?php 
									foreach( $sidebarButtons as $oneButton ) {
										echo '<li>';
											echo '<a href="'.$oneButton->get('url').'" class="ui_button">';
												echo '<i class="icon-link"></i>';
												echo '<span>';
													echo $oneButton->get('title');
												echo '</span>';
											echo '</a>';
										echo '</li>';
									}
								?>
                            </ul>
<?php 
						if( ffWP::get('wpportfoliosidebar share show') ) {
?>
                            <!-- SOCIAL -->

                            <h5>
                                <?php  echo ffWP::get('wpportfoliosidebar share title'); ?>
                            </h5>
<?php 
								$fprinter->getSocialLinks();
?>
<?php 
						} // END if( ffWP::get('wpportfoliosidebar share show')) {
?>                            
                        </div>
                    </div>
                </div>
            </div>

<?php 
	ffTemplater::portfolioSingleRelated();
	ffTemplater::portfolioRequestButton(); //DODELAT SP I PRO SINGLE
?>
