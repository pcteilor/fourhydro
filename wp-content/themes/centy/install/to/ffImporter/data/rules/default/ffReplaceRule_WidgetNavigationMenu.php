<?php
class ffReplaceRule_WidgetNavigationMenu extends ffReplaceRule {
	private $_widgetNameFieldName = array();
	protected function _hookActions() {
		$this->_addAction( $this->_getActionsEnum()->beforeInsertingWidget );
	}
	public function replace( $input, $additionalInfo = null ) {
		$currentWidgetName = $additionalInfo;
		
		if( isset( $this->_widgetNameFieldName[ $currentWidgetName ] ) ) {
			$input = $this->_repairWidgets( $input, $this->_widgetNameFieldName[ $currentWidgetName ] );
		}
		return $input;
	}
	
	private function _repairWidgets( $input, $fields ) {
		
		foreach( $input as $widgetId => $widget ) {
			$input[$widgetId] = $this->_repairOneWidget($widget, $fields);
		}
		
		return $input;
	}
	
	private function _repairOneWidget( $input, $fields ) {
		if( !is_array($input) ) return $input;
		
		foreach( $fields as $oneField ) {
			if( !isset( $input[ $oneField ] ) ) continue;
			
			$oldMenuId = $input[ $oneField ];
			$newMenuId = $this->_getWPLayer()->get_id_translation('term_id', $oldMenuId );
			$input[ $oneField ] = $newMenuId;
			
		}
		
		return $input;
	}
	
	public function addWidgetAndFieldName( $widgetName, $fieldName ) {
		$this->_widgetNameFieldName[ $widgetName ][] = $fieldName;
	}
}