<?php
/**
 *  ffTwitterFeeder
 *
 *  @author freshface
 */

class ffTwitterFeeder {

    const TWITTER_ACTUALIZATION_MINUTES_COUNT = 10;
    const TWITTER_CACHE_MAX_MINUTES_COUNT     = 60;
    const TWITTER_NAMESPACE_PREFIX            = 'cmp_twt_';

    private $_twitterName;
    private $_tweetsCount;

    private $_userHash;
    private $_nameSpace;

    private $_last_actualization;
    private $_last_check;

    function __construct( $twitterName = '_freshface', $tweetsCount = 5 ){
        $this->_twitterName = $twitterName;
        $this->_tweetsCount = $tweetsCount;
        $this->_userHash    = base64_encode( $twitterName );
        $this->_nameSpace   = self::TWITTER_NAMESPACE_PREFIX . $this->_userHash;
        
        $this->_last_actualization = fOpt::Get( $this->_nameSpace, 'last_actualization' );
        $this->_last_check         = fOpt::Get( $this->_nameSpace, 'last_check' );
    }

    public function getTwitterFeed() {

        // Can we read time of last cached tweet?
        if( null == $this->_last_actualization ){
            return $this->actualizeTwitterFeed();
        }

        // 60 = TWITTER_CACHE_MAX_MINUTES_COUNT
        // Is last cached tweet older than 60 minutes?
        if( $this->_last_actualization + ( 60 * self::TWITTER_CACHE_MAX_MINUTES_COUNT ) < time() ) {

            // Can we read time of last time-checking twitter?
            if( null == $this->_last_check ){
                return $this->actualizeTwitterFeed();
            }

            // 10 = TWITTER_ACTUALIZATION_MINUTES_COUNT
            // Did we check twitter more than 10 minutes ago?
            if( $this->_last_check + ( 60 * self::TWITTER_ACTUALIZATION_MINUTES_COUNT ) < time() ) {
                return $this->actualizeTwitterFeed();
            }

        }

        // Is not possible to load cached tweets?
        if( null == ( $twitter_feed = $this->_forceLoadCachedTwitterFeed() ) ) {
            return $this->actualizeTwitterFeed();
        }

        return $twitter_feed;
    }
    
    private function _forceLoadCachedTwitterFeed(){
        $twitter_feed = fOpt::Get( $this->_nameSpace, 'rss_feed');
        
        if( null == $twitter_feed ){
            return null;
        }else{
            return unserialize($twitter_feed);
        }
        
    }

    public function actualizeTwitterFeed() {

        // We save this open-twitter-page attempt
        fOpt::Set($this->_nameSpace, 'last_check', time());

        $twitterApiURL = 'http://api.twitter.com/1/statuses/user_timeline/'.
                         $this->_twitterName.
                         '.json?count='.
                         $this->_tweetsCount;

        $twitterResponse = wp_remote_get( $twitterApiURL );
        
        if( 200 != 1 * $twitterResponse['response']['code'] ){
            return $this->_forceLoadCachedTwitterFeed();
        }

        $toReturn = json_decode($twitterResponse['body']);
        
        $twitter_parsed_data = serialize($toReturn);

        fOpt::Set($this->_nameSpace, 'rss_feed', $twitter_parsed_data);
        fOpt::Set($this->_nameSpace, 'last_actualization', time());

        return $toReturn;
    }
}
