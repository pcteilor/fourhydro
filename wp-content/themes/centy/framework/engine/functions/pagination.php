<?php
/**
 * This class computes pagination range and then return it as an array ( for better printing and other purposes ) 
 * 
 * @author boobs.lover
 */
require_once get_template_directory().'/framework/libs/pagination/base.php';

class fPaginationData extends ffPaginationBaseClass {
	private $range = 11;				// how many buttons we want to show ?
	
	/**
	 * Compute pagination and return array with paged buttons. The array output is array( page, selected, link )
	 * 
	 * @return array array( array(page, selected, link ) )
	 */
	public function __construct() {
		global $paged, $wp_query;
		if(empty($paged)) $paged = 1;
		$page_count = $wp_query->max_num_pages;
		if(!$page_count) $page_count = 1;
		
		$this->_page_count = $page_count;
		$this->_paged = $paged;
	}
	
	
	protected function _getItemLink($i) {
		return get_pagenum_link( $i );
	}
}
?>