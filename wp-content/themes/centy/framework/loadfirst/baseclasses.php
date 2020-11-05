<?php

class componentBasic {
    private $imgBase = '';

    function __construct() {
        $this->imgBase = 'aaa';
    }
    function getDefOptions( $options ) {
        if( empty($options) ) {
            $new_opt = array();
            foreach( $this->options as $one_opt ) {
                if( isset($one_opt['default'] ) ) {
                    $new_opt[ $one_opt['id'] ] = $one_opt['default'];
                    $new_opt[  $one_opt['id'] ] = str_replace('fwdefloc/', fEnv::getImgPrevDir(), $new_opt[  $one_opt['id'] ]);
                }else{
                    $new_opt[ $one_opt['id'] ] = null;
                }
            }
            return $new_opt ;
        } else {
        	$newOptions = array();
        	foreach( $options as $key => $value ) {
        		$newOptions[ $key ] = str_replace('fwdefloc/', fEnv::getImgPrevDir(), $value );
        	} 
        	//var_dump( $options );
            return $newOptions;
        }
    }
    /**
     * this function is updating values, called by wordpress
     */
    function update($new_instance, $old_instance) {
        //save the widget
        foreach( $this->options as $one_option ) {
            $key = $one_option['id'];
            if( $one_option['type'] == 'text' ) {
                $instance[$key]    = strip_tags($new_instance[$key]);
            }
            else if( $one_option['type'] == 'checkbox' ) {
                $instance[$key] = 0;
                if( !empty($new_instance[$key]) ) $instance[$key] = 1;
            }
        }
        return $instance;
    }

    function escapeData( $widget_data ) {
        $widget_data = stripslashes_deep($widget_data );
        return $widget_data;
    }

    function printFullComponent( $widget_data ) {
        $widget_data = $this->getDefOptions( $widget_data );
        ob_start();
            $this->printComponent( $widget_data );
            $content = ob_get_contents();
        ob_end_clean();


        $ready_to_print = do_shortcode($content);
        echo $ready_to_print;

    }

