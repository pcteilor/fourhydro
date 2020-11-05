<?php
  
class ffImporter{
    private $WPLayer;
    private $replaceRuleActions;
    private $ruleManager;

    private $taxonomies;
    private $posts;
    private $attachments;
    private $menu;
    private $widgets;

	function __construct(){
		$wp_rewrite = new WP_Rewrite();
		global $wp_rewrite;
		
////////////////////////////////////////////////////////////////////////////////
// Load required scripts / classes
////////////////////////////////////////////////////////////////////////////////
		$this->_initRequire();


////////////////////////////////////////////////////////////////////////////////
// Stuff with importer
////////////////////////////////////////////////////////////////////////////////

		$pluginDir = dirname(__FILE__);
		$this->WPLayer = new ffWPLayer();
		$this->WPLayer->set_plugin_dir( $pluginDir );

		$this->replaceRuleActions = new ffReplaceRuleActions();
		$this->ruleManager = new ffRuleManager($this->WPLayer, $this->replaceRuleActions);

		// Featured image
		$ruleFeaturedImage = new ffReplaceRule_FeaturedImage($this->WPLayer, $this->replaceRuleActions);
		$this->ruleManager->addRule( $ruleFeaturedImage );
		
		// Posts
		$rulePostParent = new ffReplaceRule_PostParent($this->WPLayer, $this->replaceRuleActions);
		$this->ruleManager->addRule( $rulePostParent );

		// Galleries
		$ruleGalleries = new ffReplaceRule_Galleries($this->WPLayer, $this->replaceRuleActions);
		$ruleGalleries->addGalleryMetaName('wpgallery---items');
		$this->ruleManager->addRule( $ruleGalleries );

		// Widgets
		$ruleWidgetMenus = new ffReplaceRule_WidgetNavigationMenu($this->WPLayer, $this->replaceRuleActions);
		$ruleWidgetMenus->addWidgetAndFieldName('nav_menu', 'nav_menu');
		$ruleWidgetMenus->addWidgetAndFieldName('ffsidemenu', 'custom_menu');
		$this->ruleManager->addRule( $ruleWidgetMenus );

		$this->taxonomies =  new ffImportTaxonomies($this->WPLayer,$this->ruleManager);
		$this->posts =       new ffImportPosts( $this->WPLayer,$this->ruleManager );
		$this->attachments = new ffImportAttachments( $this->WPLayer,$this->ruleManager );
		$this->menu =        new ffImportMenu($this->WPLayer,$this->ruleManager);
		$this->widgets =     new ffImportWidgets($this->WPLayer, $this->ruleManager);

		global $_GET;
		$freshface_import = '';
		if( !empty($_GET['freshface_import']) ){
			$freshface_import = $_GET['freshface_import'];
		}
		$this->import( $freshface_import );
	}
	
	public function import( $what_to_import ){
		$importManager = new ffImportManager( $this->WPLayer,$this->ruleManager );

		switch ($what_to_import){
			case 'attachments':
			        $importManager->addSection( $this->attachments );
			        break;
			case 'taxonomies':
					$importManager->addSection( $this->taxonomies );
					break;
			case 'posts':
					$importManager->addSection( $this->posts );
					break;
			case 'menu':
					$importManager->addSection( $this->menu );
					break;
			case 'widgets':
					$importManager->addSection( $this->widgets );
					break;
			default:
					return;
					break;
		}

		$importManager->loadFileList();
		$importManager->import();
	}

	function _initRequire(){
		$loader = array(
				'/data/basic/ffBasicObject.php',
				'/data/basic/ffWPLayer.php',
				'/data/basic/ffWPPost.php',
				'/data/basic/ffIImportSection.php',
				'/data/basic/ffImportManager.php',
				'/data/taxonomies/ffImportTaxonomies.php',
				'/data/posts/ffImportPosts.php',
				'/data/attachments/ffImportAttachments.php',
				'/data/menu/ffImportMenu.php',

				'/data/widgets/ffImportWidgets.php',

				'/data/rules/ffIReplaceRule.php',
				'/data/rules/ffReplaceRule.php',
				'/data/rules/ffReplaceRuleActions.php',
				'/data/rules/ffRuleManager.php',

				'/data/rules/default/ffReplaceRule_FeaturedImage.php',
				'/data/rules/default/ffReplaceRule_Galleries.php',
				'/data/rules/default/ffReplaceRule_WidgetNavigationMenu.php',
				'/data/rules/default/ffReplaceRule_PostParent.php',

		);

		$pluginDir = dirname(__FILE__);

		foreach( $loader as $oneFile ) {
			require $pluginDir.$oneFile;
		}
	}
}