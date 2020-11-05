<?php

class ffPaginationComments extends ffPaginationBaseClass {
	private $_commentLink = null;
	private $_commentHtmlId = '#comments';
	
	public function __construct() {
		$page = get_query_var('cpage');
		if ( !$page )
			$page = 1;
		
		$max_page = get_comment_pages_count();
		
		$this->_setActualPage($page);
		$this->_setNumberOfPages( $max_page );
		
		$this->_createCommentLink();
		
	}
	
	private function _createCommentLink() {
		global $wp_rewrite;
		if ( $wp_rewrite->using_permalinks() ) {
			$this->_commentLink = user_trailingslashit(trailingslashit(get_permalink()) . 'comment-page-%#%', 'commentpaged');
		} else {
			$this->_commentLink = add_query_arg( 'cpage', '%#%' );			
		}
	}
	
	protected function _getItemLink( $i ) {
		$commentLink = $this->_commentLink;
		$replaceWith = $i.$this->_commentHtmlId;
		$newLink = str_replace('%#%', $replaceWith, $commentLink );
		return $newLink;
	}
}
