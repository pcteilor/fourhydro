<?php

class admin_menu_ff_sitepreferences{
    const TITLE = 'Site Preferences';
    const STRUCTURE_NAME = 'tx_all';
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
        echo '<div class="wrap ff_options ff_SP">';
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

        $salSP = new ffSalSP();
        $data = $salSP->getData($this->_structure);
        ffPrinterBEComponents::printBackEnd($this, $data);

        echo '<input type="hidden" name="ffOptEnv-option-admin-structureName" value="'.self::STRUCTURE_NAME.'" />';

        echo '<div class="clear"></div>';

				echo '</div>';

        echo '<div class="loading"><span>Loading</span></div>';

				echo '</div>';

				echo '</div>';
				echo '</div>';

        $this->printSaveBox();

        echo '</form>';
        echo '</div>';
    }

    function printSaveBox(){
        echo '<div class="options_header theme_options_header">';
				echo '<span class="theme_options_save button button_primary">Save Changes</span>';
				echo '<div class="clear"></div>';
				echo '</div>';
    }

    static function printBlank(){ }
}