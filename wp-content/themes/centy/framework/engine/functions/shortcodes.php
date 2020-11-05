<?php

////////////////////////////////////////////////////////////////////////////////
// Columns
////////////////////////////////////////////////////////////////////////////////

class ffShortcodesColumns{
    private static $shortcodes = array(
          // halves
          "one_half", "one_half_last",
          // thirds
          "one_third", "one_third_last", "two_third", "two_third_last",
          // fourth
          "one_fourth", "one_fourth_last", "two_fourth", "two_fourth_last", "three_fourth", "three_fourth_last",
    );

    static function one_half          ( $a, $c=null ){ return '<div class="one_half">'.do_shortcode(trim($c)).'</div>'; }
    static function one_half_last     ( $a, $c=null ){ return '<div class="one_half last">'.do_shortcode(trim($c)).'</div>'; }

    static function one_third         ( $a, $c=null ){ return '<div class="one_third">'.do_shortcode(trim($c)).'</div>'; }
    static function one_third_last    ( $a, $c=null ){ return '<div class="one_third last">'.do_shortcode(trim($c)).'</div>'; }
    static function two_third         ( $a, $c=null ){ return '<div class="two_third">'.do_shortcode(trim($c)).'</div>'; }
    static function two_third_last    ( $a, $c=null ){ return '<div class="two_third last">'.do_shortcode(trim($c)).'</div>'; }

    static function one_fourth        ( $a, $c=null ){ return '<div class="one_fourth">'.do_shortcode(trim($c)).'</div>'; }
    static function one_fourth_last   ( $a, $c=null ){ return '<div class="one_fourth last">'.do_shortcode(trim($c)).'</div>'; }
    static function two_fourth        ( $a, $c=null ){ return ffShortcodesColumns::one_half($a,$c); }
    static function two_fourth_last   ( $a, $c=null ){ return ffShortcodesColumns::one_half_last($a,$c); }
    static function three_fourth      ( $a, $c=null ){ return '<div class="three_fourth">'.do_shortcode(trim($c)).'</div>'; }
    static function three_fourth_last ( $a, $c=null ){ return '<div class="three_fourth last">'.do_shortcode(trim($c)).'</div>'; }

    static function init(){
        foreach ( ffShortcodesColumns::$shortcodes as $shortcode) {
            add_shortcode( $shortcode, array( 'ffShortcodesColumns', $shortcode ));

            $alter = str_replace("_","-",$shortcode );
            add_shortcode($alter , array( 'ffShortcodesColumns', $shortcode ));

            $alter = str_replace("_","",$shortcode );
            add_shortcode($alter , array( 'ffShortcodesColumns', $shortcode ));
        }
    }
}
ffShortcodesColumns::init();

///////////////////////////////////////////////////////////////////////////////
// Inline shortcodes
///////////////////////////////////////////////////////////////////////////////

class ffShortcodesInline{
    private static $shortcodes = array(
          "button", "dropcap", "pullquote_right", "pullquote_left", "box",
          "tabs", "tab_item",
          "accordeon", "accordeon_item", "accordion", "accordion_item",
          "specification", "col",
    );

    ////////////////////////////////////////////////////////////////////////////
    // Box
    static function box( $a, $c=null ){
        $d = array( 'color' => 'green');
        extract( shortcode_atts( $d, $a ) );
        return '<div class="box_'.$color.'">'.do_shortcode(trim($c)).'</div>';
    }

    ////////////////////////////////////////////////////////////////////////////
    // Pullquote(s)
    static function pullquote_right( $a, $c=null ){
        return "<span class='pullquote_right'>".do_shortcode(trim($c))."</span>";
    }

    static function pullquote_left( $a, $c=null ){
        return "<span class='pullquote_left'>".do_shortcode(trim($c))."</span>";
    }

    ////////////////////////////////////////////////////////////////////////////
    // Dropcap
    static function dropcap( $a, $c=null ){
        return "<span class='dropcap'>".do_shortcode(trim($c))."</span>";
    }

    ////////////////////////////////////////////////////////////////////////////
    // Button
    static function button( $a, $c=null ){
        $d = array( 'color' => 'blue', 'link' => '#');
        extract( shortcode_atts( $d, $a ) );
        return "<span class='main_button_$color'><a class='button button_light_bg noselect' href='$link'>".do_shortcode(trim($c))."</a></span>";
    }

