<?php

class ffPrinterBEWP{

	protected $data;
	protected $prefix;

	function __construct($data){
		$this->data = $data;
		$this->prefix = $data->getID().ffOptEnv::PATH_NAME_SEPARATOR;
	}

	function printStructure(){
		echo '<div class="ff_writepanel ff_WP">';
		echo '<div class="section '.$this->data->getID();
		$page_templates = $this->data->getParam('page_template');
		if( !empty($page_templates) ){
			echo ' writepanel_dependable_on_page_templates" data-page_templates="|';
			echo implode("|",$page_templates);
			echo '|';
		}
		echo '">';
		echo '<div class="section-content">';
		$ffBEC = new ffPrinterBEComponents();
		$ffBEC->printBackEnd($this, $this->data);
		echo '</div>';
		echo '</div>';
		echo '</div>';
	}

	function get_field_id($id){     return $this->get_field($id); }
	function get_field_name($name){ return $this->get_field($name); }

	function get_field($id){ return $this->prefix . $id; }
}