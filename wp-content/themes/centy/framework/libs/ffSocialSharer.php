<?php

/**
 *  ffSocialSharer
 *
 *  @author freshface
 */

class ffSocialSharer {

    protected $_links = array(
                 'googleplus'  => array( 'title' => 'Google+',     'url' => 'https://plus.google.com/share?url=[URL]' ),
                 'facebook'    => array( 'title' => 'Facebook',    'url' => 'https://www.facebook.com/sharer.php?u=[URL]&t=[TITLE]' ),
                 'twitter'     => array( 'title' => 'Twitter',     'url' => 'http://twitter.com/intent/tweet?source=sharethiscom&text=[TITLE]&url=[URL]' ),
    );
	
    protected $_possibleLinks = array();
    
    public function addPossibleLink( $possibleLinkName ) {
    	$this->_possibleLinks[] = $possibleLinkName;
    }
    
    
    function __construct($social = null ){
        if( !empty($social) ){
            $this->setPossibleSocials( $social );
        }
    }
    
    private function _proceedWhiteList() {
    	foreach( $this->_links as $key => $oneLinkName ) {
    		$key = strtolower($key);
    		if( ! in_array( $key, $this->_possibleLinks ) ){ 
    			unset( $this->_links[$key] );
    		}
    	}
    	$this->_possibleLinks = array();
    }
    
    public function setPossibleSocials( $possibleSocials ){
        if( ! is_array($possibleSocials) ){
            return;
        }
        
        foreach($this->_links as $key=>$value) {
            $key = strtolower($key);
            if( ! in_array( $key, $possibleSocials ) ){
                unset( $this->_links[$key] );
            }
        }
    }
    
    public function getShareLinks( $url='', $title = ''){
		if( !empty( $this->_possibleLinks ) )
			$this->_proceedWhiteList();
		// Get URL

		$url = trim($url);
		if( empty($url) ){
			$url = 'http';
			if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
			$url .= "://";
			$url .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		}
		$url   = urlencode( $url );

		// Get TITLE

		$title = trim( $title );
		if( empty($title) ){
			$title = wp_title( '', false );
		}
		$title = trim( $title );
		// home
		if( empty($title) ){
			$title = get_bloginfo('name');
			$title = trim( $title );
		}
		$title = urlencode( $title );

		// Get the LIST

		foreach($this->_links as $id=>$values) {
			$values['url'] = str_replace('[URL]',   $url,   $values['url']);
			$values['url'] = str_replace('[TITLE]', $title, $values['url']);
			$values['type'] = $id;
            $this->_links[$id] = (object) $values;
        }
        
        return $this->_links;
    }
    
}
