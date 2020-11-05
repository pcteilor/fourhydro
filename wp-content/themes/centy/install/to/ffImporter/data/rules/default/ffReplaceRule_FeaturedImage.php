<?php
class ffReplaceRule_FeaturedImage extends ffReplaceRule {
	protected function _hookActions() {
		$this->_addAction( $this->_getActionsEnum()->beforeInsertingPost );
	}
	public function replace( $input, $additionalInfo = null ) {
		if( isset($input->post_meta) && isset($input->post_meta['_thumbnail_id'] ) ) {
			$oldId = $input->post_meta['_thumbnail_id'];
			$newId = $this->_getWPLayer()->get_id_translation('attachment', $oldId);
			$input->post_meta['_thumbnail_id'] = $newId;
		}
		return $input;
	}
}