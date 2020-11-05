            <!-- FOOTER BOTTOM -->

            <div id="footer_bottom">
                <div class="container grid">
                    <ul class="row">
                        <li class="col-1-3">
                           <?php 
                           		if( ffOpt::get('footer bottom-text-show') ) 
                           			echo ffOpt::get('footer bottom-text');
                           		else
                           			echo '&nbsp';
                           	?>
                        </li>
                        <li class="col-2-3 right">

                            <!-- NAVIGATION -->
<?php 
						if( ffOpt::Get('footer bottom-menu-show') ) {
?>
                            <ul class="nav">
<?php 
								wp_nav_menu( array( 'theme_location'=>'footer','menu_class'=>'', 'menu_id'=>'', 'container'=>false, 'depth'=>1,'walker'=>new ffFooterMenu(), 'fallback_cb'=>'ff_nav_menu_does_not_exists' ) );
?>
                            </ul>
<?php 
						} // END if( ffOpt::Get('footer bottom-menu-show') ) {
?>                            
                            
<?php 
						if( ffOpt::get('footer bottom-social-show') && !empty($socialLinksParsed->items) ) {
?>
                            <!-- SOCIAL -->

                            <ul class="follow">
                            	<?php 
                            		foreach( $socialLinksParsed->items as $oneItem ) {
										if( $oneItem->type == 'email' ) { 
											$oneItem->link = 'mailto:'.$oneItem->link;
											$oneItem->type = 'envelope-alt';
										}
										
										echo '<li>';
											echo '<a href="'.$oneItem->link.'">';
												echo '<i class="icon-'.$oneItem->type.'"></i>';
											echo '</a>';
										echo '</li>';
									}
                            	?>
                            </ul>
<?php 
						} //if( ffOpt::get('footer bottom-social-show') && !empty($socialLinksParsed->items) ) {
						else {
							echo '&nbsp;';
						}
?>
                        </li>
                    </ul>
                </div>
            </div>