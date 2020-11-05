jQuery(document).ready(function () {
    jQuery('.wrum_wrum').remove();

    jQuery('#installing_front .header').html('freshface Installation - step 4/4');
    jQuery('#installing_front .info').append('Plugins activation');

    jQuery('#installing_front .menu').append("<a href='./admin.php?page=ff_options#install' id='autoinstall_continue'>Finish</a>");

    jQuery('#installing_front .menu a').click( function(){
        jQuery('#installing_front .menu').css('display','none');
    });
});

