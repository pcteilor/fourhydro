<?php
class fLiveDataHolder {
	public static $skins = null;
	public static $headerSkins = null;
	public static $sliders = null;
	public static $tb = null;
	public static $blog = null;
	public static $portfolio = null;
	public static $single = null;
	public static $page = null;

	public static function init() {
		self::$skins = array(
				array('name'=>'Washed Turqoise','value'=>'washed_turquoise'),
				array('name'=>'Washed Blue','value'=>'washed_blue'),
				array('name'=>'Washed Coffee','value'=>'washed_coffee'),
				array('name'=>'Blue','value'=>'blue'),
				array('name'=>'Purple','value'=>'purple'),
				array('name'=>'Green','value'=>'green'),
				array('name'=>'Gold','value'=>'gold'),
				array('name'=>'Orange','value'=>'orange'),
				array('name'=>'Grey','value'=>'grey'),
				array('name'=>'Burgundy','value'=>'burgundy'),
				array('name'=>'Dark Green','value'=>'dark_green'));
		self::$headerSkins = array( array('name'=>'Black','value'=>'black'),
				array('name'=>'Dark Grey','value'=>'dark_grey'),
				array('name'=>'Light Grey','value'=>'light_grey'),
				array('name'=>'White','value'=>'white'));

		self::$sliders = array(
				array('name'=>'Tabbed', 'value'=>'tabbed_demo'),
				array('name'=>'Accordeon', 'value'=>'accordeon_demo'),
				array('name'=>'Cubes', 'value'=>'cubes_demo'),
				array('name'=>'3D', 'value'=>'3d_demo') );

		self::$tb = array( array('name'=>'Templ 1', 'value'=>'http://demo.freshface.net/file/ed/wp/category/uncategorized/'),
				array('name'=>'Templ ', 'value'=>'http://demo.freshface.net/file/ed/wp/'),);

		self::$blog = array(
				array('name'=>'Blog', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog'),
				array('name'=>'Blog 1', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-1'),
				array('name'=>'Blog 2', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-2'),
				array('name'=>'Blog 3', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-3'),
				array('name'=>'Blog 4', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-4'),
				array('name'=>'Blog 5', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-5'),
				array('name'=>'Blog 6', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-6'),
				array('name'=>'Blog 7', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-7'),
				array('name'=>'Blog 8', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-8'),
				array('name'=>'Blog 9', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-9'),
				array('name'=>'Blog 10', 'value'=>'http://demo.freshface.net/file/ed/wp/category/blog/blog-10'),
				);

		self::$portfolio = array( array('name'=>'Portfolio', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio'),
				array('name'=>'Sortable', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/sortable'),
				array('name'=>'Portfolio 1', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-1'),
				array('name'=>'Portfolio 2', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-2'),
				array('name'=>'Portfolio 3', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-3'),
				array('name'=>'Portfolio 4', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-4'),
				array('name'=>'Portfolio 5', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-5'),
				array('name'=>'Portfolio 6', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-6'),
				array('name'=>'Portfolio 7', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-7'),
				array('name'=>'Portfolio 8', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-8'),
				array('name'=>'Portfolio 9', 'value'=>'http://demo.freshface.net/file/ed/wp/category/portfolio/portfolio-9'),
				);
		self::$single =  array(
				array('name'=>'Single', 'value'=>4),
				array('name'=>'Single 1', 'value'=>4),
				array('name'=>'Single 2', 'value'=>80),
				array('name'=>'Single 3', 'value'=>42),
				array('name'=>'Single 4', 'value'=>86),
				array('name'=>'Single 5', 'value'=>83),
				array('name'=>'Single 6', 'value'=>76),
				array('name'=>'Single 7', 'value'=>35),
				array('name'=>'Single 8', 'value'=>30),
				array('name'=>'Single 9', 'value'=>67),


				);

		self::$page = array( array('name'=>'Templ 1', 'value'=>'http://demo.freshface.net/file/ed/wp/category/uncategorized/'),
				array('name'=>'Templ ', 'value'=>'http://demo.freshface.net/file/ed/wp/'),);


		foreach( self::$single as $key=> $val ) {
			$val['value'] = get_permalink( $val['value'] );
			self::$single[ $key ] = $val;
		}

	}


}
fLiveDataHolder::init();

class fCustomPanelManager {
	/**
	 *
	 * @var fCustomPanelManager
	 */
	private static $_instance = null;

	/**
	 * @return fCustomPanelManager
	 */

	public $themeSkin = null;
	public $headerSkin = null;
	public $slider = null;
	public $blogTemplate = null;
	public $portfolioTemplate = null;
	public $singleTemplate = null;
	public $url = null;

	private function _searchForId($id, $array) {
		foreach ($array as $key => $val) {

			if ( $val['value'] == $id) {
				return $key;
			}
		}
		return null;
	}

	private function _searchForIdSignle($id, $array) {
		foreach ($array as $key => $val) {

 			if ( $val['value'] == $id) {
				return $key;
			}
		}
		return null;
	}

	public static function getInstance() {
		if( self::$_instance == null ) {
			self::$_instance = new fCustomPanelManager();
		}
		return self::$_instance;
	}


	public function __construct() {
		$this->_fillOptions();
	}

	private function _fillOptions() {
		$this->url = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$this->_fillSkin();
		$this->_fillHeaderSkin();
		$this->_fillSlider();
		$this->_fillBlogTemplate();
		$this->_fillPortfolioTemplate();
		$this->_fillSingleTemplatE();
	}

	private function _fillBlogTemplate() {
		$blogArr = fLiveDataHolder::$blog;
		$searched = ($this->_searchForId($this->url, $blogArr));

		if( $searched !== null ) {

			$this->blogTemplate = $blogArr[ $searched ]['value'];
		}
	}

	private function _fillSingleTemplatE() {
		$singleArr = fLiveDataHolder::$single;
		$searched = ($this->_searchForId( $this->url, $singleArr));

		if( $searched !== null ) {
			$this->singleTemplate = $singleArr[ $searched ]['value'];
		}

	}

	private function _fillPortfolioTemplate() {
		$portArr = fLiveDataHolder::$portfolio;
		$searched = ($this->_searchForId( $this->url, $portArr));

		if( $searched !== null ) {
			$this->portfolioTemplate = $portArr[ $searched ]['value'];
		}
	}

	private function _fillHeaderSkin() {
		if( isset( $_COOKIE['livepanel_header_skin'] ) ) {
			// skins theme-header-skin
			$headerSkin = $_COOKIE['livepanel_header_skin'];
			fCustomPanelChanger::getInstance()->setVar( 'skins', 'theme-header-skin', $headerSkin);
			$this->headerSkin = $headerSkin;
		}
	}

	private function _fillSkin() {
		// skins  theme-color-skin
		if( isset( $_COOKIE['livepanel_theme_skin'] ) ) {
			$themeSkin = $_COOKIE['livepanel_theme_skin'];
			fCustomPanelChanger::getInstance()->setVar( 'skins','theme-color-skin', $themeSkin);
			$this->themeSkin = $themeSkin;
		}
	}

	private function _fillSlider() {
		if( isset( $_COOKIE['livepanel_slider'] ) ) {

			$slider = $_COOKIE['livepanel_slider'];
			fCustomPanelChanger::getInstance()->setVar( 'homepage', 'homepage-slider', $slider);

			$this->slider = $slider;
		}
	}


	public function getSkinType() {

	}
}


class blSessionStore {
/*----------------------------------------------------------------------------*/
/* CONSTANTS
/*----------------------------------------------------------------------------*/
	const DEF_DEFAULT_NAMESPACE = 'blDefaultNS';

/*----------------------------------------------------------------------------*/
/* VARIABLES
/*----------------------------------------------------------------------------*/
	/**
	 *
	 * @var blSessionStore
	 */
	private static $_instance = null;
	private $_actualNamespace = null;
	private $_defaultNamespace = null;

/*----------------------------------------------------------------------------*/
/* PUBLIC FUNCTIONS
/*----------------------------------------------------------------------------*/
	public function __construct() {
		$this->_setDefaultNamespace( self::DEF_DEFAULT_NAMESPACE );
		session_start();
	}

	/**
	 * @return blSessionStore
	 */
	public static function getInstance( $namespace = null ) {
		if( self::$_instance == null ) {
			self::$_instance = new blSessionStore();
		}
		if( $namespace != null ) {
			self::$_instance->setNamespace( $namespace );
		}
		return self::$_instance;
	}

	public function setNamespace( $namespace ) {
		$this->_setActualNamesapce( $namespace );
	}

	public function setValue( $name, $value ) {
		$_SESSION[ $this->_getActualNamespace() ] [ $name ] = $value;
	}

	public function getValue( $name ) {
		if( isset( $_SESSION[ $this->_getActualNamespace() ] [ $name ] ) )
			return $_SESSION[ $this->_getActualNamespace() ] [ $name ];
		else
			return null;
	}
/*----------------------------------------------------------------------------*/
/* SETTERS AND GETTERS
/*----------------------------------------------------------------------------*/
	private function _setDefaultNamespace( $defaultNamespace ) {
		$this->_defaultNamespace = $defaultNamespace;
	}

	private function _getDefaultNamespace() {
		return $this->_defaultNamespace;
	}


	private function _setActualNamesapce( $actualNamespace ) {
		$this->_actualNamespace = $actualNamespace;
	}

	private function _getActualNamespace() {
		if( $this->_actualNamespace == null ) {
			$this->_actualNamespace = $this->_getDefaultNamespace();
		}
		return $this->_actualNamespace;
	}

}

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
		global $wpdb;
		$prefix = $wpdb->prefix;
		$sql = "CREATE TABLE IF NOT EXISTS ".$prefix."gen_options (
                name VARCHAR(64),
                value LONGTEXT,
                namespace VARCHAR(64))
                CHARACTER SET utf8 COLLATE utf8_general_ci;";
		if( !mysql_query($sql) ) die('Invalid query: ' . mysql_error());
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
		/*
		$changedByHook = fCustomPanelChanger::getInstance()->hookOption($namespace, $name);
		if( $changedByHook != null ) {
			return $changedByHook;
		}*/

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

function influence_theme_options( $namespace, $name, $value ) {
	return $options;
}
