jQuery(document).ready(function($) {

    $("body").delegate(".tab-item", "click", function() {
        tabs = $(this).parents('.component-option-tabs');
        val = $(this).attr('data-for');
        tabs.find('input').val( val );
        
        tabs.find('.imgitem_container').removeClass('imgitem_active');
        $(this).find('.imgitem_container').addClass('imgitem_active');
        
        // Hide all stuff

        tabs.find('.tab-item').each(function(){
            content = $(this).parents(".section:first").children(".section-content");
            items = $(this).attr('data-for');
            if( -1 == items.indexOf('|') ){
                items = new Array( items );
            }else{
                items = items.split('|');
            }
            for (var key in items){
                searched = content.find( "." + items[key] ).parents(".component-element:first");
                searched.fadeOut();
                searched = content.find( ".component-" + items[key] );
                searched.fadeOut();
            }
        });

        // Show just this stuff
        content = $(this).parents(".section:first").children(".section-content");
        items = $(this).attr('data-for');
        if( -1 == items.indexOf('|') ){
            items = new Array( items );
        }else{
            items = items.split('|');
        }
        for (var key in items){
            searched = content.find( "." + items[key] ).parents(".component-element:first");
            searched.fadeIn();
            searched = content.find( ".component-" + items[key] );
            searched.fadeIn();
        }

        tabs.parents(".section:first").children(".section-content");
    });
    
    $('.component-option-tabs').each(function( index ) {
        tab_val = $(this).find('input').val();
        $(this).find('.tab-item[data-for='+tab_val+']').click();
    });

});