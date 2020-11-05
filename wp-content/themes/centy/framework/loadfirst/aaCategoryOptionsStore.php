<?php

class fCategoryOptionsStore {
	private $categoryOptions = array();
	private $categoryTemplates = array();
	private $singleOptions = array();
	private $singleTemplates = array();
	
	private $singleOptionIdValue = array();
	private $categoryOptionIdValue = array();
	
	private static $_instance = null;
	
	/**
	 * @return fCategoryOptionsStore
	 */
	public static function getInstance() { 
		if( self::$_instance == null ) {
			self::$_instance =  fcreate_category_options_store();
		}
		
		return self::$_instance;
	}
	
	
	
	public function addCategoryOption( $type, $id, $std, $text, $options = null ) {
		$this->addOption('category', $type, $id, $std, $text, $options);
	}
	
	public function addSingleOption( $type, $id, $std, $text, $options = null ){
		$this->addOption('single', $type, $id, $std, $text, $options);
	}
	public function addCategoryLine(){
		$this->addOption('category','line', null, null, null);
	}
	public function addCategoryTitle( $title ) {
		$this->addOption('category','title', null, null, $title);
	}
	
	public function addSingleLine(){
		$this->addOption('single','line', null, null, null);
	}
	public function addSingleTitle( $title ) {
		$this->addOption('single','title', null, null, $title);
	}	
	
	public function getSingleOptionById( $id ) {
		//var_dump($this->singleOptionIdValue);
		if( isset( $this->singleOptionIdValue[ $id ] ) ) {
			
			return $this->singleOptionIdValue[ $id ];
		} else {
			return null;
		}
	}
	
	public function getCategoryOptionById( $id ) {
		
		if( isset( $this->categoryOptionIdValue[ $id ] ) ) {
		
			return $this->categoryOptionIdValue[ $id ];
		} else {
			return null;
		}
	}

	private function addOption( $option_type, $type, $id, $std, $text, $options = null ) {
		$option['type'] = $type;
		$option['id'] = $id;
		$option['std'] = $std;
		$option['text'] = $text;
		
		if( $options != null )
			$option['options'] = $options;		
		
		if( $option_type == 'category') {
			$this->categoryOptions[] = $option;
			$this->categoryOptionIdValue[ $id ] = $option;
		}
		else if( $option_type == 'single') {
			$option['id'] = 'fw_sin_'.$option['id'];
			$this->singleOptionIdValue[ 'fw_sin_'.$id ] = $option;
			$this->singleOptions[] = $option;
		}
		
	}
	
	public function getCategoryOptions() {return $this->categoryOptions; }
	public function getSingleOptions() {return $this->singleOptions; }
}


