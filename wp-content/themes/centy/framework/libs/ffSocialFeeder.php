<?php
/**
 *  ffSocialFeeder
 *
 *  @author freshface
 */

class ffSocialFeeder {

    public $items;
    
    protected $_possible_social_links = array(

                 'skype'       => array( 'title' => 'Skype',       'url_substr' => 'skype'       ),
                 'rss'         => array( 'title' => 'RSS',         'url_substr' => 'rss'         ),
                 'youtube'     => array( 'title' => 'Youtube',     'url_substr' => 'youtube'     ),
                 'forrst'      => array( 'title' => 'Forrst',      'url_substr' => 'forrst'      ),
                 'googleplus'  => array( 'title' => 'Google plus', 'url_substr' => 'google'      ),
                 'facebook'    => array( 'title' => 'Facebook',    'url_substr' => 'facebook'    ),
                 'digg'        => array( 'title' => 'Digg',        'url_substr' => 'digg'        ),
                 'vimeo'       => array( 'title' => 'Vimeo',       'url_substr' => 'vimeo'       ),
                 'dribbble'    => array( 'title' => 'dribbble',    'url_substr' => 'dribbble'    ),
                 'flickr'      => array( 'title' => 'Flickr',      'url_substr' => 'flickr'      ),
                 'twitter'     => array( 'title' => 'Twitter',     'url_substr' => 'twitter'     ),
    			 'email'       => array( 'title' => 'Email', 'url_substr' => 'email' ),
    			 'phone'       => array( 'title' => 'Phone', 'url_substr' => 'phone' ),
    			'instagram'       => array( 'title' => 'Instagram', 'url_substr' => 'instagram' ),
    			'pinterest'   => array( 'title' => 'Pinterest',   'url_substr' => 'pinterest'   ),
    			'github'   => array( 'title' => 'Github',   'url_substr' => 'github'   ),
				'linkedin'    => array( 'title' => 'LinkedIn',    'url_substr' => 'linkedin'    ),
                 /*
                 'vimeo'       => array( 'title' => 'Vimeo',       'url_substr' => 'vimeo'       ),
                 'facebook'    => array( 'title' => 'Facebook',    'url_substr' => 'facebook'    ),
                 'linkedin'    => array( 'title' => 'LinkedIn',    'url_substr' => 'linkedin'    ),
                 'twitter'     => array( 'title' => 'Twitter',     'url_substr' => 'twitter'     ),
                 'pinterest'   => array( 'title' => 'Pinterest',   'url_substr' => 'pinterest'   ),
                 'digg'        => array( 'title' => 'Digg',        'url_substr' => 'digg'        ),
                 'yahoo1'      => array( 'title' => 'Yahoo',       'url_substr' => 'yahoo'       ),
                 'yahoo2'      => array( 'title' => 'Yahoo',       'url_substr' => 'yahoo'       ),
                 'reddit'      => array( 'title' => 'Reddit',      'url_substr' => 'reddit'      ),
                 'googleplus'  => array( 'title' => 'Google plus', 'url_substr' => 'google'      ),
                 'stumbleupon' => array( 'title' => 'Stumbleupon', 'url_substr' => 'stumbleupon' ),
                 'skype'       => array( 'title' => 'Skype',       'url_substr' => 'skype'       ),
                 'deviantart'  => array( 'title' => 'Deviantart',  'url_substr' => 'deviantart'  ),
                 'delicious'   => array( 'title' => 'Delicious',   'url_substr' => 'delicious' ),
                 'tumblr'      => array( 'title' => 'Tumblr',      'url_substr' => 'tumblr' ),
                 'lastfm'      => array( 'title' => 'Lastfm',      'url_substr' => 'last' ),
                 'youtube'     => array( 'title' => 'Youtube',     'url_substr' => 'youtube' ),
                 'friendfeed'  => array( 'title' => 'Friendfeed',  'url_substr' => 'friendfeed' ),
                 'myspace'     => array( 'title' => 'Myspace',     'url_substr' => 'myspace' ),

                 'rss'         => array( 'title' => 'RSS', 'url_substr' => 'rss' ),

                 'badoo'       => array( 'title' => 'Badoo', 'url_substr' => 'badoo' ),
                 'dribble'     => array( 'title' => 'Dribble', 'url_substr' => 'dribble' ),
                 'blogger'     => array( 'title' => 'Blogger', 'url_substr' => 'blogger' ),

                 'homeicon'    => array( 'title' => 'Home', 'url_substr' => 'homeicon' ),
                 'phone'       => array( 'title' => 'Phone', 'url_substr' => 'phone' ),
                 'email'       => array( 'title' => 'Email', 'url_substr' => 'email' ),
                 'picassa'     => array( 'title' => 'Picassa', 'url_substr' => 'picasa.google' ),

                 'livejournal' => array( 'title' => 'Livejournal', 'url_substr' => 'livejournal' ),
                 'bebo'        => array( 'title' => 'Bebo', 'url_substr' => 'bebo' ),
                 'technorati'  => array( 'title' => 'Technorati', 'url_substr' => 'technorati' ),
                 'newsvine'    => array( 'title' => 'Newsvine', 'url_substr' => 'newsvine' ),
                 'wordpress'   => array( 'title' => 'Wordpress', 'url_substr' => 'wordpress' ),
                 'yelp'        => array( 'title' => 'Yelp', 'url_substr' => 'yelp' ),
                 */
    );


