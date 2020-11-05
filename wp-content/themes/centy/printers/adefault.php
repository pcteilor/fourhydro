<?php
class htmlBasePrinter implements htmlPrinterInterface {
	public function content() {
		the_content();
	}
}
