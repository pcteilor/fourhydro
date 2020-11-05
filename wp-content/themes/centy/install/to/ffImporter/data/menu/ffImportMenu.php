<?php
class ffImportMenu extends ffBasicObject implements ffIImportSection {
	
	private $_contentType = 'menu';
	
	public function import( $fileList ) {
		$this->_adjustFileList( $fileList, $this->_contentType );
		
		foreach( $this->_getFileList() as $postType => $posts) {
			$this->_insertPosts( $postType, $posts );
		}
	}
	
	private function _insertPosts( $postType, $posts ) {
		foreach( $posts as $onePostId ) {
			$onePost = $this->_loadDataFromFile('menu/'.$postType.'/'.$onePostId.'.php');

			if( $this->_getWPLayer()->get_id_translation('menu_item', $onePost->ID ) !== false ) continue;
			
			$data = $this->_getAllInfo($onePost);
			$args = $this->_createMenuArgs( $data );

			$insertedMenuNewId = $this->_getWPLayer()->wp_update_nav_menu_item($data['menuNewId'],0, $args);
			$this->_getWPLayer()->set_id_translation('menu_item', $onePost->ID, $insertedMenuNewId);
		}
	}
	
	private function _createMenuArgs( $data ) {
		$url = trim( $data['url'] );
		if( !empty( $url ) ){
			if( '/' == substr($url, 0, 1) ){
				$url = get_template_directory_uri() . $url;
			}
		}
		
		$defaults = array(
				'menu-item-object-id' => $data['objectNewId'],
				'menu-item-object' => $data['objectType'],
				'menu-item-parent-id' => $data['menuItemParentNewId'],
					
				'menu-item-type' => $data['objectTypeWp'],
				'menu-item-title' => $data['title'],
				'menu-item-url' => $url,
				'menu-item-description' => $data['description'],
				'menu-item-attr-title' => '',
				'menu-item-target' => '',
				'menu-item-classes' => '',
				'menu-item-xfn' => '',
				'menu-item-status' => '',
				'menu-item-status' => 'publish'
		);
		return $defaults;
	}
	
	private function _getAllInfo( $onePost ) {
		$info['title'] = $onePost->post_title;
		$info['description'] = $onePost->post_content;
		$info['url'] = $onePost->post_meta['_menu_item_url'];

		
		$info['objectType'] = $onePost->post_meta['_menu_item_object'];
		$info['objectTypeWp'] = $onePost->post_meta['_menu_item_type'];
		
		switch( $info['objectTypeWp'] ) {
			case 'post_type':
				$info['objectTypeOur'] = 'post';
				break;
			case 'taxonomy':
				$info['objectTypeOur'] = 'term_id';
				break;				
			case 'custom': 
				$info['objectTypeOur'] = 'custom';
				break;
			default:
				$info['objectTypeOur'] = 'term_id';
				break;
		}

		// Menu TERM
		$info['menuOldId'] = $onePost->connected_taxonomies[0]['term_id'];
		$info['menuNewId'] = $this->_getWPLayer()->get_id_translation('term_id', $info['menuOldId']);

		// Menu ITEM
		$info['objectOldId'] = $onePost->post_meta['_menu_item_object_id'];
		$info['objectNewId'] = $this->_getWPLayer()->get_id_translation($info['objectTypeOur'], $info['objectOldId']);

		if( $onePost->post_meta['_menu_item_menu_item_parent'] == 0 )
			$info['menuItemParentNewId'] = 0;
		else 
			$info['menuItemParentNewId'] = $this->_getWPLayer()->get_id_translation('menu_item', $onePost->post_meta['_menu_item_menu_item_parent']);
		
		return $info;
	}
}