<?php
  
class ffPrinterBEComponents{

    static function printBackEnd( $widget, $data ){
        self::showSection( $widget, $data, '' );
    }

    static function showOption( $widget, $data, $path ){
        echo "\n\n";

        $wName = $widget->get_field_name($path);
        $wID = $widget->get_field_id($path);

        switch( $data->getType() ) {

            case ffOptEnv::HTML:        self::printHTML(      $data, $wName, $wID ); break;
            case ffOptEnv::DESCRIPTION: self::printDescr(     $data, $wName, $wID ); break;
            case ffOptEnv::BUTTON:      self::printButton(    $data, $wName, $wID ); break;
            case ffOptEnv::PLUGIN_INFO: self::printPlugInfo(  $data, $wName, $wID ); break;
            case ffOptEnv::HEADER:      self::printHeader(    $data, $wName, $wID ); break;
            case ffOptEnv::SEPARATOR:   self::printSeparator( $data, $wName, $wID ); break;

            case ffOptEnv::TEXT:        self::printText(      $data, $wName, $wID ); break;
            case ffOptEnv::TEXTAREA:    self::printTextArea(  $data, $wName, $wID ); break;
            case ffOptEnv::IMAGE:       self::printImage(     $data, $wName, $wID ); break;
            case ffOptEnv::GALLERY:     self::printGallery(   $data, $wName, $wID ); break;
            case ffOptEnv::CHECKBOX:    self::printCheckbox(  $data, $wName, $wID ); break;
            case ffOptEnv::SELECT:      self::printSelect(    $data, $wName, $wID ); break;
			case ffOptEnv::TABS:        self::printTabs(      $data, $wName, $wID ); break;
            case ffOptEnv::IMAGE_LIST:  self::printImageList( $data, $wName, $wID ); break;
            case ffOptEnv::RADIO:       self::printRadio(   $data, $wName, $wID ); break;
            default:                    self::printError(     $data, $wName, $wID ); break;
        }

        echo "\n\n";

    }

    static function showSection( $widget, $data, $path ){

        $id = $data->getID();

        if( empty($path) ){
            $prepath = '';
        }else{
            $classes = "section component-$id component-$path";
            if($data->typeRepeatable()){
                $classes .= " repeatable";
            }

            echo "<div class='$classes' data-path='$path'";
            if( is_int($id) and $id == 0 ){ echo " data-copied='0'"; }
            echo ">";

            $title = $data->getTitle();
            if( !empty($title) ){
                if( FALSE !== strpos($title, "%%%i%%%" ) ){
                    $title = str_replace( "%%%i%%%", "<span class='in-section-title'></span>", $title );
                }
                echo '<div class="section-title">';
                if( is_int($id) ){
                    echo '<div class="section-control-actions">';
                    echo '<div class="controls_center">';
                    echo '<a href="#" class="section-control-recount-indexes" title="Remove">Recount Indexes</a>';
                    echo '<a href="#" class="section-control-move-up icon-arrow-up" title="Move up"></a>';
                    echo '<span class="section-control-move-up-off icon-arrow-up"></span>';
                    echo '<a href="#" class="section-control-move-down icon-arrow-down" title="Move down"></a>';
                    echo '<span class="section-control-move-down-off icon-arrow-down"></span>';
                    echo '<a href="#" class="section-control-remove icon-remove" title="Remove"></a>';
                    echo '<span class="section-control-remove-off icon-remove"></span>';
                    echo '<a href="#" class="section-control-add-before icon-plus" title="Add before"></a>';
                    echo '<a href="#" class="section-control-add-after icon-plus" title="Add after"></a>';
                    echo '</div>';
                    echo '<div class="controls_right">';
                    echo '<a href="#" class="section-control-close icon-caret-up" title="Close"></a>';
                    echo '<a href="#" class="section-control-open icon-caret-down" title="Open"></a>';
                    echo '<input type="text" name="'.$widget->get_field_name($path.ffOptEnv::PATH_NAME_SEPARATOR.'_rptblIndex').'" value="'.$id.'" class="rptblIndex" />';
                    echo '</div>';
                    echo '</div>';
                }
                echo '<h4>'.$title.'</h4></div>';
            }

            echo '<div class="section-content">';

            if($data->typeRepeatable()){
                echo "<div class='repeatable-section-menu repeatable-section-menu-top global-section-control-add-before'>";
                echo '<span class="icon-plus-sign" title="Add to begining"></span> Add item';
                echo "</div>";
            }

            $prepath = $path.ffOptEnv::PATH_NAME_SEPARATOR;
        }


        foreach ( $data->getChilds() as $id=>$child) {
            if( $child->isSection() ){
                self::showSection( $widget, $child, $prepath.$id );
            }else{
                self::showOption( $widget, $child, $prepath.$id );
            }
        }

        if( ! empty($path) ){
            if($data->typeRepeatable()){
                echo "<div class='repeatable-section-menu repeatable-section-menu-bottom global-section-control-add-bottom'>";
                echo '<span class="icon-plus-sign" title="Add to bottom"></span> Add item';
                echo "</div>";
                echo "<div class='clear'></div>";
            }
            echo "</div>";
            echo "</div>";
        }
    }

