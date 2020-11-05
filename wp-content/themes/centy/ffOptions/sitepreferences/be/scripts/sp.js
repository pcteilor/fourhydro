// add_submenus.js
__ff_sitepreferences_submenu = null;

// ajax_loader.js

__ff_global_site_preferences_loaded = new Array();
__ff_global_site_preferences_loaded_item = null;

// ajax_saver.js

__ff_data_to_ajax_send = {};

////////////////////////////////////////////////////////////////////////////////
// add_submenus.js                                                            //
////////////////////////////////////////////////////////////////////////////////

jQuery(document).ready(function($) {
    $('.ff_SP #ffOptions-content-right>div').each(function(index){
      if( ! $(this).hasClass('repeatable') ){
          return;
      }
      tab = $(this).attr('data-path');
      menu = $("a[href='#"+tab+"']").parent();
      menu.append( '<div class="submenu"></div>' );
      __ff_sitepreferences_submenu = menu.find('.submenu');

      $(this).children('.section-content').children('.component-0').find('.__system_id option').each(function(){
          tax = $(this).parents('.component-0:first').find('.__system_taxonomy').val();

          val = $(this).val();
          txt = $(this).html();
          sub = 0;

          for(i=0;i<txt.length;i++){
              if( '-' != txt[i] ) break;
              sub ++;
          }

          txt = txt.substr(sub);
          sub = sub / 3;
          for(i=0;i<sub;i++){
              txt = '<span>' + txt + '</span>';
          }

          app = '<div class="submenu-item';
          if( 0 == val ){
              app = app + ' submenu-item-default"';
          }
          app = app + '" data-term-id="'+val+'" data-term-taxonomy="'+tax+'">'+txt+"</div>";

          __ff_sitepreferences_submenu.append( app );
        });

        if( 1 >= menu.find('.submenu .submenu-item').size()){
            // there is only default
            menu.find('.submenu').removeClass('submenu').addClass('submenu-hidden');
        }
    });

    $('.ff_SP .submenu-item').click(function(){
        $('.ff_SP .submenu-item').removeClass('submenu-item-active');
        $(this).addClass('submenu-item-active');
    });

//});

////////////////////////////////////////////////////////////////////////////////
// ajax_loader.js                                                             //
////////////////////////////////////////////////////////////////////////////////

//jQuery(document).ready(function($) {

    $(".ff_SP .namespace-switcher").click(function(){
        $(this).parent().find('.submenu-item-default').click();
    });

    $('.ff_SP .ffOptions-content-menu-item .submenu-item').click(function(){
        $('.ff_SP #ffOptions-content-right > .section > .section-content > .section').stop(true, true).hide();

        tax = $(this).attr('data-term-taxonomy');
        term_id = $(this).attr('data-term-id');
        //$('body').prepend("<div>" + term_id + ' / ' + tax + "</div>");

        if( undefined === __ff_global_site_preferences_loaded[tax] ){
            __ff_global_site_preferences_loaded[tax] = new Array();
        }

        if( 0 == term_id ){
            dom_id = $('.component-'+tax+get_PATH_NAME_SEPARATOR()+'0').attr('data-path');
            __ff_global_site_preferences_loaded[tax][term_id] = dom_id;
        }

        if( undefined === __ff_global_site_preferences_loaded[tax][term_id] ){
            $('.theme_options_save').attr('disabled', 'disabled');
            jQuery('.ff_SP .loading').show();
            __ff_global_site_preferences_loaded[tax][term_id] = 'loading';

            if( 0 == term_id ){
                dom_id = $('.component-'+tax+get_PATH_NAME_SEPARATOR()+'0').attr('data-path');
            }else{
                $('.component-'+tax+get_PATH_NAME_SEPARATOR()+'0 > .section-title .section-control-add-after').click();
                dom_id = $('.component-'+tax+get_PATH_NAME_SEPARATOR()+'0').next('.section').attr('data-path');
            }

            if( __ff_global_site_preferences_loaded_item ){
                $('.component-' + __ff_global_site_preferences_loaded_item).stop(true, true).hide();
            }
            __ff_global_site_preferences_loaded_item = dom_id;

            // hack with repeatable
            jQuery('.component-' + __ff_global_site_preferences_loaded_item).stop(true, true).show().css('display','none');

            $.ajax({
                url: get_template_directory_uri() + "/ffOptions/sitepreferences/be/ffSPAjaxLoader.php?taxonomy="+tax+"&id="+term_id+"&dom_id="+dom_id,
            }).done(function ( data ) {
                jQuery('body').append(data);
                setInterval( function(){ jQuery('.ff_SP .loading').stop(true, true).hide(); }, 200);
                jQuery('.component-' + __ff_global_site_preferences_loaded_item).stop(true, true).show().css({ opacity: 0.2 }).animate({ opacity: 1 })
                $('.theme_options_save').removeAttr('disabled');
                jQuery('input[type=checkbox]').each(function(){
                    _this = jQuery(this);
                    if( 0 == _this.val() ){
                        _this.val(1);
                        _this.removeAttr('checked');
                        _this.click();
                        _this.removeAttr('checked');
                    }
                });
            });
        }else{
            jQuery('.component-' + __ff_global_site_preferences_loaded[tax][term_id]).stop(true, true).show().css({ opacity: 0.2 }).animate({ opacity: 1 });
        }
    });
//});

////////////////////////////////////////////////////////////////////////////////
// ajax_saver.js                                                              //
////////////////////////////////////////////////////////////////////////////////

//jQuery(document).ready(function($) {
    function add_to__ff_data_to_ajax_send_value(){
        __ff_data_to_ajax_send[ $(this).attr("name") ] = $(this).val();
    }

    function add_to__ff_data_to_ajax_send_radio(){
        //active = ( 'checked' == $(this).attr( 'checked' ) );
        __ff_data_to_ajax_send[ $(this).attr("name") ] = $(this).val();
    }

    function add_to__ff_data_to_ajax_send_check(){
        active = ( 'checked' == $(this).attr( 'checked' ) );
        __ff_data_to_ajax_send[ $(this).attr("name") ] = 1 * active;
    }

    $(".ff_SP .theme_options_save").click(function(){
        if( 'disabled' == $('.theme_options_save').attr('disabled')){
            return;
        }

        $( '.component-element input:radio:checked' ).each( add_to__ff_data_to_ajax_send_radio );
        $( '.component-element input:checkbox' ).each(      add_to__ff_data_to_ajax_send_check );
        $( '.component-element input:text' ).each(          add_to__ff_data_to_ajax_send_value );
        $( '.rptblIndex' ).each(                            add_to__ff_data_to_ajax_send_value );
        $( '.component-element textarea' ).each(            add_to__ff_data_to_ajax_send_value );
        $( '.component-element select' ).each(              add_to__ff_data_to_ajax_send_value );

        $('.theme_options_save').attr('disabled', 'disabled');

        if( 0 == $('.ff_SP-saving').length ){
            $('body').prepend('<div class="ff_SP-saving"></div>');
            $('.ff_SP-saving').prepend('<div class="sp_box_container"><div class="sp_box_wrapper"><div class="sp_box">Saving</div></div></div>');
            $('.ff_SP-saving').prepend('<div class="sp_background"></div>');
        }
        $('.ff_SP-saving').stop().fadeIn();

        $.post(
            get_template_directory_uri() + "/ffOptions/sitepreferences/be/ffSPAjaxSaver.php",
            __ff_data_to_ajax_send,
            function(response) {
                $('.ff_SP-saving').stop().fadeOut();
                $('body').prepend(response);
                $('.theme_options_save').removeAttr('disabled');
                console.log(__ff_data_to_ajax_send);
            }
        );


    });
//});

////////////////////////////////////////////////////////////////////////////////
// repeatable.js                                                              //
////////////////////////////////////////////////////////////////////////////////

//jQuery(document).ready(function($) {
    secTit = ".ff_SP #ffOptions-content-right > .repeatable > .section-content > .section > .section-title";

    $(secTit + " .section-control-open").click();
    $(secTit + " .section-control-recount-indexes").remove();
    $(secTit + " .section-control-remove").remove();
    $(secTit + " .section-control-remove-off").remove();
    $(secTit + " .section-control-move-up").remove();
    $(secTit + " .section-control-move-up-off").remove();
    $(secTit + " .section-control-move-down").remove();
    $(secTit + " .section-control-move-down-off").remove();
    $(secTit + " .section-control-add-before").remove();
    $(secTit + " .section-control-close").remove();
    $(secTit + " .section-control-open").remove();

    $(secTit).css('display','none');
});