    /**
     * this function is printing wordpress widget forms, called by wordpress
     */
    function form($instance) {
        $clon_in = false;
        echo '<div class="extra_wrapper">';
        foreach( $this->options as $one_option ) {

            if( isset( $one_option['default'] ) )
                $one_option['default'] = str_replace('fwdefloc/', fEnv::getImgPrevDir(), $one_option['default']);
            if( isset( $one_option['callback_function'] ) ) {
                $one_option['callback_return'] = call_user_func( $one_option['callback_function'] );
                //var_dump($one_option);
            }

             // CLONNING FEATURE - by javascript
             if( $one_option['id'] == 'clone_start' ) {
                 echo '<div class="clone_start">';
                $clon_in = true;
            }

             if( $one_option['id'] == 'clone_end' ) {

                    echo '<div class="clone_more">MORE</div>';
                    echo '<div class="clone_less">LESS</div>';
                                     echo '</div>';

                $clon_in = false;
            }
            if( $one_option['type'] == 'text' ) {

                $display = 'style="display:none;"';

                $value = $one_option['default'];

                if( isset($instance[ $one_option['id'] ]) ) {
              //      $value = $instance[ $one_option['id'] ];
                    $display = 'style="display:block;"';
                //    echo 'instance';
                }
                if( !$clon_in )
                    $display = null;

                //$value = null;
                echo '<div class="one_option_wrapper" '.$display.'>';
                echo '<p>';
                echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
                echo '<input id="' . ( $one_option['id'] ) . '" name="' . ( $one_option['id'] ) . '" type="text" value="'.$value.'">';

                echo '<span class="clear" style="display:block;"></span></p>';
                echo '<div class="clear"></div></div>';
            }
            else if( $one_option['type'] == 'image') {
                $display = 'style="display:none;"';

                $value = $one_option['default'];

                if( isset($instance[ $one_option['id'] ]) ) {

                    $display = 'style="display:block;"';

                }
                if( !$clon_in )
                    $display = null;

                //$value = null;
                echo '<div class="one_option_wrapper" '.$display.'>';
                echo '<p>';
                echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
                echo '<input id="' . ( $one_option['id'] ) . '" name="' . ( $one_option['id'] ) . '" type="text" value="'.$value.'">';
                echo '<a href="'.site_url().'/wp-admin/media-upload.php?TB_iframe=1&amp;width=640&amp;height=359" media-upload-link="'. $one_option['id'].'" class="thickbox add_media" id="" title="Add Media" onclick="return false;">Upload / Insert</a>';
                echo '<span class="clear" style="display:block;"></span></p>';
                echo '<div class="clear"></div></div>';

            }
            else if( $one_option['type'] == 'select-icon') {
                $value = $one_option['default'];
                echo '<div class="one_option_wrapper">';
                echo '<p>';

                echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';

                if( isset($one_option['select_values'] ) ) {
                    $select_values = $one_option['select_values'];
                }else{
                    $select_values = $one_option['callback_return'];
                }

                echo '<input id="'  . ( $one_option['id'] ) . '" name="' . ( $one_option['id'] ) . '" type="text" value="'.$value.'">';

                $teplate_dir = get_template_directory_uri();
                $THEME_COLOR = fOpt::Get('skins','theme-color-skin');

                echo '<span class="input">';
                foreach( $select_values as $one_sub_option ) {
                    echo '<span class="select-icon-for-'.$one_option['id'].'"';
                    echo ' data-value="'.$one_sub_option['value'].'"';
                    echo '>';
                    if( empty( $one_sub_option['path'] ) ){
                        $img = str_replace( "%%%value%%%", $one_sub_option['value'], $one_option['icon-path']);
                    }else{
                        $img = $one_sub_option['path'];
                        $img = str_replace( "%%%theme-color%%%", $THEME_COLOR, $img);
                    }
                    echo '<img src="'.$teplate_dir.$img.'" />';
                    echo '</span>';
                }
                echo '</span>';

                echo '</p>';
                echo '<div class="clear"></div></div>';
            }
            else if( $one_option['type'] == 'select') {
            	if( isset($one_option['default'] ) ) 
                	$value = $one_option['default'];
            	else 
            		$value = '';
                echo '<div class="one_option_wrapper">';
                echo '<p>';

                    echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
                    echo '<select id="' . ( $one_option['id'] ) . '" name="' . ( $one_option['id'] ) . '" type="text" value="'.$value.'">';
                        $select_values = array();
                        if( isset($one_option['select_values'] ) ) $select_values = $one_option['select_values'];
                        else $select_values = $one_option['callback_return'];
                        foreach( $select_values as $one_sub_option ) {

                            $selected = '';
                            if( $value == $one_sub_option['value'] )
                                $selected = ' selected="selected" ';

                            echo '<option value="'. $one_sub_option['value'] .'">'. $one_sub_option['name'] . '</option>';
                        }
                    echo '</select>';
                echo '</p>';
                echo '<div class="clear"></div></div>';
            }
            
            else if( $one_option['type'] == 'select-category') {
            	$value = $one_option['default'];
            	echo '<div class="one_option_wrapper">';
            	echo '<p>';
            
            	echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
            	echo '<select id="' . ( $one_option['id'] ) . '" name="' . ( $one_option['id'] ) . '" type="text" value="'.$value.'">';
            	$select_values = $this->_getCategories(); //array();
            	//if( isset($one_option['select_values'] ) ) $select_values = $one_option['select_values'];
            	//else $select_values = $one_option['callback_return'];
            	foreach( $select_values as $one_sub_option ) {
            
            		$selected = '';
            		if( $value == $one_sub_option['value'] )
            			$selected = ' selected="selected" ';
            
            		echo '<option value="'. $one_sub_option['value'] .'">'. $one_sub_option['name'] . '</option>';
            	}
            	echo '</select>';
            	echo '</p>';
            	echo '<div class="clear"></div></div>';
            }            

            else if( $one_option['type'] == 'textarea' ) {
                $display = 'style="display:none;"';


                $value = $one_option['default'];
               if( isset($instance[ $one_option['id'] ]) ) {
                    $value = $instance[ $one_option['id'] ];
                    $display = 'style="display:block;"';

                }

                if( !$clon_in )
                    $display = null;


               echo '<div class="one_option_wrapper" '.$display.'>';
                echo '<p>';
                   echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
                ff_editor ( $value,  $one_option['id'] );

                echo '</p>';
                echo '<div class="clear"></div></div>';

            }

            else if( $one_option['id'] == 'html_name') {
            echo '<div class="modal_header"><h2>' . $one_option['description'] . '</h2></div>';
            }

            else if( $one_option['type'] == 'html') {
                echo '<div class="one_option_wrapper" '.$display.'>';
                echo '<p>';
                echo $one_option['description'];
                echo '</p>';
                echo '</div>';
            }

            else if( $one_option['type'] == 'checkbox' ) {
                echo '<div class="one_option_wrapper">';

                if( ( !isset($instance[ $one_option['id'] ]) && $one_option['default'] == 1 ) || $instance[ $one_option['id'] ] == 1 ) $value = 'checked="checked"';
                echo '<p>';
                echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
                echo '<input id="' . ( $one_option['id'] ) . '" name="' . ( $one_option['id'] ) . '" type="checkbox" '.$value.'>';
                echo '</p>';
                echo '<div class="clear"></div></div>';
            }

        else if( $one_option['type'] == 'textarea-exact' ) {
                $display = 'style="display:none;"';


                $value = $one_option['default'];
               if( isset($instance[ $one_option['id'] ]) ) {
                    $value = $instance[ $one_option['id'] ];
                    $display = 'style="display:block;"';

                }

                if( !$clon_in )
                    $display = null;


               echo '<div class="one_option_wrapper" '.$display.'>';
                echo '<p>';
                   echo '<label for="' . ( $one_option['id'] ) . '">' . $one_option['description'] . '</label>';
               echo '<textarea style="width:458px; height: 200px" name="'.$one_option['id'].'">'.$value.'</textarea>';

                echo '</p>';
                echo '<div class="clear"></div></div>';

            }
        }
        echo '<div class="modal_footer"></div></div>';

    }

