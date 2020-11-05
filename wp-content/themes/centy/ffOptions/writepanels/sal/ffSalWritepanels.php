<?php

class ffSalWritepanels extends ffSal{
	const sPref = 't_';
	const sSuff = '.php';

	protected $post_ID;
	protected $post_type;
	function getPostType(){ return $this->post_type; }

	protected $writepanelIsActive = false;
	function isWritepanelActive(){ return $this->writepanelIsActive; }

	protected $structure;

	protected $metas;

	function __construct( $ID = null ){
		$this->post_ID = (null==$ID) ? ffWP::find_post_ID() : $ID;
		$this->post_type = get_post_type( $ID );
		
		// HAS POST TYPE WRITEPANELS ?
		
		if( ! file_exists( ffOptEnv::getDir(ffSalWritepanels::sPref) . '/' . ffSalWritepanels::sPref . $this->post_type . ffSalWritepanels::sSuff ) ){
			return;
		}
		
		$this->writepanelIsActive = true;

		$this->structure = ffStructureFactory::get( ffSalWritepanels::sPref . $this->post_type, ffSalWritepanels::sPref )->getSection();

		global $_POST;
		if( !empty( $_POST) ){
			if( isSet($_POST['action']) )
				if( 'inline-save' == $_POST['action'] )
					return;

			if( !isSet($_POST['post_ID']) ){
				return;
			}
			$this->deletePostMetas();
			$this->setData( $this->getFromPost()->getLikePOSTData() );
		}
	}

	public function setData( $data ){
		foreach ($data as $key=>$value) {
			add_post_meta($this->post_ID, $key, $value, true );
		}
	}

	public function loadData(){
		$this->loadPostMetas();
		
		$tree = new stdClass();
		$tree->childs = new stdClass();

		if( empty($this->structure) ){
			return null;
		}

		foreach ($this->structure->getChilds() as $substruct) {
			$substructKey = $substruct->getID();
			$tree->childs->$substructKey = new stdClass();
			$tree->childs->$substructKey->childs = new stdClass();
		}

		foreach ($this->metas as $key=>$value) {
			if( FALSE !== strpos($key, ffOptEnv::PATH_NAME_SEPARATOR) ){
				$this->addFromPost($tree->childs, $key, $value);
			}
		}

		return new ffData($this->structure, $tree);
	}

	public function getData(){
		return $this->loadData( $this->structure );
	}
	
	public function loadPostMetas(){
		global $_GET;
		$this->metas['__ff__metas_loaded'] = 1;
		$m = get_post_meta( $this->post_ID );
		$this->metas = array();

		// for NEW post/page
		if( empty($m) ){
			return;
		}

		foreach ($m as $k=>$v) {
			if( FALSE === strpos($k, ffOptEnv::PATH_NAME_SEPARATOR) ){
				continue;
			}
			$this->metas[$k]= $v[0];
		}
	}
	
	public function deletePostMetas(){
		// Repeatable fix - we dont know how many to delete
		global $wpdb;
		$SQL = "DELETE FROM $wpdb->postmeta WHERE post_id = $this->post_ID AND meta_key LIKE '%".ffOptEnv::PATH_NAME_SEPARATOR."%'";
		mysql_query( $SQL );
		// Repeatable fix end
	}
}