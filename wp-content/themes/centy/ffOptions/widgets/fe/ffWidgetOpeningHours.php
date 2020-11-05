<?php
  
class ffWidgetOpeningHours extends ffWidget {

    //protected $_structure = 'person';
    protected $_widgetAdminTitle =       "Opening hours - Custom Widget";
    protected $_widgetAdminDescription = "List of days and opening hours";
    protected $_widgetWrapperClasses =   "";
    protected $_widgetFormSize =         ffWidget::WIDGET_FORM_SIZE_WIDE;

    function widget( $args, $instance ) {

        extract( $args );

        $data = $this->load($instance);
        //$data = $data->getChilds();

        echo $before_widget;

  			echo $before_title . $data->Get('title') . $after_title;

        echo '<table>';
        foreach ($data->Get('day-items') as $key=>$section) {
            echo "<tr>";
            echo "<td> " . $section->Get('title') . "</td>";
            echo "<td> " . $section->Get('hours') . "</td>";
            echo "</tr>";
        }
        echo '</table>';

        echo $after_widget;
    }
}

