<?php
class ffMediaInserter {
	const TYPE_VIMEO = 'vimeo';
	const TYPE_YOUTUBE = 'youtube';
	private $_parsedUrl = null;
	private $_originalUrl = null;
	private $_newUrl = null;
	private $_type = null;
	public function getIframeSource( $url ) {
		$this->_originalUrl = $url;
		$this->_parseUrl( $url );
		$this->_createNewUrl();
		return $this->_newUrl;
	}
	
	private function _createNewUrl() {
		switch( $this->_parsedUrl['host'] ) {
			case 'www.vimeo.com':
			case 'vimeo.com': $this->_newVimeo(); break;
			
			case 'www.youtube.com':
			case 'youtube.com': $this->_newYoutube(); break;

			default:
				$this->_newUknownUrl();
				break;
		}
	}
	
	private function _newUknownUrl() {
		$this->_newUrl = $this->_originalUrl;
	}
	
	private function _newVimeo() {
		$this->_type = ffMediaInserter::TYPE_VIMEO;
		// new string http://player.vimeo.com/video/8332956
		// old string http://vimeo.com/8332956
		$videoIdWithSlash = $this->_parsedUrl['path'];
		$videoId = str_replace('/','', $videoIdWithSlash);
		
		$newUrl = 'http://player.vimeo.com/video/'.$videoId;
		$this->_newUrl = $newUrl;
	}
	
	private function _newYoutube() {
		$this->_type = ffMediaInserter::TYPE_YOUTUBE;
		
		// new string http://www.youtube.com/embed/e2rWG0DCrpI
		// old string http://www.youtube.com/watch?v=DeumyOzKqgI 
		//var_dump( $this->_parsedUrl);
		//echo 'xxxx';
		//die();
		if( isset ( $this->_parsedUrl['query_parsed']['v']  ) ) {
			$videoId = $this->_parsedUrl['query_parsed']['v'];
			$newUrl = 'http://www.youtube.com/embed/'.$videoId;
			$this->_newUrl = $newUrl;
		}
	}
	
	private function _parseUrl( $url ) {
		$this->_parsedUrl = parse_url($url);
		$query = empty( $this->_parsedUrl['query'] ) ? '' : $this->_parsedUrl['query'];
		parse_str( $query, $this->_parsedUrl['query_parsed'] );
		
	}
	
}

