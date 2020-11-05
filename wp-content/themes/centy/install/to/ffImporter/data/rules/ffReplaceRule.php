<?php
abstract class ffReplaceRule extends ffBasicObject {
	/**
	 * 
	 * @var ffWPLayer
	 */
	private $_WPlayer = null;
	private $_hookedActions = array();
	
	/**
	 * 
	 * @var ffReplaceRuleActions
	 */
	private $_actionsEnum = null;
	
	public function __construct( ffWPLayer $WPLayer, ffReplaceRuleActions $actionsEnum ) {
		$this->_setWPLayer($WPLayer);
		$this->_setActionsEnum($actionsEnum);
		$this->_hookActions();
	}
	
	abstract protected function _hookActions();
	abstract public function replace( $input, $additionalInfo = null );
	
/******************************************************************************/
/* GETTERS AND SETTERS
/******************************************************************************/
	public function getHookedActions() {
		return $this->_hookedActions;
	}
	
	protected function _addAction( $actionName ) {
		$this->_hookedActions[] = $actionName;
	}
	
	private function _setActionsEnum( ffReplaceRuleActions $actionsEnum ) {
		$this->_actionsEnum = $actionsEnum;
	}		
	
	/**
	 * 
	 * @return ffReplaceRuleActions
	 */
	protected function _getActionsEnum() {
		return $this->_actionsEnum;
	}
	

}