    static function printTitleLabel($title, $wID){
        if( !empty( $title )){
            echo '<label for="'.$wID.'">' . $title .' </label>';
        }
    }

    static function printInputClass($data){
        echo ' class="'.$data->getID();
        $inputClass = $data->getParam('input-class');
        if( !empty( $inputClass )){
            echo " ".$inputClass;
        }
        echo '"';
    }

    static function getWrapperSubClassText($data){
        $wrapperClass = $data->getParam('wrapper-class');
        return empty( $wrapperClass ) ? "" : " ".$wrapperClass;
    }

    static function printHTML( $data, $wName, $wID ){
        echo '<div class="component-element component-element-html '.self::getWrapperSubClassText($data).'">';
        echo '<div class="'.$data->getParam('class').'">';
        echo '<div class="'.$data->getID().'">';
        echo $data->getTitle();
        echo '</div>';
        echo '</div>';
        echo '</div>';
    }

    static function printDescr( $data, $wName, $wID ){
        echo '<div class="component-element component-element-description '.self::getWrapperSubClassText($data).'">';
        echo '<p class="'.$data->getParam('class').'">';
        echo '<span class="'.$data->getID().'">';
        echo $data->getTitle();
        echo '</span>';
        echo '</p>';
        echo '</div>';
    }

    static function printButton( $data, $wName, $wID ){
        $link = $data->getParam('link');
        $class = $data->getParam('class');
        echo '<div class="component-element component-element-button'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        echo '<a href="'.$link.'" class="button '.$class.' '.$data->getID().'">';
        echo $data->getTitle();
        echo '</a>';
        echo '</p>';
        echo '</div>';
    }

    static function printPlugInfo( $data, $wName, $wID ){
        $plugin_path = $data->getParam('path');
        if( empty($plugin_path) ){ echo "<div><p>You must add to option something like: ->addParam('path', 'contact-form-7/wp-contact-form-7.php');</p></div>";return; }
        if( ! is_array($plugin_path) ) $plugin_path = array( $plugin_path );
        $plugin_is_active = 1;
        foreach ($plugin_path as $path) {
            $plugin_is_active = $plugin_is_active * is_plugin_active( $path );
        }

        echo '<div class="component-element component-element-plugin_info'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        echo '<span class="'.$data->getID().' '.( $plugin_is_active ? 'plugin_is_installed':'plugin_isNOT_installed' ).'">';
        echo $data->getTitle();
        echo '</span>';
        echo '</p>';
        echo '</div>';
    }

    static function printHeader( $data, $wName, $wID ){
        echo '<div class="component-element component-element-header'.self::getWrapperSubClassText($data).'">';
        $tag = $data->getParam('tag');
        if( empty($tag) ){
            $tag = 'h4';
        }
        echo "<$tag>";
        echo '<span class="'.$data->getID().'">';
        echo $data->getTitle();
        echo '</span>';
        echo "</$tag>";

        echo '</div>';
    }

    static function printSeparator( $data, $wName, $wID ){
        echo '<div class="component-element component-element-separator'.self::getWrapperSubClassText($data).'">';
        echo '<hr />';
        echo '</div>';
    }
    
    static function printText( $data, $wName, $wID ){
        echo '<div class="component-element component-option-text'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        self::printTitleLabel($data->getTitle(), $wID);
        echo '<input';
        echo ' id="'.$wID.'"';
        echo ' name="'.$wName.'"';
        echo ' value="'.htmlspecialchars( $data->getValue() ).'"';
        self::printInputClass($data);
        echo ' type="text"';

        $placeholder = $data->getParam('placeholder');
        if( !empty($placeholder) ){ echo ' placeholder="'.$placeholder.'"'; }

        echo '>';
        echo '</p>';
        echo '</div>';
    }

