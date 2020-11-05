<?php
  
class ffWidgetLogo extends ffWidget {

    //protected $_structure = 'person';
    protected $_widgetAdminTitle =       "Logo - Custom Widget";
    protected $_widgetAdminDescription = "Logo";
    protected $_widgetWrapperClasses =   "";
    protected $_widgetFormSize =         ffWidget::WIDGET_FORM_SIZE_WIDE;

    function widget( $args, $instance ) {

        extract( $args );

        $data = $this->load($instance);
        //$data = $data->getChilds();
		$charLimit = $data->get('char-limit');
        echo $before_widget;
        	echo '<a href="'.$data->get('logo-url').'" class="logo">';
				if( $data->get('logo-text-enabled') == 1 ) {
					echo $data->get('logo-text');
				} else {
					echo '<img src="'.$data->get('logo-image').'" alt="" />';
				}
			echo '</a>';
        echo $after_widget;
    }
}

