jQuery(document).ready(function($) {
  $('.ff_TO form').submit( function() {
      $('.theme_options_save').attr('disabled', 'disabled');
  });
  $('#ffOptions-content .namespace-switcher').click( function(){
      _rel = $(this).attr('rel');

      // hide all
      $('#ffOptions-content-right>div').hide();
      $(this).parent().parent().find('.submenu').hide();

      $('#ffOptions-content-left>div')
          .removeClass('ffOptions-content-menu-item-active')
          .removeClass('ffOptions-content-menu-item')
          .addClass('ffOptions-content-menu-item')

      // show active
      $('#ffOptions-content .component-'+_rel).show();
      $(this).parent().find('.submenu').show();

      $(this).parent()
          .removeClass('ffOptions-content-menu-item-active')
          .removeClass('ffOptions-content-menu-item')
          .addClass('ffOptions-content-menu-item-active')

  });
  
  if( -1 != window.location.href.indexOf('#') ){
      _str = window.location.href.split("#");
      _str = _str[1];
      if( "" != _str ){
          _sel = "a[href='#"+_str+"']";
          $(_sel).click();
      }
  }else{
      // if no #, than click on home in in theme options
      if( 0 < $('#ffOptions-content').length ){
          $(".namespace-switcher:first").click();
      }
  }

});