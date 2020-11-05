jQuery(document).ready(function($) {

    // TITLE

    $("body").delegate(".section-content .title", "change", function() {
        $(this).parents(".section:first").children(".section-title").children("h4").children(".in-section-title").html(
              $(this).val()// + String.fromCharCode(event.charCode)
        );
    });

    $("body").delegate(".section-content .title", "keypress", function(event) { $(this).change(); });
    $("body").delegate(".section-content .title", "keydown", function(event) { $(this).change(); });
    $("body").delegate(".section-content .title", "keyup", function(event) { $(this).change(); });
    $('.section-content .title').change();

    // RECOUNT INDEXES IN REPEATABLE
    $("body").delegate(".section-control-recount-indexes", "click", function() {
        children = $(this)
                   .parents('.repeatable:first')
                   .children('.section-content')
                   .children('.section')
                   .children('.section-title');
                   //.find('.rptblIndex');

        var total = children.length;

        children.each(function( index ) {
            $(this).children(".section-control-actions").find(".rptblIndex").val(index);

            // ONE REPEATABLE SECTION TITLE

            $(this).find('.in-section-title').html(index);

            // REMOVE

            repeatable = $(this).parents(".repeatable:first");
            children_count = repeatable.children(".section-content").children('.section').length;
            if( children_count <= 2 ){
                $(this).find('.section-control-remove').css('display','none');
                $(this).find('.section-control-remove-off').css('display','inline-block');
            }else{
                $(this).find('.section-control-remove').css('display','inline-block');
                $(this).find('.section-control-remove-off').css('display','none');
            }

            // MOVE UP

            $(this).find('.section-control-move-up').css('display','inline-block');
            $(this).find('.section-control-move-up-off').css('display','none');

            if (index === 1) {
                $(this).find('.section-control-move-up').css('display','none');
                $(this).find('.section-control-move-up-off').css('display','inline-block');
            }
            
            // MOVE DOWN

            $(this).find('.section-control-move-down').css('display','inline-block');
            $(this).find('.section-control-move-down-off').css('display','none');

            if (index === total - 1) {
                $(this).find('.section-control-move-down').css('display','none');
                $(this).find('.section-control-move-down-off').css('display','inline-block');
            }
        });

        // title fix
        $(".section-content .title").change();
        
        return false;
    }).click();
    
    // ADD INDEXES TO STUFF

    $('.component-0 .section-control-recount-indexes').click();

    // REMOVE

    $("body").delegate(".section-control-remove", "click", function() {
        var this_repeatable_path = $(this).parents('.repeatable:first').attr('data-path');

        $(this).parents(".section:first").animate({opacity: 0, height:0 }, 500, 'swing', function(){
            $(this).remove();
        });
        
        $('.repeatable[data-path='+this_repeatable_path+']').find('.component-0 .section-control-recount-indexes').click();

        return false;
    });

    // MOVE AND DOWN
    $("body").delegate(".section-control-move-down, .section-control-move-up", "click", function(){

        var this_section = $(this).parents(".section:first");

        if( $(this).hasClass('section-control-move-down') ){
            this_section.attr('data-move','down');
            animation_move = "+=" + ( 12 + 1*this_section.next().height() ) + "px";

            animation_move2 = "-=" + ( 12 + 1*this_section.height() ) + "px";
            this_section.next().css('position', 'relative');
            this_section.next().animate({opacity: 0.5, "top" :animation_move2 }, 500, 'swing');
        }else{
            this_section.attr('data-move','up');
            animation_move = "-=" + ( 12 + 1*this_section.prev().height() ) + "px";

            animation_move2 = "+=" + ( 12 + 1*this_section.height() ) + "px";
            this_section.prev().css('position', 'relative');
            this_section.prev().animate({opacity: 0.5, "top" :animation_move2 }, 500, 'swing');
        }

        this_section.css('position', 'relative');
        this_section.css('z-index', '999');

        this_section.animate({opacity: 0.5, "top" :animation_move }, 500, 'swing', function(){
            var this_section = $(this);
            var this_repeatable_path = $(this).parents('.repeatable:first').attr('data-path');

            if( 'down' == this_section.attr('data-move') ){
                var changed_section = this_section.next();
            }else{
                var changed_section = this_section.prev();
            }

            clone_this_section = this_section.clone();
            clone_this_section.find('select, input, textarea').each(function( index ) {
                $(this).val( this_section.find('#'+$(this).attr('id') ).val() );
            });

            clone_changed_section = changed_section.clone();
            clone_changed_section.find('select, input, textarea').each(function( index ) {
                $(this).val( changed_section.find('#'+$(this).attr('id') ).val() );
            });

            this_section.replaceWith(clone_changed_section);
            changed_section.replaceWith(clone_this_section);

            $('.repeatable[data-path='+this_repeatable_path+']').find('.component-0 .section-control-recount-indexes').click();

            //clone_changed_section.css('opacity','0.1').animate({opacity: 1});
            clone_changed_section.css('z-index', 'auto');
            clone_changed_section.css('position', 'static');
            clone_changed_section.css('top', 'auto');
            clone_changed_section.css('bottom', 'auto');
            clone_changed_section.css('opacity','0.5').animate({opacity: 1}, 1000);
            clone_changed_section.removeAttr('data-move');

            clone_this_section.css('z-index', 'auto');
            clone_this_section.css('position', 'static');
            clone_this_section.css('top', 'auto');
            clone_this_section.css('bottom', 'auto');
            clone_this_section.css('opacity','0.5').animate({opacity: 1}, 1000);
            clone_this_section.removeAttr('data-move');
        });
        return false;
    });

    // ADD BEFORE AND AFTER

    $("body").delegate(".section-control-add-before, .section-control-add-after", "click", function(){
        // get actual component section, repeatable component parents and template
        section = $(this).parents(".section:first");
        repeatable = $(this).parents(".repeatable:first");
        template = repeatable.find(".component-0:first");

        // increase counter
        template_copied  = 1 * template.attr('data-copied');
        template.attr('data-copied', 1 + template_copied );

        // get template stuff
        template_path  = "" + template.attr('data-path');
        template_class = "" + template.attr('class');
        template_html  = "" + template.html();

        // preparing regexps to update copied template stuff
        Re = new RegExp(template_path,"gi");
        new_index = ( 1000 + template_copied ) + "";
        ReC0 = new RegExp(" component\-0 ","gi");

        // update copied template stuff
        new_template_path =  template_path + new_index;

        new_template_class = template_class.replace(Re, new_template_path);
        new_template_class = new_template_class.replace(ReC0, " ");

        new_template_html =  template_html.replace(Re, new_template_path);

        // Do result

        if( $(this).hasClass('section-control-add-before') ){
            section.before( "<div class='"+new_template_class+" new-inserted-item' style='display:none' data-path='"+new_template_path+"'>" + new_template_html + "<div>" );
        }else{
            section.after(  "<div class='"+new_template_class+" new-inserted-item' style='display:none' data-path='"+new_template_path+"'>" + new_template_html + "<div>" );
        }
        
        $('.new-inserted-item').hide().slideDown(500);
        $('.new-inserted-item').css('opacity','0').animate({opacity: 1}, 500);
        $('.new-inserted-item').removeClass('new-inserted-item');

        $(this).parents('.repeatable:first').children('.component-0 .section-control-recount-indexes').click();

        return false;
    });

    // CLOSE

    $("body").delegate(".section-control-close", "click", function() {
        section = $(this).parents(".section:first");
        if( section.hasClass("component-0") ){
            return;
        }

        section.children(".section-content:first").slideUp(100);

        secControl = $(this).parents(".section-control-actions:first");
        secControl.find(".section-control-close:first").css('display','none');
        secControl.find(".section-control-open:first").css('display','inline-block');

        return false;
    });

    // OPEN

    $("body").delegate(".section-control-open", "click", function(){
        section = $(this).parents(".section:first");
        section.children(".section-content:first").slideDown(100);

        secControl = $(this).parents(".section-control-actions:first");
        secControl.find(".section-control-close").css('display','inline-block');
        secControl.find(".section-control-open").css('display','none');

        return false;
    });

    // OPEN AND CLOSE - ON CLICK ON BOX

    $("body").delegate(".repeatable > .section-content > .section > .section-title h4", "click", function() {
        section = $(this).parents(".section:first");
        secControl = section.children('.section-title').children(".section-control-actions:first");

        if( 'none' == secControl.find(".section-control-open").css('display') ){
            section.children(".section-content:first").slideUp(100);
            secControl.find(".section-control-close:first").css('display','none');
            secControl.find(".section-control-open:first").css('display','inline-block');
        }else{
            section.children(".section-content:first").slideDown(100);
            secControl.find(".section-control-close").css('display','inline-block');
            secControl.find(".section-control-open").css('display','none');
        }

        return false;
    });

    $(".section-control-close").click();

    $("body").delegate(".global-section-control-add-before", "click", function() {
        $(this).parents(".section-content:first").children(".section:first").children(".section-title").find(".section-control-add-after").click();
        var this_repeatable_path = $(this).parents('.repeatable:first').attr('data-path');
        $('.repeatable[data-path='+this_repeatable_path+']').find('.component-0 .section-control-recount-indexes').click();
    });

    $("body").delegate(".global-section-control-add-bottom", "click", function() {
        $(this).parents(".section-content:first").children(".section:last").children(".section-title").find(".section-control-add-after").click();
        var this_repeatable_path = $(this).parents('.repeatable:first').attr('data-path');
        $('.repeatable[data-path='+this_repeatable_path+']').find('.component-0 .section-control-recount-indexes').click();
    });
});


