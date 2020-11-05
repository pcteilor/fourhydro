jQuery(document).ready(function($) {

    var window_send_to_editor_orginal_function = window.send_to_editor;

    var add_image_button_hijacker_function = function(html) {
        imgurl = $('img',html).attr('src');
        $('#'+formfield).val(imgurl);
        window.send_to_editor = window_send_to_editor_orginal_function;
        tb_remove();
    }

    $("body").delegate(".add_image_button", "click", function(){
        formfield = $(this).attr('data-image-input');
        tb_show('Upload / Insert Image', 'media-upload.php?type=image&ffFunc=SINGLE_IMAGE&post_id=0&tab=type&TB_iframe=true');
        window.send_to_editor = add_image_button_hijacker_function;
        return false;
    });

    if( -1 != location.href.indexOf('ffFunc=SINGLE_IMAGE') ){
        $('#tab-type_url').css('display','none');
        $('.savesend .button').val('Use this Image');
        $('.media-item .image-size-item:last input').click();

        // Image Library
        if( -1 != location.href.indexOf('tab=library') ){
        		$('body').find('.describe-toggle-on').after('<a class="toggle button-use-image" href="#">Use</a>');
        		$('body').find('.button-use-image').css({'float':'right', 'line-height': '36px', 'margin-right':'15px'});
        		$('body').find('.button-use-image').unbind('click').click( function() {
                $(this).parents('.media-item:first').find(".savesend .button").click();
            });
        }
        // END Image Library

        // Image Upload
        if( -1 != location.href.indexOf('tab=type') ){
            setInterval( function() {
                items = $('body').find('.media-item');
                items.each(function( index ) {
                    if( 0 == $(this).find('.button-use-image').length ){
                    		$(this).find('.describe-toggle-on').after('<a class="toggle button-use-image" href="#">Use</a>');
                    		$(this).find('.button-use-image').css({'float':'right', 'line-height': '36px', 'margin-right':'15px'});
                    		$(this).find('.button-use-image').unbind('click').click( function() {
                            $(this).parents('.media-item:first').find(".savesend .button").click();
                        });
                    }
                });
            }, 300);
        }
        // END Image Upload
        
    }

});