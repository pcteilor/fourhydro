jQuery(document).ready(function () {
    jQuery('.wrum_wrum').remove();

    jQuery('#installing_front .header').html('freshface Installation - step 1/4');
    jQuery('#installing_front .info').append('Do you wish to install all required plugins?');

    jQuery('#installing_front .menu').append("<a href='./admin.php?page=ff_options#install' id='autoinstall_abort' class='abort'>No, don't install anything</a>");
    jQuery('#installing_front .menu').append(" | ");
    jQuery('#installing_front .menu').append("<a href='./themes.php?page=install-required-plugins&ff_install=basic&install-action=2' id='autoinstall_continue' style='color:#FF0000'>Yes, install</a>");

    jQuery('#installing_front .menu a').click( function(){
        jQuery('#installing_front .menu').css('display','none');
    });
    
});