<?php
class fSidebarCollection {
	private $sidebars = array();
	private $sidebar_counter = null;
	public function __construct() {
		$this->loadSidebars();
	}
	
	private function loadSidebars() {
		// load sidebar autoincremental counter	
		$sc = ffOpt::GetDBDirect('fsidebars', 'sidebar_counter');
		if( $sc == null ) {
			$sc = 0;
			ffOpt::SetDBDirect('fsidebars', 'sidebar_counter', $sc);
		}
		$this->sidebar_counter = $sc;
		
		$sidebars = ffOpt::GetDBDirectNamespace('fsidebars');
		unset( $sidebars['sidebar_counter'] );
		
		$this->sidebars = $sidebars;
	}
	public function  addSidebar( $name ) {
		$this->sidebar_counter++;
		ffOpt::SetDBDirect('fsidebars', 'sidebar_counter', $this->sidebar_counter);
		
		$this->sidebars[ $this->sidebar_counter ] = $name;
		ffOpt::SetDBDirect('fsidebars', $this->sidebar_counter, $name);
	}
	
	public function editSidebar( $id, $new_name ) {
		$this->sidebars[ $id ] = $new_name;
		ffOpt::SetDBDirect('fsidebars', $id, $new_name );
	}
	
	public function deleteSidebar( $id ) {
		unset( $this->sidebars[$id] );
		fOpt::Delete('fsidebars', $id);
	}
	
	public function getSidebars() {
		return array_reverse($this->sidebars,true);
	}
	
	public function getSidebarsValueList( $value_id = null) {
		if( !$value_id ) 
			$value_id = 'id';
		
		$to_return = array();
		$one_sidebar = array();
		$one_sidebar[$value_id]='default';
		$one_sidebar['name']='Default';
		$to_return[] = $one_sidebar;
		foreach( $this->sidebars as $id => $name ) {
			$one_sidebar = array();
			$one_sidebar[$value_id] = $id;
			$one_sidebar[ 'name' ] = $name;
			$to_return[] = $one_sidebar;
		}
		return $to_return;
	}
	public function getSidebarName( $id ){
		if( $id == 'default')
			return null;
		if( isset($this->sidebars[$id]) )
			return $this->sidebars[$id];
		else 
			return null;
	}
	
	public function getSidebarsValueListCorrect() {
		$valueListIncorrect =  $this->getSidebarsValueList();
		$valueList = array();
		if( empty( $valueListIncorrect ) ) return null;
		foreach( $valueListIncorrect as $oneSidebarOld ) {
			$oneSidebarNew = array();
			$oneSidebarNew['name'] = $oneSidebarOld['name'];
			$oneSidebarNew['value'] = $oneSidebarOld['id'];
			$valueList[] = $oneSidebarNew;
		}
		return $valueList;
		
	}
}

class fSidebarManager {
	private $sid_col = null;
	public function __construct() {
		$this->sid_col = new fSidebarCollection();
	}
	
	
	public function requireSidebar() {
		
		$sidebarSpecificID = $this->_getSidebarSpecificName();
		
		if( $sidebarSpecificID != null && is_active_sidebar( THEMENAMELOW.'custom'.$sidebarSpecificID ) ) {
			
			dynamic_sidebar( $this->_getSidebarNameFromID( $sidebarSpecificID )  );
			return true;
		}
		
		$sidebarTheme = $this->_getSidebarThemeName();
		
		if( is_active_sidebar( $sidebarTheme ) ) {
			
			dynamic_sidebar( $sidebarTheme );
			return true;
		}
		
		dynamic_sidebar(THEMENAMELOW.'-global');
	}
	
	private function _getSidebarThemeName() {
		/** home / blog / single / page */
		
		if(  is_home() ) {
			return THEMENAMELOW.'-home';
		}
		if( is_search() ) {
			return THEMENAMELOW.'-search';
		}
		else if( (is_category() && !is_single() && !is_singular() && !is_page()) || is_tag() || is_author() || is_archive() ) {
			return THEMENAMELOW.'-blog';
		} 
		else if( is_single() && !is_page() && ( 'post' == get_post_type() ) ) {
			
				if( is_active_sidebar( THEMENAMELOW.'-blog-single' ) )  {
					
					return THEMENAMELOW.'-blog-single';
				}
				else { 
					return THEMENAMELOW.'-blog';
				}
			}	
		else if( !is_page() && is_singular() ) {
			return THEMENAMELOW.'-portfolio-single';
		}
		else if( !is_single() && is_page() ) {
			if( basename(get_page_template()) == 'page-contact.php') {
				return THEMENAMELOW.'-page-contact';
			} else if( basename(get_page_template()) == 'page-sidebar.php') {
				return THEMENAMELOW.'-page-sidebar';
			} else {
				return THEMENAMELOW.'-page';
			}
		} else if( is_search() ) {
			return THEMENAMELOW.'-search';
		}
		
			
		
	}
	
	private function _getSidebarSpecificName() {
		global $post;
		
		// IS HOME PAGE -> CATEGORY FEED  
		if( is_category()  || ( is_front_page() && is_home() ) || is_search() || is_tag() || is_author() || is_archive() ) {
			return fEnv::getCategoryOption('custom_sidebar');
		}
		// IS HOME PAGE -> PAGE AS FRONTPAGE
		else if ( is_category() || ( is_front_page() && !is_home() ) ) {
			return get_post_meta($post->ID, 'fw_sidebar', true);
		}
		else if( is_category() ) {
			return fEnv::getCategoryOption('custom_sidebar');
		} 
		else if( is_page() ) {
			return get_post_meta($post->ID, 'fw_sidebar', true);
		}
		
		else if( is_single() || is_singular() ) {
			
			$singleCustom = get_post_meta($post->ID, 'fw_sidebar', true);
			
			//$singleCategoryManagerCustom  =  fEnv::getSingleOption('custom_sidebar');;
			$categoryCategoryManagerCustom  =  fEnv::getCategoryOption('custom_sidebar');
			
			if( $singleCustom != 'default' &&  is_active_sidebar( THEMENAMELOW.'custom'.$singleCustom ) ) return $singleCustom;
			//else if( $singleCategoryManagerCustom != 'default'  &&  is_active_sidebar( THEMENAMELOW.'custom'.$singleCategoryManagerCustom ) ) return $singleCategoryManagerCustom;
			else if( $categoryCategoryManagerCustom != 'default'  &&  is_active_sidebar( THEMENAMELOW.'custom'.$categoryCategoryManagerCustom ) ) return $categoryCategoryManagerCustom;
			
			
		} else {
			return null;
		}
			
	}
	private function _getSidebarNameFromID( $id ) {
		$sidebar_name = $this->sid_col->getSidebarName( $id );
		return $sidebar_name;
	}
}
