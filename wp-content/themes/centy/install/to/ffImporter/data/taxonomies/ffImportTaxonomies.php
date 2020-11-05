<?php
class ffImportTaxonomies extends ffBasicObject implements ffIImportSection {
	public function import( $fileList ) {
		$this->_adjustFileList( $fileList, 'taxonomies' );
		foreach( $this->_getFileList() as $taxonomy => $terms) {
			$this->_insertTerms( $taxonomy, $terms );
		}
	}
	
	private function _insertTerms( $taxonomy, $terms ) {
		foreach( $terms as $oneTermId ) {
			$oneTerm = $this->_loadDataFromFile('taxonomies/'.$taxonomy.'/'.$oneTermId.'.php');
			if( $this->_getWPLayer()->get_id_translation('term_id', $oneTerm['id'] ) !== false ) continue;
			$newIds = ($this->_getWPLayer()->wp_insert_term($oneTerm['name'], $taxonomy));
			if( $newIds instanceof WP_Error ) {
				if( !empty( $newIds->error_data['term_exists'] ) ){
					// OK, it is here already
				}else{
					echo '<hr/>';
					echo '<pre>';
					print_r($newIds);
					echo '</pre>';
					echo '<hr/>';
					die('FATAL ERROR IN DEMO CONTENT INSTALL');
				}
			} else {
				$this->_getWPLayer()->set_id_translation('term_id', $oneTerm['id'], $newIds['term_id']);
				$this->_getWPLayer()->set_id_translation('term_taxonomy_id', $oneTerm['id'], $newIds['term_taxonomy_id']);

				$ID = $newIds['term_id'];
				$metas = array();
				foreach ($oneTerm as $key=>$value) {
					if( 0 === strpos($key, '_SP_') ){
						$meta_key = substr($key, 4);
						$metas[ $meta_key ] = $value;
					}
				}
				if( !empty($metas) ){
					ffSalSPDB::saveSingle($taxonomy,$ID,$metas);
				}

			}
		}
	}
}