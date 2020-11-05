<?php

class ffNavigationMenu extends Walker_Nav_Menu {

	private $_submenuBuffer = '';
	private $_isFirst = false;
	private $_isLast = false;
	
    // see
    // http://wordpress.stackexchange.com/questions/16818/add-has-children-class-to-parent-li-when-modifying-walker-nav-menu
    // for more info
    
    function display_element( $element, &$children_elements, $max_depth, $depth=0, $args, &$output ) {
        $id_field = $this->db_fields['id'];
        if ( is_object( $args[0] ) ) {
            $args[0]->has_children = ! empty( $children_elements[$element->$id_field] );
        }
        return parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }

    function start_lvl( &$output, $depth = 0, $args = array() ) {
    	$this->_isFirst = true;
        $output .= "\n".str_repeat( "\t", $depth*2 + 2 );

        $output .= '<ul class="sub-menu">';
  	}

  	function end_lvl( &$output, $depth = 0, $args = array() ) {
  		
  			$output .= str_replace('lastclassreplacer', 'last', $this->_submenuBuffer);
  			$this->_submenuBuffer = '';
    		$output .= "\n".str_repeat( "\t", $depth*2 + 2 );

        $output .= "</ul>";
  	}
                   //(&$output, $object, $depth = 0, $args = Array, $current_object_id = 0)
	function start_el(&$outputPointer, $item, $depth=0, $args = array(), $current_object_id = 0) {

		$outputPointer .= str_replace('lastclassreplacer', '', $this->_submenuBuffer);
		$this->_submenuBuffer = '';

		$output = '';

		$output .= "\n".str_repeat( "\t", $depth*2 + 1 );

		//echo '<!--';print_r($args);echo '-->';

        $isCurrentItem = in_array('current-menu-item',$item->classes);
    		if( $isCurrentItem ) {
    			$aClass = ' class="current" ';
    		} else {
    			$aClass = '';
    		}

    		$class_names = $value = '';

    		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
    		$classes[] = 'menu-item-' . $item->ID;
    		$classes[] = 'lastclassreplacer';
    		if( $this->_isFirst ) {
    			$classes[] = 'first';
    			$this->_isFirst = false;
    		}

 
        		if( isset($args) && isset($args->has_children) && $args->has_children ){
        		    $classes[] = 'submenu';
        		}
 
    		//$classes[] = 'menu-item';

    		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
    		$class_names = ' class="' . esc_attr( $class_names ) . '"';

    		$id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
    		$id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';

    		$output .= '<li' . $id . $value . $class_names .' >';
    		$output .= "\n".str_repeat( "\t", $depth*2 + 2 );

        $aclasses = array();
        if(0 == $depth){
            $aclasses[] = 'top-menu-item-a';
        		if( isset($args) && isset($args->has_children) &&  $args->has_children ){
                $aclasses[] = 'top-menu-item-has-sub-menu-a';
        		}
        }

    		$attributes = '';
    		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
    		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
    		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';
    		$attributes .= ! empty( $aclasses )         ? ' class="'  . implode(' ',$aclasses       ) .'"' : '';

    		$item_output = $args->before;
    		$item_output .= '<a'. $attributes .'>';

    		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;

    		$item_output .= '</a>';

    		$item_output .= $args->after;

    		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    		if( $depth >= 1 ) {
    			
    			$this->_submenuBuffer .=$output;
    		}
    		else { 
    			$outputPointer .= str_replace('lastclassreplacer', '', $output );
    		}
  	}

	function end_el( &$outputPointer, $item, $depth = 0, $args = array() ) {

		$output = '';
		
		$output .= "\n".str_repeat( "\t", $depth*2 + 1 );
		$output .= "</li>";

		if( $depth >= 1 ) {
			$this->_submenuBuffer .= $output;
		} else {
			$outputPointer .= $output;
		}
	}
}