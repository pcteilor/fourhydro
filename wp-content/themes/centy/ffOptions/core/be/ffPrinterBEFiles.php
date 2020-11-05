<?php

class ffPrinterBEFiles{

    static $_instance = null;
    static $_scripts = array();
    static $_styles = array();

    static function addFiles( $d = null ){

        // If dirname not set, than set default
        
        if( empty($d) ){
            $d = 'core-be';
        }
        
        $dirDIR = ffOptEnv::getDir( $d );
        $dirURL = ffOptEnv::getURL( $d );

        // Create list of scripts

        if( $dir = dir( $dirDIR . '/scripts/' ) ){
            while (false !== ($entry = $dir->read())) {
                if( '_' == substr($entry, 0, 1) ){
                    continue;
                }
                if( '.js' == substr($entry, -3) ){
                    ffPrinterBEFiles::$_scripts[] = $dirURL . '/scripts/' . $entry;
                }
            }
            $dir->close();
        }
        // Create list of css

        if( $dir = dir( $dirDIR . '/layout/' ) ){
            while (false !== ($entry = $dir->read())) {
                if( '.css' == substr($entry, -4) ){
                    ffPrinterBEFiles::$_styles[] = $dirURL . '/layout/' . $entry;
                }
            }
            $dir->close();
        }
        
        // Create hooks to add it later

        add_action( 'admin_enqueue_scripts', array('ffPrinterBEFiles', 'loadStyles') );
        add_action( 'admin_enqueue_scripts', array('ffPrinterBEFiles', 'loadScripts') );
    }

    static function loadStyles(){

        wp_enqueue_style('thickbox');

        foreach (ffPrinterBEFiles::$_styles as $key=>$file) {
            wp_register_style( md5($file), $file, false, md5($file) );
            wp_enqueue_style( md5($file) );
        }
    }

    static function loadScripts(){

        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');

        foreach (ffPrinterBEFiles::$_scripts as $key=>$file) {
            wp_enqueue_script( md5($file), $file );
        }
    }
}