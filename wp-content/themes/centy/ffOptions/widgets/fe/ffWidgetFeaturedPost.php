<?php

class ffWidgetFeaturedPost extends ffWidget {

	//protected $_structure = 'person';
	protected $_widgetAdminTitle =       "Featured Post - Custom Widget";
	protected $_widgetAdminDescription = "Featured Post";
	protected $_widgetWrapperClasses =   "";
	protected $_widgetFormSize =         ffWidget::WIDGET_FORM_SIZE_WIDE;

	function widget( $args, $instance ) {

		extract( $args );

		$data = $this->load($instance);
		//$data = $data->getChilds();
		$charLimit = $data->get('char-limit');
		echo $before_widget;

		echo $before_title . $data->Get('title') . $after_title;

		$post_ID = 1 * $data->get('post');
		if( ! empty($post_ID) ){

			$post=  get_post( $post_ID );
			if( isset( $post ) ) {
				echo '<h4>';
				echo '<a href="'.get_permalink( $post->ID).'">';
				echo get_the_title($post->ID );
				echo '</a>';
				echo '</h4>';
	
				echo '<p>';
				echo substr( $post->post_content, 0, $charLimit);
				echo '</p>';
			}
		}
		echo $after_widget;
	}
}

