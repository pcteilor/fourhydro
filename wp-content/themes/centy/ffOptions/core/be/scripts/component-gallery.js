(function( $ ) {

$.fn.ffAttachGallery = function( callback ) {
    _this_ = this;
    // selectors & attributes
    _this_.attrInputSelector = 'data-input-selector';
    
    _this_.deliveryId = function( $input, newVal ) {
        clickedObject = _this_.clickedObjectHolder;
        _this_.clickedObjectHolder =  null;
        
        $input.val( newVal );
        if( callback )
            callback( newVal, clickedObject );
    }
    
    _this_.clickedObjectHolder = null;
    
    
    $(_this_.selector).click(function() {
        _this_.clickedObjectHolder = $(this);
        
        //console.log( '--------------------------------');
        //console.log( wp );
        //console.log( '--------------------------------');

        var send_attachment_bkp = wp.media.editor.send.attachment;
        var insert_bkp = wp.media.editor.insert;

        // we have to re-create these variables every click,
        // because we wanna allow multiple galleries in one page
        // .input / #input
        inputSelector = $(this).attr( _this_.attrInputSelector );
        $input = $(inputSelector);
        id = $input.val();
        
        if( id ){
              frame = wp.media.gallery.edit('[gallery ids="' + id + '"]');
              frame.state('gallery-edit').on( 'update', function( selection ) {
    
                    //console.log( '--------------------------------');
                    //console.log( 'FUNCTION wp.media.gallery.edit(\'[gallery ids="' + $('#'+ffActiveEditor).val() + '"]');
                    //console.log( '--------------------------------');
                    //console.log( '- Parameter "selection.models"');
    
                    new_val = '';
    
                    //console.log( selection );
                    if( selection ){
                        if( selection.models ){
                            for (var i in selection.models){
    
                                //console.log( selection.models[ i ].id );
                                
                                if( '' == new_val ){
                                    new_val = selection.models[ i ].id;
                                }else{
                                    new_val = new_val + ',' + selection.models[ i ].id;
                                }
                                
                            }
                            
                            _this_.deliveryId( $input, new_val );
                            //alert( new_val );
                        }
                    }
                    //console.log( '--------------------------------');
                    ////console.log('xxx');
                    //break;
                    //var shortcode = gallery.shortcode( selection ).string().slice( 1, -1 );
    
                    //ed.dom.setAttrib( el, 'title', shortcode );
              });
        }else{
              // this stuff insert galery into post text
              wp.media.editor.insert = function( a ) {
                      wp.media.editor.insert = insert_bkp;
    
                      //console.log( '--------------------------------');
                      //console.log( 'FUNCTION wp.media.editor.insert');
                      //console.log( '--------------------------------');
                      //console.log( '- Parameter "a"');
                      //console.log( a );
                      //console.log( '--------------------------------');
                      //console.log( '');
                      if( a ){
                          if( '[' == a.substr(0,1) ) {
                              a = a.replace('[gallery ids="','');
                              a = a.replace('"]','');
                              _this_.deliveryId( $input, a );
                          }
                      }
              }
    
              // this stuff insert one image
              ////console.log( wp.media.editor.send );
              wp.media.editor.send.attachment = function(props, attachment) {
                      wp.media.editor.send.attachment = send_attachment_bkp;
    
                      //console.log( '--------------------------------');
                      //console.log( 'FUNCTION wp.media.editor.send.attachment');
                      //console.log( '--------------------------------');
                      //console.log( '- Parameter "attachment"');
                      //console.log( attachment.id );
                      //console.log( '--------------------------------');
                      //console.log( '');
    
                      if( attachment ){
                          _this_.deliveryId( $input, attachment.id );
                      }
    
                      //$('.custom_media_image').attr('src', attachment.url);
                      //$('.custom_media_url').val(attachment.url);
                      //$('.custom_media_id').val(attachment.id);
    
              }
              wp.media.editor.open();
        }
    
        return false;        
        
    });
}    
})( jQuery );

jQuery(document).ready(function($){
    $('.custom_media_upload').ffAttachGallery(function( id, clickedObject ) {
        clickedObject.parent().find('.gallery-image-holder').animate({opacity:0},400 );
            
            var data = {
                action: 'ff_gallery_load',
                image_id: id,
            };

            console.log( ajaxurl );
            console.log( data );

            jQuery.post(ajaxurl, data, function(response) {
                clickedObject.parent().find('.gallery-image-holder').html( response ).stop().animate({opacity:1},400);
            });
            
    });
});

