<?php

class ffOptEnv{

    const SELECT_DEEP_SEPARATOR = "---";

    const PATH_NAME_SEPARATOR = "---";
    const STATIC_PREFIX = "__static_element_";
    
    const SP_SECTION = 2; // site preferences
    const REPEATABLE_SECTION = 1;
    const SINGLE_SECTION = 0;

    const UNKNOWN = FALSE;

    const SECTION = 'section';

    const HTML = 'html';
    const BUTTON = 'ff_button';
    const PLUGIN_INFO = 'plugin_info';
    const DESCRIPTION = 'description';
    const SEPARATOR = 'separator';
    const HEADER = 'header';

    const CHECKBOX = 'checkbox';
	const TABS = 'tabs';
    const TEXTAREA = 'textarea';
    const HTMLAREA = 'htmlarea';
    const GALLERY = 'gallery';
    const IMAGE = 'image';
    const COLOR = 'color';
    const TEXT = 'text';

    const SELECT = 'select';
    const IMAGE_LIST = 'image_list';
    const RADIO = 'radio';

    const CALLBACK = '__callBack__';

    static function getDir($what){
        $ret = ffOptEnv::getPath($what);
        if( !empty($ret) ) return realpath( dirname( dirname(__FILE__) ) . $ret );

        echo "ffOptEnv: UNKNOWN DIRECTORY FOR '$what'";

        if( function_exists('debug_backtrace') ){
            echo "<br />Caller: ";
            echo "<pre>";
            print_r( debug_backtrace() );
            echo "</pre>";
        }

        exit;
    }

    static function getURL($what){
        $ret = ffOptEnv::getPath($what);
        if( !empty($ret) ) return get_template_directory_uri() . '/ffOptions' . $ret;

        echo "ffOptEnv: UNKNOWN URL FOR '$what'";

        if( function_exists('debug_backtrace') ){
            echo "<br />Caller: ";
            echo "<pre>";
            print_r( debug_backtrace() );
            echo "</pre>";
        }

        exit;
    }

    static function getPath($what){
        switch ($what) {

            case '': return '';

            case 'core': return '/core';
            case 'core-be': return '/core/be';
            case 'feeders': return '/core/feeders';

            case 'widgets-fe': return '/widgets/fe';
            case 'widgets-be': return '/widgets/be';
            case 'wg':
            case 'widgets-structures': return '/widgets/structures';

            case 'themeoptions': return '/themeoptions';
            case 'themeoptions-sal': return '/themeoptions/sal';
            case 'themeoptions-be': return '/themeoptions/be';
            case 'to':
            case 'themeoptions-structures': return '/themeoptions/structures';

            case 'writepanels': return '/writepanels';
            case 'writepanels-fe': return '/writepanels/fe';
            case 'writepanels-be': return '/writepanels/be';
            case 'writepanels-sal': return '/writepanels/sal';
            case 'wp':
            case 'writepanels-structures': return '/writepanels/structures';
            case 't_':
            case 'writepanels-post_types': return '/writepanels/post_types';

            case 'sitepreferences': return '/sitepreferences';
            case 'sitepreferences-fe': return '/sitepreferences/fe';
            case 'sitepreferences-be': return '/sitepreferences/be';
            case 'sitepreferences-sal': return '/sitepreferences/sal';
            case 'tx':
            case 'sitepreferences-structures': return '/sitepreferences/structures';
        }

        if( FALSE !== strpos($what, '-') ){
            $what = explode('-',$what);
            $what = implode('-',$what);
        }

        $what = '/'.$what;
        if( is_dir( ffOptEnv::getDir('').$what ) ){
            return $what;
        }

        return false;
    }

    static public function print_r( $what_to_print ){
        self::printStructure($what_to_print);
    }

    static public function printStructure( $what_to_print ){
        echo '<pre>';
        $txt = print_r($what_to_print, true);
        $txt = explode("\n", $txt);
        foreach ($txt as $key=>$value) {
            $t = trim($value);
            if( strlen($t) < 2 ){
                continue;
            }
            $value = str_replace("] => ", "]=", $value);
            $value = str_replace(":protected", ":p", $value);
            $value = htmlspecialchars($value);
            $value = str_replace("        ", "   ", $value);
            $value = str_replace("  ", " ", $value);

            echo $value . "\n";
        }
        echo '</pre>';
    }
    
    static function stripPOSTslashes($value){
        /*
        if( function_exists('get_magic_quotes_gpc') ){
            if(get_magic_quotes_gpc()) {
                $value = stripslashes($value);
            }
        }
        */
        $value = stripslashes($value);
        return $value;
    }
}