    public function getOptions() {
        return $this->options;
    }
    
    private function _getCategories(){
    	$items = array();
    	$args = array( 'hide_empty' => false );
    	$pads = array( 0=>'' );
    	$categories = get_categories( $args );
    	foreach ($categories as $category) {
    		if( 0 != $category->category_parent ){
    			$act_pads = $pads[ $category->category_parent ] . ' - ';
    		}else{
    			$act_pads = '';
    		}
    		$items[] = array(
    				'name' => $act_pads . $category->name.' ('.$category->category_count.')',
    				'value' => $category->term_id
    		);
    		$pads[ $category->term_id ] = $act_pads;
    	}
    	return $items;
    }
}


interface htmlPrinterInterface {
    //public function title();
    //public function content();
    //public function formatedDate();
    //public function meta();
    
}



/****************************************************************************************************************************************************************
 * SLIDER DATA MANAGING
 ****************************************************************************************************************************************************************/
define ('SLIDERMANAGER_SLIDE_NAMESPACE', "slidermanager_sliders");
define ('SLIDERMANAGER_SETTINGS_NAMESPACE', "slidermanager_settings");
class fSliderManagerDataManager {
    private $sliders = array();
    private $types = array();
    
    
    public function __construct() {
        $this->loadCollection();
    }
    
    public function loadCollection() {
        $this->loadDataCollection();
        $this->loadTypeCollection();
    }
    
    public function saveCollection() {
        $this->saveDataCollection();
        $this->saveTypeCollection();
    }
    
    public function addSliderType( $slider_type, $slider_name ) {
        $this->types[ $slider_type ] = $slider_name;
        $this->saveCollection();
    }
    
    public function removeSliderType( $slider_type ) {
        unset( $this->types[ $slider_type ] );
        $this->types = array_values( $this->types );
        $this->saveCollection();
    }
    
    
    public function getTypes() {
        return $this->types;
    }
    
