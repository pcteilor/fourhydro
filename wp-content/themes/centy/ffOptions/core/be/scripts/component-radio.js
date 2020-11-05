jQuery(document).ready(function($) {
  $("body").delegate(".component-option-image-list label, .component-option-radio label", "click", function() {
      $(this).parent().children('label').removeClass('radio-item-active');
      $(this).addClass('radio-item-active');

  });
});