<?php
/**
 * themeOptions
 *
 * this class automatically loads all theme options after start. You can set and get these options. 
 * !! theme options are stored in 2D field [ NAMESPACE ] [ ATTRIBUTE ]
 * 
 * @author freshface
 */
class fOpt
{
    public static $opt = null;				// here we store all theme options in format [ NAMESPACE ] [ ATTRIBUTE ]
    public static $opt_current = null;		// here we store all current theme options 
    public static $table_name = null;		// here we store the name of the SQL option table
    
	/**
	 * Create required table (if not exists) 
	 *
	 * @author freshface
	 */
    private static function Install() {
        //$db = new ffDBTO();
        //$db->install();
    }
    
    /**ě
     * Load all theme options into array
     *
     * @author freshface
     */    
    public static function Init() {
    	self::Load();
    }
    
	/**
	 * Load all theme options into array
	 *
	 * @author freshface
	 */    
	private static function Load() {
		self::$opt = null;
	    global $wpdb; self::$table_name = $wpdb->prefix."gen_options";
	    $sql = "SELECT * FROM ".self::$table_name;
	    $result = mysql_query( $sql );
	    if($result == false) { 
	    	self::Install();
	    	return;
	    }
	    while( $row = mysql_fetch_array( $result ) ) {
	        self::$opt[ $row['namespace'] ][ $row['name'] ] = $row[ 'value' ];
	    }
	}    
	public static function DeleteNamespace ( $namespace ) {
		if( isset( self::$opt[ $namespace ] ) ) {
			$sql = "DELETE FROM ". self::$table_name . " WHERE namespace = '$namespace'";
			mysql_query( $sql );
			unset( self::$opt[ $namespace ] );
		}
	}
	
	public static function Delete( $namespace, $name ) {
		if( isset( self::$opt[ $namespace ][ $name ] ) ) {
			$sql = "DELETE FROM ". self::$table_name . " WHERE namespace = '$namespace' AND name = '$name' ";
			mysql_query( $sql );
			unset( self::$opt[ $namespace ][ $name ] );
		}
	}

	public static function SetCurrent( $namespace, $name, $value ) {
		self::$opt_current[ $namespace ][ $name ] = $value;
	}
	
	public static function GetCurrent( $namespace, $name ) {
		if( isset( self::$opt_current[ $namespace ][ $name ]) ) {
			return self::$opt_current[ $namespace ][ $name ];
		} else {
			return null;
		}
	}
	
	public static function DuplicateNamespace( $namespace, $new_namespace ) {
		$ns_data = fOpt::GetNamespace( $namespace );
		foreach( $ns_data as $one_data_name => $one_data_value ) {
			fOpt::Set( $new_namespace , $one_data_name , $one_data_value );
		}
	}

	/**
	 * Set option and save it into the SQL
	 *
	 * @author freshface
	 */ 	
    public static function Set( $namespace, $name, $value ) {
    	if( get_magic_quotes_gpc() ) $value = stripslashes( $value );
    	$value = addslashes( $value );

    	// do theme option exists ?
    	if( !isset(self::$opt[ $namespace ][ $name ]) ) {    	
			$sql = "INSERT INTO ".self::$table_name." (name, value, namespace) VALUES ('$name', '$value', '$namespace')";
			mysql_query( $sql );	
    	} else  {
			$sql = "UPDATE ".self::$table_name." SET value = '$value', namespace = '$namespace' WHERE name = '$name' AND namespace = '$namespace'";
			mysql_query( $sql );    	
    	}
    	
    	self::$opt[ $namespace ][ $name ] = $value;   
		//var_dump(self::$opt);
    }	
	
    public static function SetClean( $namespace, $name, $value ) {
    	//$value = addslashes( $value );

    	// do theme option exists ?
    	if( !isset(self::$opt[ $namespace ][ $name ]) ) {    	
			$sql = "INSERT INTO ".self::$table_name." (name, value, namespace) VALUES ('$name', '$value', '$namespace')";
			mysql_query( $sql );	
    	
		} else  {
			$sql = "UPDATE ".self::$table_name." SET value = '$value', namespace = '$namespace' WHERE name = '$name' AND namespace = '$namespace'";
			mysql_query( $sql );    		
		}
    	
    	self::$opt[ $namespace ][ $name ] = $value;   
		
		//var_dump(self::$opt);
    }	
	
	public static function GetClean( $namespace, $name ) {
		if( isset(self::$opt[ $namespace ][ $name ]) )
			return (self::$opt[ $namespace ][ $name ]);
		else return null;
	}
	
	public static function SetObject( $namespace, $name, $value ) {
	 
		$object = serialize( $value );
		
		self::Set( $namespace, $name, $object );
	
	}
	
    public static function SetInput( $namespace, $name, $value ) {
        if( get_magic_quotes_gpc() ) $value = stripslashes( $value );
        self::Set( $namespace, $name, $value );
    }	
	
	/**
	 * Get requested option
	 */
	public static function Get( $namespace, $name, $default = null ) {
		if( isset(self::$opt[ $namespace ][ $name ]) )
			return stripslashes(self::$opt[ $namespace ][ $name ]);
		else return $default;
	}
	public static function GetObject( $namespace, $name ) {
		$object = self::Get( $namespace, $name );
		    	
		if( $object == null ) return $object;
				
		$object = unserialize( $object );
		
		return $object;
	}
	public static function GetNamespace( $namespace ) {
		if( isset(self::$opt[ $namespace ] ) ) {
			$namespaceNew = array();
			foreach( self::$opt[$namespace ] as $key => $value ) { 
				if( !is_object( $value ) && !is_array( $value ) ) {
					$namespaceNew[ $key ] = stripslashes( $value );
				} else {
					$namespaceNew[ $key ] = $value;
				}
			}
			return $namespaceNew;
		//	return (self::$opt[ $namespace ] );
		}
		else return null;
	}
	
	public static function PrintIt( $namespace, $name ) {
		echo self::Get($namespace, $name);
	}
	public static function IsTrue( $namespace, $name ) {
		if( self::Get($namespace, $name) === 1 ||  self::Get($namespace, $name) === '1' )
			return true;
		else 
			return false;
	}
	public static function IsNotFalse( $namespace, $name ) {
		if( self::Get($namespace, $name) !== 0)
			return true;
		else 
			return false;
	}

	public static function CatOption( $category, $name ) {
		$actual_cat = self::getActualCat();
		if( $category == true) {
			return fOpt::Get('cm-cat-opt-'.$actual_cat, $name );
		} else {
			return fOpt::Get('cm-sin-opt-'.$actual_cat, $name );
		}
	}
	
}
fOpt::Init();
