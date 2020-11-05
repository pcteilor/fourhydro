<?php
class ffReplaceRule_PostParent extends ffReplaceRule {
	protected function _hookActions() {
		$this->_addAction( $this->_getActionsEnum()->beforeInsertingPost );
	}
	public function replace( $input, $additionalInfo = null ) {
		if( empty($input->post_parent) ) {
			return $input;
		}
		$oldId = $input->post_parent;
		$newId = $this->_getWPLayer()->get_id_translation('post', $oldId);
		$input->post_parent = $newId;
		return $input;
	}
}