    static function printTextArea( $data, $wName, $wID ){
        echo '<div class="component-element component-option-textarea'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        self::printTitleLabel($data->getTitle(), $wID);
        echo '<textarea';
        echo ' id="'.$wID.'"';
        echo ' name="'.$wName.'"';
        self::printInputClass($data);
        echo ' rows="3"';

        $placeholder = $data->getParam('placeholder');
        if( !empty($placeholder) ){ echo ' placeholder="'.$placeholder.'"'; }

        echo '>';
        echo htmlspecialchars( $data->getValue() );
        echo '</textarea>';
        echo '</p>';
        echo '</div>';
    }
    
    static function printImage( $data, $wName, $wID ){
        echo '<div class="component-element component-option-text'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        self::printTitleLabel($data->getTitle(), $wID);
        echo '<input';
        echo ' id="'.$wID.'"';
        echo ' name="'.$wName.'"';
        echo ' value="'.htmlspecialchars( $data->getValue() ).'"';
        self::printInputClass($data);
        echo ' type="text"';
        echo '>';
        echo '<a href="#" ';
        echo 'data-image-input="'.$wID.'" ';
        echo 'class="thickbox add_media button add_image_button"';
        echo ' title="Add Media"><span class="add_image_button_icon"></span>Select Image</a>';
        echo '</p>';
        echo '</div>';
    }

    static function printGallery( $data, $wName, $wID ){
        echo '<div class="component-element component-option-gallery'.self::getWrapperSubClassText($data).'">';
        echo '<div class="p">';

        self::printTitleLabel($data->getTitle(), $wID);

        echo '<div class="gallery-data-wrapper">';

        echo '<input';
        echo ' id="'.$wID.'"';
        echo ' name="'.$wName.'"';
        echo ' value="'.htmlspecialchars( $data->getValue() ).'"';
        echo ' class="'.$data->getID().' gallery_input_source"';
        echo ' type="hidden"';
        echo '>';

        echo '<span class="custom_media_upload" data-input-selector="#'.$wID.'"><span>Add / Edit</span></span>';

    		echo '<span class="gallery-image-holder">';

        $allId = $data->getValue();

        if( !empty($allId) ){

            if( FALSE !== strpos($allId, ',') ){
                $allId = explode( ',',$data->getValue() );
            }else{
                $allId = array( $allId );
            }

            foreach( $allId as $oneId ) {
          			if( empty( $oneId ) ) continue;

          			$img = ffGalleryCollection::getImage( $oneId );
          			if( empty( $img ) ) continue;
          			$url = $img->image->resize(70,70,true);
          			echo '<div class="image" data-id="'.$oneId.'">';
          			echo '<img width="70" height="70" src="'.$url.'">';
          			echo '</div>';
        		}
        }
        
        echo '</span>';

        echo '</div>';

    		echo '<div class="clear"></div>';

        echo '</div>';
        echo '</div>';
    }

    static function printCheckbox( $data, $wName, $wID ){

        $value = $data->getValue();
        $enables = $data->getParam('enables');
        if( is_array($enables) ){$enables = implode("|", $enables);}

        $disables = $data->getParam('disables');
        if( is_array($disables) ){$disables = implode("|", $disables);}

        echo '<div class="component-element component-option-checkbox'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        echo '<label for="'.$wID.'">';
        echo '<input';
        echo ' id="'.$wID.'"';
        echo ' name="'.$wName.'"';
        echo ' value="1"';
        echo ' class="'.$data->getID();
        if( !empty( $enables  ) ){ echo ' data-enables'; }
        if( !empty( $disables ) ){ echo ' data-disables'; }
        echo '"';
        echo ' type="checkbox"';
        if( !empty( $value ) ){
            echo ' checked="checked"';
        }
        if( !empty( $enables  ) ){ echo ' data-enables="'.$enables.'"'; }
        if( !empty( $disables ) ){ echo ' data-disables="'.$disables.'"'; }
        echo '> ';
        echo $data->getTitle().'';
        echo '</label>';
        echo '</p>';
        echo '</div>';
    }

	static function printTabs( $data, $wName, $wID ){
		echo '<div class="component-element component-option-tabs'.self::getWrapperSubClassText($data).'">';
		echo '<p>';
		$tabs = $data->getParam('tabs');
		foreach ($tabs as $key=>$title) {
			echo '<span class="tab-item_container">';
			echo '<span class="tab-item_wrapper">';
			echo '<span class="tab-item" data-for="'.$key.'">';
			echo $title;
			echo '</span>';
			echo '</span>';
			echo '</span>';
		}
		echo '<input';
		echo ' id="'.$wID.'"';
		echo ' name="'.$wName.'"';
		echo ' value="'.htmlspecialchars( $data->getValue() ).'"';
		self::printInputClass($data);
		echo ' type="text"';
		echo ' data-for-class="'.$data->getParam('for-class').'"';
		echo '>';
		echo '</p>';
		echo '</div>';
	}

