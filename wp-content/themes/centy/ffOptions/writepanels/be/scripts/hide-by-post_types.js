jQuery(document).ready(function($) {
  $('#page_template').change( function(){
      $('.writepanel_dependable_on_page_templates').each( function(index){

          templ = '|' + $('#page_template').val() + '|';
          writepanel = $(this).parents(".postbox:first");
          
          if( -1 == $(this).attr("data-page_templates").indexOf(templ) ){
              // NOT for this
              writepanel.hide();
          }else{
              // IS for this
              writepanel.show();
          }
      });
  }).change();
});