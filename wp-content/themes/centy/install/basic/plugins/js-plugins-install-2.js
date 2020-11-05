var plugins_to_install_count = 0;

jQuery(document).ready(function () {
    jQuery('.wrum_wrum').remove();

    jQuery('#installing_front .header').html('freshface Installation - step 2/4');

    jQuery('#tgmpa-plugins .plugins #the-list tr').each( function(index){
        if( 'Not Installed' == jQuery(this).find('.column-status').html() ){
            jQuery(this).find('.check-column input').attr('checked','checked');
            plugins_to_install_count ++;
        }
    });

    if( 0 < jQuery('#tgmpa-plugins .plugins #the-list input').length ){
        jQuery('#installing_front .info').append('Selecting plugins for installation');
        jQuery('#installing_front .menu').append("<a href='#' id='autoinstall_continue'>Install</a>");
    }else{
        jQuery('#installing_front .info').append('All done - all plugins are installed');
        jQuery('#installing_front .menu').append("<a href='./admin.php?page=ff_options#install' id='autoinstall_continue'>Finish</a>");
    }

    jQuery('#installing_front #autoinstall_continue').click( function(){
        jQuery('#tgmpa-plugins').attr('action', './themes.php?page=install-required-plugins&ff_install=basic&install-action=3');
        jQuery('#tgmpa-plugins .plugins input[type=checkbox]').attr('checked','checked');
        jQuery('#tgmpa-plugins select').val('tgmpa-bulk-install');
        jQuery('#tgmpa-plugins #doaction').click();
    });

    jQuery('#installing_front .menu a').click( function(){
        jQuery('#installing_front .menu').css('display','none');
    });
});