    static function printSelect( $data, $wName, $wID ){
        echo '<div class="component-element component-option-select'.self::getWrapperSubClassText($data).'">';
        echo '<p>';
        self::printTitleLabel($data->getTitle(), $wID);
        echo '<select';
        echo ' id="'.$wID.'"';
        echo ' name="'.$wName.'"';
        self::printInputClass($data);
        echo '>';
        foreach ($data->getOptions() as $key=>$option) {
            if( ffOptEnv::CALLBACK == $option->title ){
                $callbackValues = fdr::Get($option->value)->getList();
                foreach($callbackValues as $keyCB=>$optionCB) {
                    echo '<option value="'.htmlspecialchars($optionCB->value).'"';
                    if( $data->getValue() == $optionCB->value ){
                        echo ' selected="selected"';
                    }
                    echo '>'.$optionCB->title.'</option>';
                }
            }else{
                echo '<option value="'.htmlspecialchars($option->value).'"';
                if( $data->getValue() == $option->value ){
                    echo ' selected="selected"';
                }
                echo '>'.$option->title.'</option>';
            }
        }
        echo '</select>';
        echo '</p>';
        echo '</div>';
    }
    
    static function printImageList( $data, $wName, $wID ){
        echo '<div class="component-element component-option-image-list'.self::getWrapperSubClassText($data).'">';
        $title = $data->getTitle();
        if( !empty( $title ) ){
            echo '<p>';
            echo '<label for="'.$wID.'">';
            echo $data->getTitle().':';
            echo '</label>';
            echo '</p>';
        }

        echo '<p>';
        
        $img_style = "";
        
        $size = $data->getParam('size');
        if(!empty($size)){
            $size = explode("x", $size);
            $img_style .= "width:".$size[0]."px;height:".$size[1]."px;";
        }

        $background = $data->getParam('background');
        if(!empty($background)){
            $img_style .= "background-color:".$background.";";
        }

        foreach ($data->getOptions() as $key=>$option) {
            echo '<label class="radio-item';
            if( $data->getValue() == $option->value ){
                echo ' radio-item-active';
            }
            echo '">';
            echo '<span class="image_container"><span class="image_wrapper">';
            if( $option->value ){
                echo '<span class="image" style="background: url('.$option->value.');'.$img_style.'"></span>';
            }else{
                echo '<span class="image no-image" style="'.$img_style.'"></span>';
            }
            echo '</span></span>';
            echo '<input type="radio"';
            echo ' id="'.$wName.'"';
            echo ' name="'.$wID.'"';
            self::printInputClass($data);
            if( $data->getValue() == $option->value ){
                echo ' checked="checked"';
            }
            echo ' value="'.htmlspecialchars($option->value).'" /> ';
            echo '<span class="title">' .$option->title . "</span>";
            echo '</label>';
        }
        echo '<p>';
        echo '</div>';
    }

    static function printRadio( $data, $wName, $wID ){
        echo '<div class="component-element component-radio-select'.self::getWrapperSubClassText($data).'">';
        $title = $data->getTitle();
        if( !empty( $title ) ){
            echo '<p>';
            echo '<label for="'.$wID.'">';
            echo $data->getTitle().':';
            echo '</label>';
            echo '</p>';
        }

        foreach ($data->getOptions() as $key=>$option) {
            echo '<p>';
            echo '<label>';
            echo '<input type="radio"';
            echo ' id="'.$wName.'"';
            echo ' name="'.$wID.'"';
            self::printInputClass($data);
            if( $data->getValue() == $option->value ){
                echo ' checked="checked"';
            }
            echo ' value="'.htmlspecialchars($option->value).'" /> ';
            echo $option->title;
            echo '</label>';
            //echo "<br />" . $data->getValue() .' /// '. $option->value;
            echo '<p>';
        }
        echo '</div>';
    }

    static function printError( $data, $wName, $wID ){
        echo '<div class="component-element component-option-error">';
        echo '<strong>ERROR: UNKNOWN COMPONENT OPTION PRINTED</strong>';
        ffOptEnv::printStructure($data);
        echo '<strong>name / id:</strong>'.$wName.' / '.$wID;
        echo '</div>';
    }

}