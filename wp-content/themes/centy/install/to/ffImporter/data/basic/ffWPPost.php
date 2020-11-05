<?php
class ffWPPost {

	public $ID;
	public $post_author;
	public $post_date;
	public $post_date_gmt;
	public $post_content;
	public $post_title;
	public $post_excerpt;
	public $post_status;
	public $comment_status;
	public $ping_status;
	public $post_password;
	public $post_name;
	public $to_ping;
	public $pinged;
	public $post_content_filtered;
	public $post_modified;
	public $post_modified_gmt;
	public $post_parent;
	public $guid;
	public $menu_order;
	public $post_type;
	public $post_mime_type;
	public $comment_count;

	public $post_meta = array();
	public $connected_taxonomies = array();

	public static function __set_state( $state) {
		$post = new ffWPPost();
		foreach( $state as $key => $value ) {
			$post->$key = $value;
		}
		return $post;
	}

}