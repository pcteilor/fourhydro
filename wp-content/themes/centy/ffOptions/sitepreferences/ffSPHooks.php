<?php
class ffSPHooks{
	static protected $instance;
	
	protected $isMainLoop = TRUE;

	function __construct(){
		if( empty( ffSPHooks::$instance ) ){
			ffSPHooks::$instance = $this;
		}
		$this->addHooks();
	}
	
	public function addHooks(){
		add_filter( 'pre_get_posts', array( ffSPHooks::$instance, 'wphook__pre_get_posts' ), 1 );
	}
	
	public function wphook__pre_get_posts( $query ){
		if( ! $this->isMainLoop ){
			return $query;
		}
		$this->isMainLoop = FALSE;

		////////////////////////////////////////////////////////////////////////
		// Home
		////////////////////////////////////////////////////////////////////////

		if( defined('CUSTOM_HOME_LOOP') ) {
			if( $query->is_home ){
				if ( ffSP::get('category-feed-show') ){
					
					$term_id = ffSP::get('category id');
					if( !empty($term_id ) ){
						$query->set('cat', $term_id);
						$query->set('category', $term_id);
					}
					$query->set('post_type','post');
				}
			}
		}

		////////////////////////////////////////////////////////////////////////
		// Skip single stuff
		////////////////////////////////////////////////////////////////////////

		if( $query->is_single ) return $query;
		if( $query->is_page   ) return $query;
		if( $query->is_404    ) return $query;
		if( $query->is_admin  ) return $query;

		////////////////////////////////////////////////////////////////////////
		// Skip custom stuff
		////////////////////////////////////////////////////////////////////////

		if( $query->is_search ) $query->set('post_type', 'post' );
		if( $query->is_date   ) $query->set('post_type', 'post' );
		if( $query->is_author ) $query->set('post_type', 'post' );

		////////////////////////////////////////////////////////////////////////
		// Set params
		////////////////////////////////////////////////////////////////////////

		$params = ffSP::getLoopParams();
		
		$query->set('posts_per_page', $params['posts_per_page'] );
		if( !empty($params['order']) ) $query->set('order',$params['order']);
		if( !empty($params['order_by']) ) $query->set('orderby',$params['order_by']);

		return $query;
	}
}