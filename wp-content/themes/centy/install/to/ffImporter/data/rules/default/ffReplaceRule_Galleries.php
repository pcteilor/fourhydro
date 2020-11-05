<?php
class ffReplaceRule_Galleries extends ffReplaceRule {
	private $_galleryMetaNames = array();
	
	protected function _hookActions() {
		$this->_addAction( $this->_getActionsEnum()->beforeInsertingPost );
	}
	
	public function addGalleryMetaName( $galleryMetaName ) {
		$this->_galleryMetaNames[] = $galleryMetaName;
	}
	
	public function replace( $input, $additionalInfo = null  ) {
		foreach( $this->_getGalleryMetaNames() as $oneName ) {
			if( isset($input->post_meta) && isset($input->post_meta[$oneName] ) ) {
				$replacedMeta = $this->_replaceOneMetaIds( $input->post_meta[ $oneName ]);
				$input->post_meta[ $oneName ] = $replacedMeta;
			}
		}
		return $input;
	}
	
	private function _replaceOneMetaIds( $items ) {
        $items = trim($items);
        if( empty( $items ) ) return $items;

		if( FALSE !== strpos($items, ",") ){
			$items = explode(",", $items);
		}else{
			$items = array( $items );
		}

		$ret = array();

        $_wpLayer = $this->_getWPLayer();
		foreach ($items as $key=>$ID) {
            $ID = ceil( 1 * $ID );
			$ret[] = $_wpLayer->get_id_translation('attachment', $ID );
		}

		return implode(",", $ret);
	}
	
	private function _getGalleryMetaNames() {
		return $this->_galleryMetaNames;
	}
}
