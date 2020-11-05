<?php

class ffFooterMenu extends Walker_Nav_Menu {


	public function start_el(&$output, $item, $depth = 0, $args = array(), $current_object_id = 0){


    if( 0 != $depth ) return;
    
		$class_names = $value = '';

		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
		$class_names = ' class="' . esc_attr( $class_names ) . '"';

		$id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
		$id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= "\n\n" . '<li' . $id . $value . $class_names .' >';

		$attributes = '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = $args->before;
		$item_output .= '<a'. $attributes .'>';

		$item_output .= $args->link_before . ( apply_filters( 'the_title', $item->title, $item->ID ) ) . $args->link_after;

		$item_output .= '</a>';

		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, 0, $args )."\n";

  }


  public function end_el( &$output, $item, $depth = 0, $args = array() ){
    if( 0 != $depth ) return;
    $output .= '</li>'."\n\n";
  }
}