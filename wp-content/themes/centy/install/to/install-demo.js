jQuery(document).ready(function () {

    jQuery('#installing_front .header').html('Full Demo Content Install');
    jQuery('#installing_front .info').append('<iframe src="' + get_template_directory_uri() + '/install/to/install-demo.php" name="install-demo"></iframe>');
    
    jQuery('#installing_front iframe').load(function(){
        //jQuery(this).css('border-top', '10px solid Black');
        this.style.height = (20 + this.contentWindow.document.body.offsetHeight) + 'px';
        jQuery('#installing_front_container').animate({top:'20px'}, 200);

        jQuery('#installing_front .wrum_wrum').remove();
        jQuery('#installing_front .separator').remove();

        if( 0 == jQuery('#installing_front .menu a').size() ){
            jQuery('#installing_front .menu').append('<a href="#" class="abort button">Cancel</a>');
            jQuery('#installing_front .menu').append(' &nbsp; ');
            jQuery('#installing_front .menu').append('<a href="' + get_template_directory_uri() + '/install/to/install-demo.php?installation=1" target="install-demo" class="install-demo-button button">Install Full Demo Installation</a>');
        }

        jQuery('#installing_front .menu .install-demo-button').click( function(){
            jQuery('#installing_front .menu').css('display','none');
        });

        if( 0 == jQuery(this.contentWindow.document.body).find('.warning').size() ){
            jQuery('#installing_front .menu').css('display','block');
            jQuery('#installing_front .menu *').remove();
            jQuery('#installing_front .menu').append('<a href="./admin.php?page=ff_options#install" class="button">Finish</a>');
        }

    });
});