function fcreate_category_options_store() {
	$catop = new fCategoryOptionsStore();
	$sid_col = new fSidebarCollection();

	$catop->addCategoryOption('text', 'posts_per_page', 3, __('Posts per Page (0 = No limit)', ffgtd()));
	
	$catop->addCategoryOption('check', 'clickable_title', 1, __('Click-able Title', ffgtd()));
	$catop->addCategoryOption('check', 'show_readmore_button', 1, __('"Read More" Button (<a href="http://jeffcohan.com/tek/wp-content/uploads/2010/05/more_a.gif">How to add "Read More" button?</a>)', ffgtd()));
	$catop->addCategoryTitle(__('Post Meta', ffgtd()));
	//$catop->addCategoryOption('check', 'postmeta_author', 1,'Author');
	//$catop->addCategoryOption('check', 'postmeta_author', 1,__( 'Author',ffgtd()));
	//$catop->addCategoryOption('check', 'postmeta_comments', 1, __('Tags', ffgtd()));
	$catop->addCategoryOption('check', 'postmeta_category', 1, __('Category', ffgtd()));
	//$catop->addCategoryOption('check', 'postmeta_date', 1, __('Date', ffgtd()));
	//$catop->addCategoryOption('check', 'enable_comments', 1, 'Comments');
	//$catop->addCategoryOption('check', 'enable_date', 1, 'Date');
	
	$catop->addCategoryTitle(__('Post Order', ffgtd()));
	$catop->addCategoryOption('select', 'order', 'default', 'Order', array( array('name'=> __('Default', ffgtd()), 'id'=>'default' ), array('name'=> __('Asc', ffgtd()), 'id'=>'asc' ) ,  array('name'=> __('Desc', ffgtd()), 'id'=>'Desc' ) )  );
	
	
	$catop->addCategoryOption('select', 'order_by', 'default', 'Order By', array(  array('name'=> __('Default', ffgtd()), 'id'=>'default' ), array('name'=> __('ID', ffgtd()), 'id'=>'ID' ), array('name'=> __('Author', ffgtd()), 'id'=>'author' ) ,  array('name'=> __('Title', ffgtd()), 'id'=>'title' )
																		,  array('name'=> __('Date', ffgtd()), 'id'=>'date' )
																		,  array('name'=> __('Modified', ffgtd()), 'id'=>'modified' )
																		,  array('name'=> __('Parent', ffgtd()), 'id'=>'parent' )
																		,  array('name'=> __('Rand', ffgtd()), 'id'=>'rand' )
																		,  array('name'=> __('Comment Count', ffgtd()), 'id'=>'comment_count' ) )  );
	$catop->addCategoryTitle(__('Sidebar', ffgtd()));
	//$catop->addCategoryOption('select', 'sidebar_position', 'right', __('Sidebar Position', ffgtd()), array(array('name'=>__('Right', ffgtd()), 'id'=>'right'), array('name'=>__('Left', ffgtd()), 'id'=>'left') ));
	$catop->addCategoryOption('select-sidebar', 'custom_sidebar', 'default', __('Sidebar', ffgtd()), $sid_col->getSidebarsValueList() );
	
	//$catop->addCategoryTitle(__('Description Bar', ffgtd()));
	//$catop->addCategoryOption('check', 'description_show', 1, __('Show Description', ffgtd()));
	//$catop->addCategoryOption('text', 'description_text_big', '', __('Upper Description Bar', ffgtd()));
	//$catop->addCategoryOption('check', 'description_breadcrumbs_show', 1, __('Show Description Bar Breadxrumbs', ffgtd()));
	//$catop->addCategoryOption('text', 'description_text_small', '', __('Lower Description Bar', ffgtd()));
	
	//$catop->addCategoryTitle(__('Description Bar Background', ffgtd()));
	//$catop->addCategoryOption('text-img', 'description_img', '', __('Desc Bar Background Img', ffgtd()));
	//$catop->addCategoryOption('color', 'description_bg_color', '', __('Desc Bar Background Color', ffgtd()));
	
	/*$catop->addCategoryOption('select', 'description_bg_type', 'image', __('Background Color Type', ffgtd()), 
																							array( 
																							 	array('name'=> __('Default', ffgtd()), 'id'=>'default' )
																								,  array('name'=> __('Image', ffgtd()), 'id'=>'image' )
																								,  array('name'=> __('Pattern', ffgtd()), 'id'=>'pattern' )
																								,  array('name'=> __('Color', ffgtd()), 'id'=>'color' )));
		*/																			
	/*$catop->addCategoryTitle('Featured Image');
	
	
	$catop->addCategoryOption('text', 'main_image_height', 0, 'Featured Image Fixed Height (0 = No limit)');
	$catop->addCategoryOption('check', 'clickable_image', 1, 'Featured Image is click-able');
	$catop->addCategoryOption('check', 'open_image_in_lightbox', 1, 'Open Featured Image In Lightbox');
	
	//$data->addOption('check', 'fw_post_description_show', 'Description Bar', 'Description Bar appears right under Header and is usually in color', 1);
	//$data->addOption('text', 'fw_post_description_text', 'Description Bar - Text', 'Enter your desired text. Leave blank to use settings from higher tiers like Global, Site Options, etc.', null);
	$catop->addCategoryTitle('Description Bar');
	$catop->addCategoryOption('check', 'description_show', 1, 'Show Description Bar');
	$catop->addCategoryOption('text', 'description_text', '', 'Description Bar text'); 
	$catop->addCategoryTitle('Action Bar');
	$catop->addCategoryOption('check', 'action_show', 1, 'Show Action Bar');
	$catop->addCategoryOption('text', 'action_left', '', 'Text Left');
	$catop->addCategoryOption('text', 'action_right', '', 'Text Right');
	$catop->addCategoryOption('text', 'action_button', '', 'Button Text');
	$catop->addCategoryOption('text', 'action_button_link', '', 'Button Link URL');
	$catop->addCategoryTitle('Sorting');
	$catop->addCategoryOption('check', 'sortable_show', 0, 'Show Sortable Bar');
	$catop->addCategoryTitle('Sidebar');
	$catop->addCategoryOption('select-sidebar', 'custom_sidebar', 'default', 'Sidebar', $sid_col->getSidebarsValueList() );
	
	$catop->addCategoryTitle('Portfolio');
	$catop->addCategoryOption('check', 'portfolio_shadow_under_image', 1, 'Shadow under Featured Image');*/
	
/*********************************************************
 * SSIINGGLLEE
 *********************************************************/	
	
	
	$catop->addSingleOption('check', 'clickable_title', 1, 'Click-able Title');
	
	$catop->addSingleTitle('Post Meta');

	$catop->addSingleOption('check', 'postmeta_author', 1, 'Author');
	$catop->addSingleOption('check', 'postmeta_tags', 1, 'Tags');
	$catop->addSingleOption('check', 'postmeta_category', 1, 'Category');
	$catop->addSingleOption('check', 'enable_comments', 1, 'Comments');
	$catop->addSingleOption('check', 'enable_date', 1, 'Date');
		
	$catop->addSingleTitle('Featured Image');
	
	$catop->addSingleOption('text', 'main_image_height', 0, 'Featured Image Fixed Height (0 = No limit)');
	$catop->addSingleOption('check', 'clickable_image', 1, 'Featured Image is click-able');
	$catop->addSingleOption('check', 'open_image_in_lightbox', 1, 'Open Featured Image In Lightbox');
	
	$catop->addSingleTitle('Description Bar');
	$catop->addSingleOption('check', 'description_show', 1, 'Show Description Bar');
	$catop->addSingleOption('text', 'description_text', '', 'Description Bar text');
	 
	$catop->addSingleTitle('Action Bar');
	$catop->addSingleOption('check', 'action_show', 1, 'Show Action Bar');
	$catop->addSingleOption('text', 'action_left', '', 'Text Left');
	$catop->addSingleOption('text', 'action_right', '', 'Text Right');
	$catop->addSingleOption('text', 'action_button', '', 'Button Text');
	$catop->addSingleOption('text', 'action_button_link', '', 'Button Link URL');

	$catop->addSingleTitle('Sidebar');
	$catop->addSingleOption('select', 'sidebar_position', 'right', 'Sidebar Position', array(array('name'=>'Right', 'id'=>'right'), array('name'=>'Left', 'id'=>'left')  ));
	$catop->addSingleOption('select-sidebar', 'custom_sidebar', 'default', 'Sidebar', $sid_col->getSidebarsValueList() );
	
	return $catop;
	
	
}