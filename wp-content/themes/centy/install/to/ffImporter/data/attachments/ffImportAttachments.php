<?php
class ffImportAttachments extends ffBasicObject implements ffIImportSection {
	public function import( $fileList) {
		$this->_adjustFileList( $fileList, 'attachments'  );
		foreach( $this->_getFileList() as $postType => $posts) {
			$this->_insertPosts( $postType, $posts );
		}
	}
	
	private function _insertPosts( $postType, $posts ) {
		foreach( $posts as $onePostId ) {
			
			
			$onePost = $this->_loadDataFromFile('attachments/'.$postType.'/'.$onePostId.'.php');
			
			if( $this->_getWPLayer()->get_id_translation('attachment', $onePost->ID ) !== false ) continue;
			$uploadDirs = wp_upload_dir();
			$baseDir = $uploadDirs['path'];
			//var_dump( $uploadDirs );

			
			//$oldDest =  $this->_getWPLayer()->get_plugin_dir().'/content/attachments/attachments/'.$onePost->guid;
			$oldDest = get_template_directory().'/photos/'.$onePost->guid;
			$newDest = $baseDir.'/'.$onePost->guid;
			
			copy( $oldDest, $newDest );

			$wp_filetype = wp_check_filetype(basename($newDest), null );
			$wp_upload_dir = wp_upload_dir();
			$attachment = array(
					'guid' => $wp_upload_dir['url'] . '/' . basename( $newDest ),
					'post_mime_type' => $wp_filetype['type'],
					'post_title' => preg_replace('/\.[^.]+$/', '', basename($newDest)),
					'post_content' => '',
					'post_status' => 'inherit'
			);
			
			$attach_id = wp_insert_attachment( $attachment, $newDest, 0 );
			// you must first include the image.php file
			// for the function wp_generate_attachment_metadata() to work
			require_once(ABSPATH . 'wp-admin/includes/image.php');
			$attach_data = wp_generate_attachment_metadata( $attach_id, $newDest );
			wp_update_attachment_metadata( $attach_id, $attach_data );
			$this->_getWPLayer()->set_id_translation('attachment', $onePost->ID, $attach_id);
		}
	}
	
}
