
ff_on_body_active_interval = setInterval(function(){ff_deactivate_body()},100);

function ff_deactivate_body(){
    if( jQuery('body').length ){
        jQuery('body').prepend('<div id="installing_background"></div>');
        jQuery('body').prepend('<div id="installing_front_container"><div id="installing_front_wrapper"><div id="installing_front"></div></div></div>');
        jQuery('#installing_front').append("<div class='header'></div>");
        jQuery('#installing_front').append("<div class='info'></div>");
        //jQuery('#installing_front').append("<div class='header'> ___HEADER___ </div>");
        //jQuery('#installing_front').append("<div class='info'> ___INFO___ </div>");
        jQuery('#installing_front').append("<div class='separator'> &nbsp; </div>");
        jQuery('#installing_front').append("<div class='wrum_wrum'>Loading ...</div>");
        window.clearInterval( ff_on_body_active_interval );
    }
}

jQuery(document).ready(function () {
    if( 0 == jQuery('#installing_front div').length ){
        window.clearInterval( ff_on_body_active_interval );
        ff_deactivate_body();
    }

    window.setTimeout(function(){jQuery("a[href='#install']").click();}, 200);

    jQuery('#installing_front').append("<div class='menu'></div>");

    jQuery("body").delegate("#installing_front .menu .abort", "click", function() {
        jQuery("#installing_background").remove();
        jQuery("#installing_front_container").remove();
        location.replace('./admin.php?page=ff_options#install');

        return false;
    });
});