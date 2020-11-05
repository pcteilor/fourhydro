<!-- SLIDER -->

            <div id="slider">
<?php
  		if( !function_exists('putRevSlider') ) {
			echo 'You need to install Revolution Slider plugin. Please click "Begin Installation" in Wordpress Admin Dashboard, in yellow notification';
		}else{
			putRevSlider( ffSP::get('slider id') );
		}

?>
            </div>