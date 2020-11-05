<?php
 /**
  * fLoader
  * 
  * Browse directories and automatically load the files. Good 
  */
  

 
class fLoader {
	public static $loadedFiles = array();
	
	public static function loadTemplates( $dir ) {
		
		if (is_dir($dir)) {
		    if ($dh = opendir($dir)) {
		        while (($file = readdir($dh)) !== false) {
		        	$filetype = filetype( $dir . $file );
					if( $filetype == 'file' && strpos( $file, '.php') != false ) {
						//require_once $dir . $file;
						self::parseTemplate( $dir , $file );	
											
					}
				}
		        closedir($dh);
		    }
		}	
	}
	
	private static function parseTemplate( $dir, $file ) {
		$template_data_names = fSettings::$template_data_names;
		$template_data = get_file_data( $dir. $file, $template_data_names );
		$template_data['Filename'] = basename( $dir ).'/' . $file;
 		fEnv::addTemplate( $template_data );
	}
	
	/**
	 * loadFolder
	 * 
	 * load all .php files located directly in the folder ( no sub folders )
	 */
	public static function loadFolder( $dir ) {
		if (is_dir($dir)) {
		    if ($dh = opendir($dir)) {
		        while (($file = readdir($dh)) !== false) {
		        	$filetype = filetype( $dir . $file );
					
					if( $filetype == 'file' && strpos( $file, '.php') != false ) {
						
						require_once $dir . $file;						
					}
				}
		        closedir($dh);
		    }
		}	
	}
	
	/**
	 * Require Once all files and subfiles in the folder
	 * @param string Absolute path to the folder
	 * @return void
	 */	
	public static function loadFolderRecursive( $path ) {
		// read all elements in current folder
		$elements_in_current_folder = self::readFolder( $path );

		// go through all elements in folder. If its file, then require. If its folder, then load
		foreach( $elements_in_current_folder as $one_el ) {
			if( $one_el['type'] == 'file'  && strpos( $one_el['path'],'.php') !== false) {
				//echo $one_el['path'] . "\n";
				self::$loadedFiles[] = $one_el['path'];
				require_once $one_el['path'];
			} else if ( $one_el['type'] == 'dir' ) {
				self::loadFolderRecursive( $one_el['path'].'/' );
			}
		}
	}
	
	/**
	 * Find all files / dirs in the first level of the folder
	 * 
	 * @param string Absolute path to the folder
	 * @return array of files / dirs
	 */
	public static function readFolder( $path ) {
		$list_of_elements = array();				// we will be returning this
		
		// go through all elements in the folder and store them in the array
		if ( is_dir( $path ) ) {		
		    if ( $dh = opendir( $path ) ) {
		        while ( ( $file = readdir($dh) ) !== false) {
		        	
		        	$filetype = filetype( $path . $file );
					if( ( $filetype == 'file' || $filetype == 'dir' ) && $file != '.' && $file != '..' ) {
						// store info about element into array, so we dont need to call filetype function again
						$one_element = array( 'path' => $path.$file, 'type' => $filetype );
						$list_of_elements[] = $one_element;
					}
					
		        		
				}
		        closedir($dh);
		    }
		}
		// sort the array A-Z
		sort($list_of_elements);
		// return sorted array
		return $list_of_elements;
	}
	public static function getLoadedFiles() {
		foreach( self::$loadedFiles as $key => $oneFile ) {
			self::$loadedFiles[ $key ] = str_replace( ABSPATH, '', $oneFile);
		}
		
		return self::$loadedFiles;
	}
	public static function loadForEndUser() {
		
		( is_admin() ) ? $pathes = fLoaderData::$pathesAdmin : $pathes = fLoaderData::$pathesUser;
		foreach( $pathes as $onePath ) {
			require_once ABSPATH . $onePath;
		}
	}
} 
?>