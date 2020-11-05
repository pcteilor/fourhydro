 <!-- HEADER -->

            <div id="header">
                <div class="container">
                    <div class="wrapper">
<?php 
		if( $showLogoDiv ) {
?>	
			<!-- LOGO -->
	
			<div id="logo">
				<a href="<?php echo get_home_url(); ?>">
				<?php 
					if( ffOpt::get('header logo show-logo') ) {
				?>
					<img
						src="<?php echo ffOpt::get('header logo img'); ?>"
						alt=""
						width="43"
						height="30"
					/>
				<?php 
					} // END if( ffOpt::get('header show-logo') ) {
				?>
				<?php 
					if( ffOpt::get('header logo show-text') ) {
				?>
					<span>
						<?php echo ffOpt::get('header logo header-text'); ?>
					</span>
				<?php 
					} // END if( ffOpt::get('header show-text') ) {
				?>
				</a>
			</div>
<?php 
		} // END if( $showLogoDiv ) {
?>			
                        <!-- MAIN MENU -->
                          <ul
                            id="menu"
                            class="full"
                        >
                            <li class="submenu">
                                <a>
                                    <?php echo ffOpt::get('translation navigation menu-title-responsive'); ?>
                                </a>
					<?php 
						wp_nav_menu( array( 'theme_location'=>'navigation','menu_class'=>'', 'menu_id'=>'', 'container'=>false, 'walker'=>new ffNavigationMenu(), 'fallback_cb'=>'ff_nav_menu_does_not_exists' ) );
					?>
                      </li></ul>


                    </div>
                </div>
            </div>