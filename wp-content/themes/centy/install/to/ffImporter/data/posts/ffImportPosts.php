<?php
class ffImportPosts extends ffBasicObject implements ffIImportSection {
	private $_contentType = 'posts';
	public function import( $fileList ) {
		$this->_adjustFileList( $fileList, $this->_contentType );
		foreach( $this->_getFileList() as $postType => $posts) {
			$this->_insertPosts( $postType, $posts );
		}
	}
	
	private function _insertPosts( $postType, $posts ) {
		foreach( $posts as $onePostId ) {
			$onePost = $this->_loadDataFromFile('posts/'.$postType.'/'.$onePostId.'.php');
			if( $this->_getWPLayer()->get_id_translation('post', $onePost->ID ) !== false ) continue;
			
			$onePost = $this->_getRuleManager()->doAction( $this->_getRuleManager()->getReplaceRuleAction()->beforeInsertingPost , $onePost );
			
			$newPostId = $this->_insertOnePost( $onePost );
			$this->_getWPLayer()->set_id_translation('post', $onePost->ID, $newPostId );
			
			$this->_insertPostTerms( $onePost, $newPostId );
			$this->_insertPostMeta( $onePost, $newPostId );
		}
	}
	
	private function _insertPostMeta( $onePost, $newPostId ){
		$metas = $onePost->post_meta;
		foreach( $metas as $name => $value ) {
			update_post_meta($newPostId, $name, $value);
		}
	}
	
	private function _insertPostTerms( $onePost, $newPostId ) {
		if( empty($onePost->connected_taxonomies ) ) return;
		
		$taxonomiesSorted = array();
		foreach( $onePost->connected_taxonomies as $oneTaxonomy ) {
			$newTaxonomyId = $this->_getWPLayer()->get_id_translation('term_id', $oneTaxonomy['term_id']);
			$taxonomiesSorted[ $oneTaxonomy['taxonomy'] ][] = (int)$newTaxonomyId;
		}
		
		foreach( $taxonomiesSorted as $taxonomy => $arrayOfIds ) {
			$this->_getWPLayer()->wp_set_post_terms($newPostId, $arrayOfIds, $taxonomy);
		}
	}
	
	private function _insertOnePost( $post ) {
		$args = array(
				'comment_status' => 'open', // 'closed' means no comments.
				'post_author'    => 1, //The user ID number of the author.
				'post_content'   => $post->post_content, //The full text of the post.
				'post_date'      => $post->post_date, //The time post was made.
				'post_date_gmt'  => $post->post_date_gmt, //The time post was made, in GMT.
				'post_excerpt'   => $post->post_excerpt, //For all your post excerpt needs.
				'post_name'      => $post->post_name, // The name (slug) for your post
				'post_parent'    => $post->post_parent, //Sets the parent of the new post.
				//'post_password'  => [ ? ] //password for post?
				'post_status'    => 'publish',
				'post_title'     => $post->post_title, //The title of your post.
				'post_type'      => $post->post_type, //You may want to insert a regular post, page, link, a menu item or some custom post type
				
		);
		//echo '<pre>';
		//print_r($args);
		//echo '<pre>';
		return $this->_getWPLayer()->wp_insert_post($args);
	}
}