    function __construct( $links, $possibleSocials = null ){
        if( !empty($possibleSocials) ){
            $this->setPossibleSocials( $possibleSocials );
        }
        
        $this->_translateTextToLinks( $links );
    }
    
    public function setPossibleSocials( $possibleSocials ){
        if( ! is_array($possibleSocials) ){
            return;
        }
        
        foreach($this->_possible_social_links as $key=>$value) {
            $key = strtolower($key);
            if( ! in_array( $key, $possibleSocials ) ){
                unset( $this->_possible_social_links[$key] );
            }
        }
    }
    
    protected function _translateTextToLinks( $links ){
        $links = explode("\n", $links);

        $this->links = array();
        
        foreach($links as $lIndex=>$lValue) {
            $l = $this->_translateLinkStringIntoInnerFormat($lValue);
            if( !empty( $l ) ){
                $this->items[] = $l;
            }
        }
    }
    
    protected function _translateLinkStringIntoInnerFormat($linkString){
        $linkString = trim( $linkString );

        if( empty($linkString) ){
            return null;
        }

        if( '#' == substr($linkString, 0, 1) ){
            return null;
        }

        if( 'http' != substr($linkString, 0, 4) ){
            if( FALSE !== strpos($linkString,":") ){
                $e = explode(":", $linkString, 2);
                $sType = trim( $e[0] );
                $link = trim( $e[1] );
                return (object) array(
                    'type' => $sType,
                    'link' => $link,
                    'title' => $this->_possible_social_links[ $sType ]['title'],
                );
            }
        }

        $socType = null;
        $socLink = null;
        
        $socProtocol = null;
        
        if( 'https://' == substr($linkString, 0, 8) ){
            $linkString = substr($linkString, 8);
            $socProtocol = 'https://';
        }else if( 'http://' == substr($linkString, 0, 7) ){
            $linkString = substr($linkString, 7);
            $socProtocol = 'http://';
        }else{
            $socProtocol = 'http://';
        }
        
        $slashPosition = strpos( $linkString, '/' );
        
        $domain = substr($linkString, 0, $slashPosition);

        foreach ($this->_possible_social_links as $sType=>$sDefinitions) {
            if( FALSE !== strpos( $domain, $sDefinitions['url_substr'] . '.' ) ){
                return (object) array(
                    'type' => $sType,
                    'link' => $socProtocol . $linkString,
                    'title' => $this->_possible_social_links[ $sType ]['title'],
                );
            }
        }

        return null;

    }
}
