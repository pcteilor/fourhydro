<?php
class htmlPagePrinter extends htmlPTPrinter {
	
	public function title() {
		echo '<h1>';
			echo get_the_title();
		echo '</h1>';
	}
	
	
}