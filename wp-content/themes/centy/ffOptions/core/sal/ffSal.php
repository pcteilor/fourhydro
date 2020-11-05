<?php
class ffSal {
    const MAX_INSERTED_COLUMNS_COUNT = 100;
    /*
	public function setData( $data ){}
	public function loadData( $structure ){}

	public function getData( $structure ){
		if( !empty($this->data) ){
		return $this->data;
		}
		if( $this->isPossibleToUpdateByPostData() ) {
		$thi	s->setData( $this->getFromPost() );
		}
		return $this->data = $this->loadData( $structure );
	}
	*/
    public function isSetPostData(){ global $_POST; return ( ! empty($_POST) ); }
    public function isAdmin(){ return function_exists("is_admin") and is_admin(); }
    public function isCustomCheckerEnabled(){ return TRUE; }

    public function isPossibleToUpdateByPostData(){
        if( ! $this->isAdmin() ) return FALSE;
        if( ! $this->isSetPostData() ) return FALSE;
        if( ! $this->isCustomCheckerEnabled() ) return FALSE;
        return TRUE;
    }
    
    public function getPostValuesWithSubstring( $substr ){
        global $_POST;
        $data = array();
        foreach ($_POST as $key=>$value) {
            if( FALSE === strpos($key, $substr) ){ continue; }
            $data[$key] = ffOptEnv::stripPOSTslashes($value);
        }
        return $data;
    }
    
    public function getFromPost( ){
        $data = $this->getPostValuesWithSubstring( ffOptEnv::PATH_NAME_SEPARATOR );

        $tree = new stdClass();
        $tree->data = new stdClass();
        $tree->data->childs = new stdClass();

        foreach ($data as $key=>$value) {
            if( FALSE !== strpos($key, ffOptEnv::PATH_NAME_SEPARATOR . 0 . ffOptEnv::PATH_NAME_SEPARATOR) ){
                continue;
            }

            $this->addFromPost($tree->data->childs, $key, $value);
        }

        $tree = $this->recursiveUpdateRepeatablePostKeys( $tree );
        return new ffData($this->structure, $tree->data);
    }

    ////////////////////////////////////////////////////////////////////////////
    // This is for creating trees from $_POST-like array
    ////////////////////////////////////////////////////////////////////////////

    public function addFromPost( &$parent, $keyS, $value ){
        $keyS = explode( ffOptEnv::PATH_NAME_SEPARATOR, $keyS, 2 );
        if( empty($keyS[0]) ){ return; }
        $key0 = $keyS[0];
        if( !isSet($parent->$key0) ){
            $parent->$key0 = new stdClass();
            if( 2 == count($keyS) ){
                $parent->$key0->childs = new stdClass();
            }
        }

        if( 2 == count($keyS) ){
            $this->addFromPost( $parent->$key0->childs, $keyS[1], $value );
        }else{
            $parent->$key0->value = $value;
        }
    }

    public function recursiveUpdateRepeatablePostKeys( $childs ){
        $newKeys = array();
        foreach ($childs as $key=>$value) {
            if( isSet($value->childs) ){
                if( isSet($value->childs->_rptblIndex) ){
                    $index = $value->childs->_rptblIndex->value;
                    unset($value->childs->_rptblIndex);
                    if( !isset( $newKeys[ $index ] ) || empty ( $newKeys[ $index ]) )
                    	$newKeys[ $index ] = new stdClass();
                    $newKeys[ $index ]->childs = $this->recursiveUpdateRepeatablePostKeys($value->childs);;
                }else{
                    if( empty( $newKeys[ $key ] ) ){
                        $newKeys[ $key ] = new stdClass();
                    }
                    $newKeys[ $key ]->childs = $this->recursiveUpdateRepeatablePostKeys($value->childs);
                }
            }else{
                $newKeys[ $key ] = $value;
            }
        }

        ksort($newKeys);
        $newKeys = (object) $newKeys;

        return $newKeys;
    }

}
