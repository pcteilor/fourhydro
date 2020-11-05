<?php
/**
 * Url rewriter allows you to work with url
 * @author freshface
 * @package Genius Framework
 */
class gfwUrlRewriter {
	private $current_url = '';
	private $current_url_clean = '';
	private $pars_url = '';
	private $params = array();
	public function __construct() {
		$wpurl = site_url();
		$this->current_url = 'http://' . $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		$this->current_url_clean = str_replace( $wpurl, '', $this->current_url); 
		$this->pars_url =parse_url($this->current_url_clean); 
		
		if( !empty( $this->pars_url['query'] ) ) {
			$parameters = split('&', $this->pars_url['query']);
			foreach( $parameters as $one_param ) {
				$param = null;
				$splited = split('=', $one_param);
				$this->params[ $splited[0] ] = $splited[1];
				
			}
		}
	}
	public function deleteParam($name ) {
		unset( $this->params[$name]);
	}
	public function addParam( $name, $value ) {
		$this->params[$name] = $value;
	}
	
	public function getParam( $name ) {
		return $this->params[$name];
	}
	
	public function getUrl() {
		$query ='';
		
		foreach( $this->params as $name => $value ) {
			$query .= $name . '=' . $value .'&';
		}
		
		$query = substr($query, 0, strlen($query) - 1);
		
		$url = site_url() . $this->pars_url['path']. '?' . $query;
		
		
		
		return $url;
	}
}
