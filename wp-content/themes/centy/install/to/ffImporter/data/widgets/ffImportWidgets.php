<?php
class ffImportWidgets extends ffBasicObject implements ffIImportSection {
	
	private $_contentType = 'widgets';
	
	public function import( $fileList ) {
		$this->_adjustFileList( $fileList, $this->_contentType );
		$this->_importSidebarsWidgetsVariable();
		$this->_importAllWidgets();
	}
	
	private function _importSidebarsWidgetsVariable() {
		$onePost = $this->_loadDataFromFile('widgets/widgets/sidebars_widgets.php');
		$this->_getWPLayer()->update_option('sidebars_widgets', $onePost);
	}
	
	private function _importAllWidgets() {
		$fileList = $this->_getFileList();
		
		foreach( $fileList['widgets'] as $oneWidgetName ) {
			if( $oneWidgetName == 'sidebars_widgets') continue;
			$oneWidget =  $this->_loadDataFromFile('widgets/widgets/'.$oneWidgetName.'.php');
			$oneWidget = $this->_getRuleManager()->doAction( $this->_getRuleManager()->getReplaceRuleAction()->beforeInsertingWidget, $oneWidget, $oneWidgetName);
			$this->_getWPLayer()->update_option('widget_'.$oneWidgetName, $oneWidget);
		}
	}
}
