<?php
abstract class ffBasicObject {
	
	/**
	 * 
	 * @var ffWPLayer
	 */
	protected $_WPLayer = null;
	
	
	/**
	 * 
	 * @var ffRuleManager
	 */
	protected $_ruleManager = null;
	
	
	/**
	 * List of all files which are part of the exported content
	 * @var unknown
	 */
	private $_adjustedFileList = array();
	
	public function __construct( ffWPLayer $WPLayer, ffRuleManager $ruleManager ) {
		$this->_setWPLayer( $WPLayer );
		$this->_setRuleManager($ruleManager);
	}
	
	protected function _setRuleManager( ffRuleManager $ruleManager) {
		$this->_ruleManager = $ruleManager;
	}
	
	/**
	 * 
	 * @return ffRuleManager
	 */
	protected function _getRuleManager() {
		return $this->_ruleManager;
	}
	
	protected function _setWPLayer( ffWPLayer $WPLayer ) {
		$this->_WPLayer = $WPLayer;
	}
	
	/**
	 * @return ffWPLayer
	 */
	protected function _getWPLayer() {
		return $this->_WPLayer;
	}
	
	protected function _loadDataFromFile( $path ) {
		require $this->_getWPLayer()->get_plugin_dir().'/content/'.$path;
		$loadedData = $data;
		$data = null;
		return $loadedData;
	}
	
	protected function _adjustFileList( $fileList, $contentType ) {
		$this->_adjustedFileList = $fileList[ $contentType ];
	}	
	
	protected function _getFileList() {
		return $this->_adjustedFileList;
	}
}