<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <title>
            <?php if(is_home()) { echo bloginfo('name'); echo ' | '; echo bloginfo('description'); } else { echo wp_title(' | ', false, 'right'); echo bloginfo('name'); } ?>
        </title>

        <!-- SETTINGS -->

        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <meta
            name="format-detection"
            content="telephone=no"
        />

        <!-- STYLES -->

		
		<?php wp_head(); ?>
    </head>
    <body data-page="<?php ff_get_body_data_page(); ?>" data-boxed="<?php ff_get_body_data_boxed(); ?>" <?php body_class(); ?> style="<?php ff_body_background_style(); ?>" >

        <!-- LAYOUT -->

        <div id="layout" <?php ff_layout_class(); ?>>
			<?php ffTemplater::requireNavigation(); ?>