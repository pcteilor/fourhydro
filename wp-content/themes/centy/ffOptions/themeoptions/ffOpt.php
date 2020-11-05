<?php
  
class ffOpt{

	private static $_options = null;

	private static function _init(){
		if( ! empty( ffOpt::$_options ) ){
			return;
		}

		$structure = ffStructureFactory::get('to_Options')->getSection();
		$salOptions = new ffSalOptions();
		ffOpt::$_options = $salOptions->getData( $structure );
	}

	static function Get( $ID ){
		ffOpt::_init();
		return ffOpt::$_options->Get($ID);
	}

	static function GetBR( $ID ){
		return str_replace("\n", '<br />', trim( ffOpt::Get( $ID ) ));
	}

	static function SetDBDirect( $namespace, $name, $value ){
		if( is_array($value) or is_object($value) ) { $value = serialize($value); }
		$SQL = "DELETE FROM `".ffDBTO::getTableName()."` WHERE `namespace` = '$namespace' AND `name` = '$name'";
		$res = mysql_query( $SQL );
		$SQL = "INSERT INTO `".ffDBTO::getTableName()."` (`namespace`, `name`, `value`) VALUES ('$namespace', '$name', '$value')";
		$res = mysql_query( $SQL );
	}

	static function GetDBDirect( $namespace, $name ){
		$SQL = "SELECT `value` FROM `".ffDBTO::getTableName()."` WHERE `namespace` = '$namespace' AND `name` = '$name'";
		$res = @mysql_query( $SQL );
		if( $res ){
			if( $row = mysql_fetch_array( $res ) ){
				$value = $row['value'];
				if( 'a:' == substr($value, 0, 2) ){
					return unserialize($value);
				}
				if( 'o:' == substr($value, 0, 2) ){
					return unserialize($value);
				}
				return $value;
			}else{
				return null;
			}
		}
		return null;
	}
	
	static function GetDBDirectNamespace($namespace){
		$SQL = "SELECT `name`,`value` FROM `".ffDBTO::getTableName()."` WHERE `namespace` = '$namespace'";
		$res = mysql_query( $SQL );
		if($res){
			$ret = array();
			while( $row = mysql_fetch_array( $res ) ){
				$ret[ $row['name'] ] = $row['value'];
			}
			return $ret;
		}else{
			return array();
		}
	}

	static function GetWithHTMLEntities( $ID ){
		$val = "".ffOpt::Get( $ID );
		if( ! is_string($val) ){
			return "NOT STRING";
		}
		
		$val = str_replace( "&", "&amp;", $val);

		$replace =      array( "<"    , ">"    , '"'      , "'"     );
		$replace_with = array( "&lt;" , "&gt;" , '&quot;' , "&#39;" );
		
		$val = str_replace($replace, $replace_with, $val);

		return $val;
	}

}