<?php

class ffWidget extends WP_Widget {

    const WIDGET_FORM_SIZE_WIDE = 'wide';
    const WIDGET_FORM_SIZE_THIN = 'thin';
    protected $_componentStructureName = null;

    protected $_componentStructure =     null;
    protected $_widgetAdminTitle =       "NO-DESCRIPTION - Custom Widget";
    protected $_widgetAdminDescription = " - No info - ";
    protected $_widgetWrapperClasses =   "";
    protected $_widgetFormSize =         ffWidget::WIDGET_FORM_SIZE_THIN;
                                         // or may be ffWidget::WIDGET_FORM_SIZE_WIDE;

    function __construct() {
        if( empty($this->_componentStructureName) ){
            $componentName = get_class($this);
            $componentName = "wg".substr($componentName,8);
            $this->_componentStructureName = $componentName;
        }

        $this->_componentStructure = ffStructureFactory::get( $this->_componentStructureName );
        
        $options = array('classname' => get_class($this), 'description' => __( $this->_widgetAdminDescription ) );
    		$controls = array('width' => $this->_getFormSize(), 'height' => 200);
    		$this->WP_Widget( get_class($this) , __( $this->_widgetAdminTitle ), $options, $controls);
    }

    function load($instance){
        return ffWidgetLoader::load(
                                      $this->_componentStructureName,
                                      $this->_componentStructure,
                                      $instance
                                  );
    }

    function update( $new_instance, $old_instance ) {

        $instance = array();

        $zero = ffOptEnv::PATH_NAME_SEPARATOR . '0' . ffOptEnv::PATH_NAME_SEPARATOR;

        foreach ($new_instance as $key=>$value) {
            if( FALSE !== strpos($key, $zero) ){
                unset($new_instance[$key]);
            }
        }

        $newKeys = array();

        foreach ($new_instance as $key=>$value) {
            if( ffOptEnv::PATH_NAME_SEPARATOR.'_rptblIndex' == substr($key, -strlen(ffOptEnv::PATH_NAME_SEPARATOR.'_rptblIndex')) ){
                $key_to_remove = substr($key, 0, -strlen(ffOptEnv::PATH_NAME_SEPARATOR.'_rptblIndex') );

                $new_key = substr( $key_to_remove, 0, strrpos($key_to_remove, ffOptEnv::PATH_NAME_SEPARATOR) )
                            . ffOptEnv::PATH_NAME_SEPARATOR . (10000+$value);

                $newKeys[ $key_to_remove ] = $new_key;
            }
        }

        foreach ($new_instance as $key=>$value) {
            foreach ($newKeys as $key_to_remove=>$new_key) {
                if( 0 === strpos($key, $key_to_remove) ){
                    $key = str_replace($key_to_remove, $new_key, $key);
                }
            }
            $instance[$key] = $value;
        }

        return $instance;
    }

    function form( $instance ) {
        $data = ffWidgetLoader::load($this->_componentStructureName, $this->_componentStructure, $instance);
        echo '<script>jQuery(".section-control-recount-indexes").click();</script>';
        echo '<script>jQuery(".section-control-close").click();</script>';
        ffPrinterBEComponents::printBackEnd($this, $data);
    }

    protected function _getFormSize(){
        $size = 250;
        if( $this->_widgetFormSize == ffWidget::WIDGET_FORM_SIZE_WIDE ){
            $size = 430;
        }
        return $size;
    }


}
