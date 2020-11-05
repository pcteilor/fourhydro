<?php
  
class ffGetByTitle{

	static $terms  = array();
	static $images = array();
	static $posts  = array();
	static $post_types = array();

	static function initTerms(){
		global $wpdb;
		$r = mysql_query( "SELECT `name`, `term_id` FROM ".$wpdb->terms." ORDER BY `term_id` DESC" );
		while( $row = mysql_fetch_array( $r ) ) self::$terms[ $row['name'] ] = (int) $row['term_id'];
	}
	
	static function initImages(){
		global $wpdb;
		$r = mysql_query( "SELECT `post_title`, `ID` FROM ".$wpdb->posts." WHERE `post_type`='attachment'" );
		while( $row = mysql_fetch_array( $r ) ) self::$images[ $row['post_title'] ] = (int) $row['ID'];
	}
	
	static function initPosts(){
		global $wpdb;
		$r = mysql_query( " SELECT *
							FROM ".$wpdb->posts."
							WHERE 1
							AND ( `post_type` = 'post' OR `post_type` = 'page' OR `post_type` = 'portfolio' OR `post_type` = 'wpcf7_contact_form' )
							AND `post_status` = 'publish' " );
		while( $row = mysql_fetch_array( $r ) ){
			self::$posts[ $row['post_title'] ] = (int) $row['ID'];
			self::$post_types[ $row['post_title'] ] = $row['post_type'];
		}
	}
	
	
	static function term($title){
		if( empty( self::$terms ) ) self::initTerms();
		if( empty( self::$terms[ $title ] ) ) return 0;
		return self::$terms[ $title ];
	}
	
	static function image($title){
		if( empty( self::$images ) ) self::initImages();
		if( empty( self::$images[ $title ] ) ) return 0;
		return self::$images[ $title ];
	}

	static function post($title){
		if( empty( self::$posts ) ) self::initPosts();
		if( empty( self::$posts[ $title ] ) ) return 0;
		return self::$posts[ $title ];
	}

	static function post_type($title){
		if( empty( self::$post_types ) ) self::initPosts();
		if( empty( self::$post_types[ $title ] ) ) return 'post';
		return self::$post_types[ $title ];
	}


}