    public function addSlider( fSliderManagerSliderDataObject $slider_data_object ) {
        $slider_name = $slider_data_object->name;

        $this->sliders[ $slider_name ] = $slider_data_object;
    
    //    var_dump($this->sliders[ $slider_name ]);
        $this->saveCollection();
    }
    public function duplicateSlider( $old_name, $new_name ) {
        $sdo = clone $this->sliders[ $old_name ];
        $sdo->name = $new_name;
        $this->sliders[ $new_name ] = $sdo;        
        $this->saveDataCollection();
    }
    public function renameSlider( $old_name, $new_name ) {
        $sdo = $this->sliders[ $old_name ];
        $sdo->name = $new_name;
        $this->sliders[ $new_name ] = $sdo;
        $this->deleteSlider( $old_name );
        $this->saveDataCollection();
    }
    
    public function deleteSlider( $name ) {
        unset( $this->sliders[ name ]);
        fOpt::Delete(SLIDERMANAGER_SLIDE_NAMESPACE, $name);
    }
    
    public function editSlider( fSliderManagerSliderDataObject $slider_data_object ) {
        $slider_name = $slider_data_object->name;
        if( !isset( $this->sliders[ $slider_name] ))
            return false;
        
        $this->sliders[ $slider_name ] = $slider_data_object;
        $this->saveCollection();
    }
    
    public function getSlider( $slider_name ) {
        if( isset( $this->sliders[ $slider_name] ) )
            return $this->sliders[ $slider_name ];
        else 
            return false;
    }
    
    public function getSliders() {
        if( isset( $this->sliders ) )
            return $this->sliders;
        else
            return null;
    }
    
    /**
     * this function loads all the slider types stored in options
     *
     * @return void
     * @author  
     */
    private function loadTypeCollection()
    {
        $types = fOpt::GetObject( SLIDERMANAGER_SETTINGS_NAMESPACE, 'slider_types');
        if( $types != null )
            $this->types = $types;
    }
    
    /**
     * usaveTypeCollection - save all the slider types in the collection
     *
     * @return void
     * @author  
     */
    public function saveTypeCollection() {
        if( $this->types != null )
            fOpt::SetObject( SLIDERMANAGER_SETTINGS_NAMESPACE, 'slider_types', $this->types);
    }
    private function loadDataCollection() {
        
        $all_slider_names = fOpt::GetNamespace( SLIDERMANAGER_SLIDE_NAMESPACE );
        if( $all_slider_names == null ) return false;
        foreach( $all_slider_names as $slider_name => $value ) {
            $sliderDataObject = fOpt::GetObject( SLIDERMANAGER_SLIDE_NAMESPACE , $slider_name );
            $this->sliders[ $slider_name ] = $sliderDataObject;
        }
    }
    
    private function saveDataCollection() {
        $sliders = $this->sliders;
        if( $sliders == null ) return false;
        foreach( $sliders as $one_slider_name => $one_slider_data_object ) {
            fOpt::SetObject( SLIDERMANAGER_SLIDE_NAMESPACE, $one_slider_name, $one_slider_data_object);
        }
    }
    
    
}


/****************************************************************************************************************************************************************
 * SLIDER DATA OBJECT
 ****************************************************************************************************************************************************************/
class fSLiderManagerSliderDataObject {
    public $name  = null;        // slider name
    public $typeName = null;    // class name which represents the slider
    public $options    = array();        // options which represents the slider options
    public $slides = array();        // slides of the slider
    
    /**
     * Fill slider name and slider type (Accordeon, 3D ...)
     */
    public function __construct( $slider_name, $slider_type ) {
        $this->name = $slider_name;
        $this->typeName = $slider_type;
    }
    
    
    public function addSlide( fSliderManagerSlide $slide_to_add ) {
        $this->slides[] = $slide_to_add;
    }
}

/**
 * Holds all info about the slide
 */
class fSliderManagerSlide {
    public $imageUrl = null;
    public $imageLink = null;
    public $action = null;
    public $title = null;
    public $description = null;
    public $transition = null;
}
?>