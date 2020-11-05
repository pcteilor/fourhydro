<?php
class fCssHelper {
	private $styles = array();
	private $selector = null;
	
	public function __construct( $selector_name = null ) {
		if( $selector_name != null) 
			$this->setSelector($selector_name);
	}
	
	public function setSelector( $selector_name ) {
		$this->selector = $selector_name;
	}
	
	public function addStyle( $name, $value, $after = null ) {
		$this->styles[] = array( 'name'=> $name, 'value'=> $value.$after);
	}
	
	public function printStyle( $prefix = null) {
		echo $prefix.' '.$this->selector;
		echo '{';
		foreach( $this->styles as $one_style ) {
			echo $one_style['name'] . ':' . $one_style['value'] . '; ';
		}
		echo '}';
	}
}

class fCssHelperContainer {
	private $actual_selector = null;
	private $data_holder = array();
	private $prefix_name = null;
	
	public function __construct( $selector_name ) {
		$this->setSelector($selector_name);
	}
	
	public function setPrefix( $prefix_name ) {
		$this->prefix_name = $prefix_name;
	}
	
	public function setSelector( $selector_name ) {
		$this->actual_selector = $selector_name;
	}
	
	public function addStyle( $name, $value, $after = null ) {
		$this->data_holder[ $this->actual_selector ][] = array('name'=>$name, 'value'=>$value.$after);
	}
	
	public function printStyle($prefix = null) {
		
		foreach( $this->data_holder as $selector_name => $attributes ) {
			echo $prefix.' '. $this->prefix_name . ' ' . $selector_name;
			echo '{';
				foreach( $attributes as $one_attribute ) {
					echo $one_attribute['name'] . ':' . $one_attribute['value'] . ';'."\n";
				}
			echo '} ';
		}
	}
}
?>