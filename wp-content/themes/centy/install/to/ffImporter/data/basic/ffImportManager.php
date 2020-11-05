<?php
class ffImportManager extends ffBasicObject {
	/**
	 * 
	 * @var array[ffIImportSection]
	 */
	private $_sections = array();
	/**
	 * 
	 * @var array
	 */
	private $_fileList = null;
	public function import() {
		foreach( $this->_sections as $oneSection ) {
			$oneSection->import( $this->_fileList );
		}
	}
	
	public function addSection( ffIImportSection $importSection ) {
		$this->_sections[] = $importSection;
	}
	
	public function loadFileList() {
		$this->_fileList = $this->_loadDataFromFile('fileList.php');
	}
	
/******************************************************************************/
/* GETTERS AND SETTERS
/******************************************************************************/
	public function getFileList() {
		return $this->_fileList;
	}
}