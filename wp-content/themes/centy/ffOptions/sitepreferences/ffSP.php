<?php
  
class ffSP{

	static $instances = array();
	static $inst_data = array();
	
	protected $tax_ID;
	protected $tax_name;
	protected $data;

	static function get_term_taxonomy(){
		if( is_home() or is_front_page()  ){ return "home"; }
		if( is_author() ){ return "author"; }
		if( is_search() ){ return "search"; }
		if( is_date()   ){ return "date"; }
		if( is_tag()    ){ return "tag"; }

		if( is_single() ){
			// Well, we have here f.e. portfolio-single and we wanna have parent portfolio category
			// If it is called for page / attachment , than it will break: http://codex.wordpress.org/Function_Reference/is_single
			$post_type = ffWP::getPostType();
			if( 'attachment' == $post_type ){
				return 'archives';
			}
			return ( 'post' == $post_type )
					? 'category'
					: $post_type.'-category';
		}

		global $wp_query;
		$tax_name = $wp_query->tax_query->queries[0]['taxonomy'];

		if( FALSE !== strpos($tax_name, '-tag') ){
			return "archives";
		}

		if( FALSE !== strpos($tax_name, 'tag') ){
			if( 'post_tag' == $tax_name ){
				$tax_name = 'tag';
			}else{
				$tax_name = str_replace('tag','category',$tax_name);
			}
		}
		return $tax_name;
	}

	static function get_term_id($tax_name){
		if( is_home()   ){ return 0; }
		if( is_author() ){ return 0; }
		if( is_search() ){ return 0; }
		if( is_date()   ){ return 0; }
		if( is_tag()    ){ return 0; }

		if( is_single() ){
			// Well, we have here f.e. portfolio-single and we wanna have parent portfolio category
			// If it is called for page / attachment , than it will break: http://codex.wordpress.org/Function_Reference/is_single
			$post_type = ffWP::getPostType();

			if( 'attachment' == $post_type ){
				return 0;
			}

			$term_tax = ( 'post' == $post_type )
							? 'category'
							: $post_type.'-category';
			$terms = get_the_terms( ffWP::find_post_ID(), $term_tax );
			if( empty($terms) ){
				return 0;
			}else{
				$t = array_values($terms);
				return $t[0]->term_id;
			}
		}

		global $wp_query;

		if( is_category() ){
			if( empty( $wp_query->query['cat'] ) ){
				$cat = get_category_by_slug( $wp_query->query['category_name'] );
				return $cat->term_id ;
			}
			return $wp_query->query['cat'];
		}else if( taxonomy_exists( $tax_name ) ){
			if( empty( $wp_query->query[$tax_name] ) and ( 'category' != $tax_name ) ){
				return 0;
			}
			$slug = $wp_query->query[$tax_name];
			$term = get_term_by('slug',$slug, $tax_name);
			$tax_ID = $term->term_id;
			return 1*$tax_ID;
		}
		return 0;
	}

	function __construct( $tax_name, $tax_ID ){
		$this->tax_ID = $tax_ID;
		$this->tax_name = $tax_name;
		$sal = new ffSalSPFE( $tax_name, $tax_ID );
		$this->data = $sal->getData();
		if(empty(ffSP::$instances[ $tax_name ])){
			ffSP::$instances[ $tax_name ] = array();
		}
		ffSP::$instances[ $tax_name ][ $tax_ID ] = $this;
	}
	
	static function init( $tax_name=NULL, $tax_ID=NULL ){
		if( NULL === $tax_name ) {
			$tax_name = ffSP::get_term_taxonomy();
		}
		if( NULL === $tax_ID ) {
			$tax_ID = ffSP::get_term_id( $tax_name );
		}
		if( empty( ffSP::$instances[ $tax_name ][ $tax_ID ] ) ){
			new ffSP($tax_name, $tax_ID);
		}
		return ffSP::$instances[ $tax_name ][ $tax_ID ];
	}

	static function get($name, $tax_name=NULL, $tax_ID=NULL ){
		$name = strtolower($name);
		return ffSP::init( $tax_name, $tax_ID )->data->get($name);
	}

	public static function getLoopParams(){
		$params = array();

		$params['posts_per_page'] = ffSP::get('query posts_per_page');
		if( empty($params['posts_per_page']) ){
			$params['posts_per_page'] = 987654321;
		}
		
		$params['numberposts'] = $params['posts_per_page'];

		$params['order'] = ffSP::get('query order');

		$params['order_by'] = ffSP::get('query order_by');

		return $params;
	}

}