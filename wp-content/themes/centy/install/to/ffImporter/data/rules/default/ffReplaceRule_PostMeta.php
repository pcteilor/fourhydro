<?php
abstract class ffReplaceRule_PostMeta extends ffReplaceRule{
	
	private $_hookedMetaNames = array();
	
	protected function _hookActions() {
		$this->_addAction( $this->_getRuleManager()->getReplaceRuleAction()->beforeInsertingPost );
		$this->_hookMetas();
	}
	
	
	abstract protected function _replaceMeta( $metaValue, $metaName, $additionalInfo = null );
	abstract protected function _hookMetas();
	
	public function replace( $input, $additionalInfo = null ) {
		if( !isset($input->post_meta) || empty( $input->post_meta ) )
			return $input;
		
		return $this->_replaceSelectedMetas($input, $additionalInfo);
	}
	
	private function _replaceSelectedMetas( $input, $additionalInfo ) {
		$metas = $input->post_meta;
		
		foreach( $metas as $metaName => $metaValue ) {
			if( in_array( $metaName, $this->_hookedMetaNames ) ) {
				$metas[ $metaName ] = $this->_replaceMeta($metaValue, $metaName, $additionalInfo );
			}
		}
		
		$input->post_meta = $metas;
		return $input;
	}
	
	protected function _addHookedMeta( $metaName ) {
		$this->_hookedMetaNames[] = $metaName;
	}
}