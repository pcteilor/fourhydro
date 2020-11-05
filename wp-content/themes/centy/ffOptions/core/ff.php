<?php

$_THIS_DIR = dirname(__FILE__);

require_once $_THIS_DIR.'/ffOptEnv.php';
require_once ffOptEnv::getDir('themeoptions').'/db/ffDBTO.php';
require_once ffOptEnv::getDir('themeoptions').'/ffOpt.php';

// Classes for datastructures

require_once $_THIS_DIR.'/datastruct/ffDSComponent.php';
require_once $_THIS_DIR.'/datastruct/ffDSSection.php';
require_once $_THIS_DIR.'/datastruct/ffDSOption.php';
require_once $_THIS_DIR.'/datastruct/ffDSOptionSelect.php';
require_once $_THIS_DIR.'/datastruct/ffStructure.php';
require_once $_THIS_DIR.'/datastruct/ffStructureSection.php';
require_once $_THIS_DIR.'/datastruct/ffStructureFactory.php';
require_once $_THIS_DIR.'/datastruct/ffData.php';

// Interface for Savers And Loaders
require_once $_THIS_DIR.'/sal/ffSal.php';

// Classes for options
require_once ffOptEnv::getDir('themeoptions-sal').'/ffSalOptions.php';
require_once ffOptEnv::getDir('themeoptions-sal').'/ffSalOptionsDB.php';

// Classes for sitepreferences
require_once ffOptEnv::getDir('sitepreferences').'/db/ffDBSP.php';
require_once ffOptEnv::getDir('sitepreferences-sal').'/ffSalSP.php';
require_once ffOptEnv::getDir('sitepreferences-sal').'/ffSalSPDB.php';
require_once ffOptEnv::getDir('sitepreferences-sal').'/ffSalSPFE.php';
require_once ffOptEnv::getDir('sitepreferences').'/ffSP.php';
require_once ffOptEnv::getDir('sitepreferences').'/ffSPHooks.php';
new ffSPHooks();

// Classes for Feeders
require_once $_THIS_DIR.'/feeders/fdr.php';

// Classes for Widgets
require_once ffOptEnv::getDir('widgets-be').'/ffWidget.php';
require_once ffOptEnv::getDir('widgets-be').'/ffWidgetFactory.php';
require_once ffOptEnv::getDir('widgets-be').'/ffWidgetLoader.php';

// Class for fe Writepanels
require_once ffOptEnv::getDir('writepanels-sal').'/ffSalWritepanels.php';
require_once ffOptEnv::getDir('writepanels').'/ffWP.php';

ffWidgetFactory::init();

// Javascripts same like php for WordPress
require_once ffOptEnv::getDir('core').'/be/ffJSFunctions.php';
new ffJSFunctions();//::addScripts();

// Admin Bakckend structures and printers

if( function_exists('is_admin') and is_admin() ){
    require_once ffOptEnv::getDir('core').'/be/ffPrinterBEFiles.php';
    require_once ffOptEnv::getDir('core').'/be/ffPrinterBEComponents.php';

    require_once ffOptEnv::getDir('themeoptions-be').'/add_admin_menu.php';
    require_once ffOptEnv::getDir('themeoptions-be').'/admin_menu_ff_options.php';

    require_once ffOptEnv::getDir('sitepreferences-be').'/add_admin_menu.php';
    require_once ffOptEnv::getDir('sitepreferences-be').'/admin_menu_ff_sitepreferences.php';

    ffPrinterBEFiles::addFiles();
    ffPrinterBEFiles::addFiles( 'sitepreferences-be' );
    ffPrinterBEFiles::addFiles( 'themeoptions-be' );
    ffPrinterBEFiles::addFiles( 'writepanels-be' );

    require_once ffOptEnv::getDir('writepanels-be').'/ffWPHooks.php';
    require_once ffOptEnv::getDir('writepanels-be').'/ffPrinterBEWP.php';

    add_action( 'add_meta_boxes', array('ffWPHooks', 'add_meta_boxes') );
    add_action( 'save_post', array('ffWPHooks', 'save_post') );

    // Gallery Ajax loading
    require_once ffOptEnv::getDir('core').'/be/ffGalleryAjaxLoader.php';
    ffGalleryAjaxLoader::addHook();
}
