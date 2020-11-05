<?php
class ffWPLayer {
	private $_pluginDir = null;

	
	public function get_taxonomies() { return get_taxonomies(); }
	
	public function get_categories( $args = null ) { return get_categories( $args ); }
	
	public function get_cat_name( $catId ) { return get_cat_name( $catId ); }
	
	public function get_post_types( $args = null ) { return get_post_types( $args ); }
	
	public function get_wpdb() { global $wpdb; return $wpdb; }
	
	public function get_posts( $args = null ) { return get_posts( $args ); }
	
	public function get_post( $id = null ) {return get_post( $id ); }
	
	public function get_template_directory() { return get_template_directory(); }
	
	public function get_plugin_dir() { return $this->_pluginDir; }
	
	public function set_plugin_dir( $pluginDir ) { $this->_pluginDir = $pluginDir; }
	
	public function wp_insert_term( $term, $taxonomy, $args = array() ) {
		return wp_insert_term( $term, $taxonomy, $args );
	}
	
	public function get_option( $option, $default = false ) {
		return get_option( $option, $default );
	}
	
	public function update_option( $option, $value ) {
		return update_option( $option, $value );
	}
	
	public function get_id_translation( $type, $oldId ) {
		$options = ffOpt::GetDBDirect( 'demoinstall_id_map', $type );
		if( !isset( $options[$oldId ] ) ) return false;
		else return $options[$oldId ];
	}
	
	public function set_id_translation( $type, $oldId, $newId ) {
		$options = ffOpt::GetDBDirect( 'demoinstall_id_map', $type );
		$options[$oldId] = $newId;
		$options = ffOpt::SetDBDirect( 'demoinstall_id_map', $type, $options );
	}
	
	public function wp_insert_post( $args, $wp_error = false ) {
		
		
		return wp_insert_post( $args, $wp_error );
	}
	
	public function wp_set_post_terms( $post_id, $terms, $taxonomy ) {
		wp_set_post_terms( $post_id, $terms, $taxonomy);
	}
	
	public function wp_update_nav_menu_item( $menu_id = 0, $menu_item_db_id = 0, $menu_item_data = array() ) {
		return wp_update_nav_menu_item( $menu_id, $menu_item_db_id, $menu_item_data);
	}

	
}