<?php
  
class ffWP{

    static $instances = array();
    static $inst_data = array();
    
    protected $post_ID = 0;

    static function find_post_ID( $post_ID = 0 ){
        if( is_admin() ){
            global $_GET;
            $try = empty($_POST['post']) ? 0 : ceil( 1 * $_POST['post'] );
            if( !empty($try) ) return $try;
            $try = empty($_POST['post_ID']) ? 0 : ceil( 1 * $_POST['post_ID'] );
            if( !empty($try) ) return $try;
        }
        
        $post_ID = ceil( 1* $post_ID);
        if( !empty( $post_ID ) ){ return $post_ID; }

        // Must be called in the loop
        $post_ID = get_the_ID();
        if( ! empty( $post_ID ) ){
            return $post_ID;
        }

        return 0;
    }

    function __construct( $post_ID = 0 ){
        $post_ID = empty($post_ID) ? ffWP::find_post_ID( $post_ID ) : $post_ID;
        ffWP::$instances[ $post_ID ] = $this;
        $sal = new ffSalWritepanels( $post_ID );
        ffWP::$inst_data[ $post_ID ] = $sal->getData();
        $this->post_ID = $post_ID;
    }
    
    static function initInstance( $post_ID = 0 ){
        $post_ID = empty($post_ID) ? ffWP::find_post_ID( $post_ID ) : $post_ID;
        if( empty( ffWP::$instances[ $post_ID ] ) ){
            new ffWP($post_ID);
        }
        return ffWP::$instances[ $post_ID ];
    }

    static function get($name, $post_ID = 0){
        $name = strtolower($name);
        $post_ID = empty($post_ID) ? ffWP::find_post_ID( $post_ID ) : $post_ID;
        if( empty( ffWP::$instances[ $post_ID ] ) ){
            new ffWP($post_ID);
        }
        return ffWP::$inst_data[$post_ID]->get($name);
    }

    static function getWp($name, $post_ID = 0){
        return ffWP::get("wp".$name, $post_ID);
    }

	protected $post_type = null;

	static function getPostType($post_ID = 0){
		$inst = ffWP::initInstance($post_ID);
		if( !empty( $inst->post_type ) ){
			return $inst->post_type;
		}
		return $inst->post_type = get_post_type( $inst->post_ID );
    }
}