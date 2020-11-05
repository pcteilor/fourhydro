<?php
  
class ffWidgetAddress extends ffWidget {

    //protected $_structure = 'person';
    protected $_widgetAdminTitle =       "Address - Custom Widget";
    protected $_widgetAdminDescription = "Address Informations";
    protected $_widgetWrapperClasses =   "";
    protected $_widgetFormSize =         ffWidget::WIDGET_FORM_SIZE_WIDE;

    function widget( $args, $instance ) {

        extract( $args );

        $data = $this->load($instance);
        //$data = $data->getChilds();

        echo $before_widget;

  			echo $before_title . $data->Get('title') . $after_title;
  			
  			echo '<p>';
  				echo str_replace("\n", '<br />', $data->get('address') );
  			echo '</p>';
  			
  			echo '<p>';
  				foreach( $data->Get('contact-items') as $oneItem ) {
  					$prefix = ( $oneItem->Get('type') == 'phone') ? 'tel:' : 'mailto:';
  					echo '<a href="'.$prefix . $oneItem->Get('content').'" >';
  						echo $oneItem->Get('content');
  					echo '</a><br>';
  				}
  			echo '</p>';
        echo $after_widget;
    }
}

