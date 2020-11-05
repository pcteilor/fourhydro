<?php
class ffLink {
	private $_class = array();
	private $_attributes = array();
	private $_id = null;
	private $_href = null;
	private $_innerHtml = null;
	
	public function addClass( $class ) {
		$this->_class[] = $class;
		return $this;
	}
	
	public function addAttr( $name, $value ) {
		$this->_attributes[ $name ] = $value;
		return $this;
	}
	
	public function setHref( $url ) {
		$this->_href = $url;
		return $this;
	}
	
	public function setId( $id ) {
		$this->_id = $id;
		return $this;
	}
	
	public function setHtml( $html ) {
		$this->_innerHtml = $html;
		return $this;
	}
	
	public function render() {
		echo '<a ';
		$this->_renderId();
		$this->_renderClass();
		$this->_renderHref();
		$this->_renderAttributes();
		echo '>';
		$this->_renderInnerHtml();
		echo '</a>';
	}
	
	private function _renderId() {
		if( !empty( $this->_id ) ) {
			echo 'id="'.$this->_id.'" ';
		}
	}
	
	private function _renderClass() {
		if( !empty( $this->_class ) ) {
			echo 'class="';
			foreach( $this->_class as $oneClass ) {
				echo $oneClass.' ';
			}
			echo '" ';
		}
	}
	
	private function _renderHref() {
		if( !empty($this->_href) ) {
			echo 'href="'.$this->_href.'" ';
		}
	}
	
	private function _renderAttributes() {
		if( !empty( $this->_attributes ) ) {
			foreach( $this->_attributes as $name => $value ) {
				// attribute="value" ;
				echo $name;
				echo '="';
				echo $value;
				echo '" ';
			}
		}
	}
	
	private function _renderInnerHtml() {
		if( !empty( $this->_innerHtml ) ) {
			echo $this->_innerHtml;
		}
	}
}