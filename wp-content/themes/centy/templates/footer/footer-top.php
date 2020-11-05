           <!-- FOOTER TOP -->
            <div id="footer_top">
                <ul class="container seamless grid ">
<?php 
					$sidebars = $footerSidebars = ffOpt::Get('footer widgetized-areas');
					$last = end( $sidebars );
					foreach( $sidebars as $key => $oneSidebar ) {
						if( $key == 0 ) continue;
						
						$sidebarWidth = $oneSidebar->get('width');
						$sidebarId = THEMENAMELOW . '-footer-'.$key;
					
						echo '<li class="col-'.$sidebarWidth.'-12">';
							dynamic_sidebar( $sidebarId );
						echo '</li>';
						if( $oneSidebar !== $last )
							echo '<li class="col-1-12 gap"></li>';
					}
?>
<?php 
	if( ffOpt::get('footer top-arrow-top') ) echo '<a class="arrow" data-anchor="body"> <i class="icon-angle-up"></i> </a>'; 
?>
                </ul>
            </div>
