<?php
class ffImage {
	public $url = null;
	public $filetype = null;
	public $width = null;
	public $height = null;
	
	public function resize( $width, $height = null, $crop = null ) {
		return fImg::resize( $this->url, $width, $height, $crop );
	}
	
	public function __toString() {
		return $this->url;
	}
}

class ffGalleryImage {
	public $id = null;
	/**
	 * @var ffImage
	 */
	public $image = null;

	public $title = null;
	public $altText = null;
	public $caption = null;
	public $description = null;
}