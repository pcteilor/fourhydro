jQuery(document).ready(function () {
    jQuery('.wrum_wrum').remove();

    jQuery('#installing_front .header').html('freshface Installation - step 3/4');
    jQuery('#installing_front .info').append('Plugins installation');

    jQuery('#installing_front .menu').append("<a href='./themes.php?page=install-required-plugins&ff_install=basic&install-action=4'>Activate</a>");

    jQuery('#installing_front .menu a').click( function(){
        jQuery('#installing_front .menu').css('display','none');
    });
});

