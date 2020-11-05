<?php

class admin_menu_ff_options{
    const TITLE = 'Theme Options';
    const STRUCTURE_NAME = 'to_Options';
    protected $_structure;

    function __construct(){
        $this->_structure = ffStructureFactory::get( self::STRUCTURE_NAME )->getSection();
    }

    function get_field_id($id){     return $this->get_field($id); }
    function get_field_name($name){ return $this->get_field($name); }

    function get_field($id){
        return $id;

        $pos = strrpos($id, ffOptEnv::PATH_NAME_SEPARATOR);
        if(FALSE === $pos){
            return $id;
        }else{
            return substr($id, $pos + strlen(ffOptEnv::PATH_NAME_SEPARATOR) );
        }
    }

    function printPage(){
        echo '<div class="wrap ff_options ff_TO">';
        echo '<div id="icon-options-general" class="icon32"><br></div>';
        echo '<h2>'.self::TITLE.'</h2>';
        echo '<form method="post">';

        $this->printSaveBox();

        // OPTION CONTENT WRAPPER
        echo '<div id="ffOptions-content-wrapper">';
				echo '<div id="ffOptions-content">';

				echo '<div id="ffOptions-content-left-wrapper">';
				echo '<div id="ffOptions-content-left">';

        foreach ($this->_structure->getChilds() as $key=>$child) {
				    echo '<div class="ffOptions-content-menu-item">';
				    echo '<a href="#'.$child->getID().'" class="ffOptions-menu-'.$child->getID().' namespace-switcher" rel="'.$child->getID().'">';
            echo $child->getTitle();
				    echo '</a>';
				    echo '</div>';
        }

        echo '<div class="clear"></div>';
        echo '</div>';
				echo '</div>';

				echo '<div id="ffOptions-content-right-wrapper">';
				echo '<div id="ffOptions-content-right">';

        $salOptions = new ffSalOptions();
        $data = $salOptions->getData($this->_structure);
        $ffBEC = new ffPrinterBEComponents();
		$ffBEC->printBackEnd($this, $data);

        echo '<input type="hidden" name="ffOptEnv-option-admin-structureName" value="'.self::STRUCTURE_NAME.'" />';

        echo '<div class="clear"></div>';

				echo '</div>';
				echo '</div>';

				echo '</div>';
				echo '</div>';

        $this->printSaveBox();

        echo '</form>';
        echo '</div>';
    }

    function printSaveBox(){
        echo '<div class="options_header theme_options_header">';
				echo '<input type="submit" name="publish" id="publish" class="theme_options_save button button_primary" value="Save Changes" tabindex="5" accesskey="p">';
				echo '<div class="clear"></div>';
				echo '</div>';
    }

    static function printBlank(){ }
}