    ////////////////////////////////////////////////////////////////////////////
    // Tabs
    private static $tabs_sections = array();

    static function tabs( $a, $c=null ){
        ffShortcodesInline::$tabs_sections = array();

        $items_html = do_shortcode(trim($c));

        if( empty( ffShortcodesInline::$tabs_sections ) ){
            return '';
        }

        $ret  = "<div class='tb_tabs'>";

        // TITLES
        $ret .= "<div class='tb_tabs_titles'>";
        foreach (ffShortcodesInline::$tabs_sections as $key=>$title) {
            $ret .= "<h3 class='tb_tabs_title";
            if( 0 == $key ) $ret .= " tb_tabs_title_active";
            $ret .= "'>$title</h3>";
        }
        $ret .= "</div>";

        // CLEAR
        $ret .= '<div class="clear"></div>';

        //CONTENT
        $ret .= "<div class='tb_tabs_items'>$items_html</div>";

        $ret .= "</div>";

        ffShortcodesInline::$tabs_sections = null;
        
        return $ret;
    }

    static function tab_item( $a, $c=null ){
        $d = array( 'title' => 'Tab');
        extract( shortcode_atts( $d, $a ) );
        $style = "";
        if( !empty( ffShortcodesInline::$tabs_sections ) ){
            $style = ' style="display: none;"';
        }
        ffShortcodesInline::$tabs_sections[] = $title;
        return '<div class="tb_tabs_item_content"'.$style.'><p>'.do_shortcode(trim($c)).'</p><div class="clear"></div></div>';

    }

    ////////////////////////////////////////////////////////////////////////////
    // Acordeon
    static function accordion( $a, $c=null ){ self::accordeon($a,$c); }
    
    static function accordeon( $a, $c=null ){
        return '<div class="tb_accordeon_wrapper"><div class="tb_accordeon">'.do_shortcode(trim($c)).'</div></div>';
    }

    static function accordion_item( $a, $c=null ){ self::accordion_item($a,$c); }
    static function accordeon_item( $a, $c=null ){
        $d = array( 'title' => '');
        extract( shortcode_atts( $d, $a ) );
        return '<div class="tb_accordeon_item">
                  <div class="tb_accordeon_item_post_title_wrapper">
                    <div class="tb_accordeon_item_arrows"></div>
                    <h3 class="tb_accordeon_item_title">'.$title.'</h3>
                    <div class="clear"></div>
                  </div>
                  <div class="tb_accordeon_item_content_wrapper" style="display: block; height: 0px;">
                    <div class="tb_accordeon_item_content">'.do_shortcode(trim($c)).'</div>
                  </div>
                </div>';
    }
    
    ////////////////////////////////////////////////////////////////////////////
    // Specification

    static function specification( $a, $c=null ){
        $d = array( 'title' => '');
        extract( shortcode_atts( $d, $a ) );
        return '<div class="specification-1_container">
                  <h4 class="specification_title">'.$title.'</h4>
                	<div class="specification-1_wrapper">
                		<div class="specification-1">
                      '.do_shortcode(trim($c)).'
                			<div class="clear"></div>
                		</div>
                	</div>
                </div>';
    }

    static function col( $a, $c=null ){
        $d = array( 'title' => '');
        extract( shortcode_atts( $d, $a ) );
        return '<div class="col">
          				<div class="item">
          					<div class="name">'.$title.'</div>
          					<div class="content">'.do_shortcode(trim($c)).'</div>
          				</div>
          				<div class="clear"></div>
          			</div>';
    }

    ////////////////////////////////////////////////////////////////////////////
    // Init

    static function init(){
        foreach ( ffShortcodesInline::$shortcodes as $shortcode) {
            add_shortcode( $shortcode, array( 'ffShortcodesInline', $shortcode ));
            if( FALSE !== strpos($shortcode,'_') ){
                $alter = str_replace("_","-",$shortcode );
                add_shortcode($alter , array( 'ffShortcodesColumns', $shortcode ));

                $alter = str_replace("_","",$shortcode );
                add_shortcode($alter , array( 'ffShortcodesColumns', $shortcode ));
            }
        }
    }
}

ffShortcodesInline::init();
