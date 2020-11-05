<?php
class ffVideo {

	const IFRAME  = 'iframe';
	const VIMEO   = 'vimeo';
	const YOUTUBE = 'youtube';
	const UNKNOWN = 'unknown';

	private $_id = null;
	private $_type = null;
	private $_link = null;

	public function __construct( $link ){
		$this->_link = $link;
		$this->getType();
		$this->getID();
	}

	public function getType(){
		if( !empty($this->_type) ){
			return $this->_type;
		}
		if( FALSE !== stripos( $this->_link, '<iframe' ) ){  return $this->_type = ffVideo::IFRAME; }
		if( FALSE !== stripos( $this->_link, 'youtube' ) ){  return $this->_type = ffVideo::YOUTUBE; }
		if( FALSE !== stripos( $this->_link, 'youtu.be' ) ){ return $this->_type = ffVideo::YOUTUBE; }
		if( FALSE !== stripos( $this->_link, 'vimeo' ) ){    return $this->_type = ffVideo::VIMEO; }
		return $this->_type = ffVideo::UNKNOWN;
	}

	public function getID(){
		if( !empty($this->_id) ){
			return $this->_id;
		}
		switch ( $this->getType() ) {
			case ffVideo::YOUTUBE:
				return $this->_id = $this->_getYouTubeID();
			case ffVideo::VIMEO:
				return $this->_id = $this->_getVimeoID();
		}
		return "UNKNOWN";
	}
	
	public function getIframeSrc(){
		switch ( $this->getType() ) {
			case ffVideo::YOUTUBE:
				return 'http://www.youtube.com/embed/'.$this->getID();
			case ffVideo::VIMEO:
				return 'http://player.vimeo.com/video/'.$this->getID();
		}
		return '';
	}

	public function printIframe(){
		if( ffVideo::IFRAME == $this->_type ){
			echo $this->_link;
		}else{
			$src = $this->getIframeSrc();
			if( empty($src) ){
				echo '<p>Unknown type of link: '.$this->_link.'</p>';
			}else{
				echo '<iframe src="'.$src.'" class="video '.$this->_type.'" allowfullscreen></iframe>';
			}
		}
	}

	protected function _getYouTubeID(){
		// http://www.youtube.com/embed/e2rWG0DCrpI
		// http://www.youtube.com/watch?v=DeumyOzKqgI
		// http://youtu.be/L83cTan6ESk
		if( FALSE !== stripos( $this->_link, '/embed/' )){
			$id = explode('/embed/', $this->_link);
		}
		if( FALSE !== stripos( $this->_link, '/watch?v=' )){
			$id = explode('/watch?v=', $this->_link);
		}
		if( FALSE !== stripos( $this->_link, '/youtu.be/' )){
			$id = explode('/youtu.be/', $this->_link);
		}
		$id = $id[ count($id) -1 ];
		return $this->_id = $id;
	}

	protected function _getVimeoID(){
		// http://player.vimeo.com/video/8332956
		// http://vimeo.com/8332956
		$id = str_replace("/"," ", $this->_link);
		$id = trim($id);
		$id = explode(' ', $id);
		$id = 1 * $id[ count($id) -1 ];
		return $this->_id = $id;
	}
}

