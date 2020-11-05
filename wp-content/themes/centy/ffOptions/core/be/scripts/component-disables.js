jQuery(document).ready(function($) {

    $("body").delegate(".component-option-checkbox .data-disables", "click", function() {
        content = $(this).parents(".section:first").children(".section-content")

        items = $(this).attr('data-disables');

        if( -1 == items.indexOf('|') ){
            items = new Array( items );
        }else{
            items = items.split('|');
        }

        active = !( 'checked' == $(this).attr( 'checked' ) );

        for (var key in items){
            searched = content.find( "." + items[key] ).parents(".component-element:first");
            if ( active ){
                searched.fadeIn();
            }else{
                searched.fadeOut();
            }
            searched = content.find( ".component-" + items[key] );
            if ( active ){
                searched.removeClass('component-hidden');
            }else{
                searched.addClass('component-hidden');
            }
        }
    });

    $(".component-option-checkbox .data-disables").each(function( index ) {

        content = $(this).parents(".section:first").children(".section-content")

        items = $(this).attr('data-disables');
        
        if( items ) {
            if( -1 == items.indexOf('|') ){
                items = new Array( items );
            }else{
                items = items.split('|');
            }

            active = ( 'checked' == $(this).attr( 'checked' ) );

            for (var key in items){
                searched = content.find( "." + items[key] ).parents(".component-element:first");
                if ( active ){
                    searched.addClass('component-hidden');
                }
                searched = content.find( ".component-" + items[key] );
                if ( active ){
                    searched.addClass('component-hidden');
                }
            }
        }
    });
});