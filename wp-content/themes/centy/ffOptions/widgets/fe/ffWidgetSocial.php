<?php
  
class ffWidgetSocial extends ffWidget {

    //protected $_structure = 'person';
    protected $_widgetAdminTitle =       "Social - Custom Widget";
    protected $_widgetAdminDescription = "Social Informations";
    protected $_widgetWrapperClasses =   "";
    protected $_widgetFormSize =         ffWidget::WIDGET_FORM_SIZE_WIDE;

    function widget( $args, $instance ) {

        extract( $args );

        $data = $this->load($instance);
        //$data = $data->getChilds();

        echo $before_widget;

  			echo $before_title . $data->Get('title') . $after_title;
  			
  			$socialLinksParsed = new ffSocialFeeder( $data->get('links') );
  			if( !empty( $socialLinksParsed->items ) ) {
  				echo '<ul class="follow">';
	  				foreach( $socialLinksParsed->items as $oneLink ) {
	  					echo '<li>';
	  						echo '<a href="'.$oneLink->link.'" >';
	  							echo $oneLink->title;
	  						echo '</a>';
	  					echo '</li>';	
	  				}
  				echo '</ul>';
  			}
  			
  			
        echo $after_widget;
    }
}

