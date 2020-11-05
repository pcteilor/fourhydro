<?php
class ffRuleManager extends ffBasicObject {
	/**
	 * 
	 * @var array[string][ffReplaceRule]
	 */
	private $_replaceRulesByHooks = array();
	
	/**
	 * 
	 * @var ffReplaceRuleActions
	 */
	private $_actionsEnum = null;
	
	
	public function __construct( ffWPLayer $WPLayer, ffReplaceRuleActions $actionsEnum ) {
		$this->_setWPLayer($WPLayer);
		$this->_setReplaceRuleActions($actionsEnum);
	}
	
	public function addRule( ffReplaceRule $replaceRule ) {
		$actions = $replaceRule->getHookedActions();
		
		foreach( $actions as $oneAction ) {
			$this->_addRuleToAction( $oneAction, $replaceRule);
		}
	}
	
	public function doAction( $actionName, $input, $additionalInfo = null ) {
		if( isset( $this->_replaceRulesByHooks[$actionName]) && !empty( $this->_replaceRulesByHooks[$actionName] ) ) {
			foreach( $this->_replaceRulesByHooks[$actionName] as $oneRule ) {
				
				$input = $oneRule->replace( $input, $additionalInfo );
			}
		}
		
		return $input;
	}
	
	private function _addRuleToAction( $actionName, ffReplaceRule $replaceRule ) {
		$this->_replaceRulesByHooks[ $actionName ][] = $replaceRule;
	}
	
	private function _setReplaceRuleActions( ffReplaceRuleActions $actionsEnum ) {
		$this->_actionsEnum = $actionsEnum;
	}
	
	/**
	 * 
	 * @return ffReplaceRuleActions
	 */
	public function getReplaceRuleAction() {
		return $this->_actionsEnum;
	}
}