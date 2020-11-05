<?php

add_action( 'admin_menu', 'ff_options_add_menu' );

function ff_options_add_menu(){
    fEnv::addAdminMenu('Theme Options', 'Theme Options', 'ff_options', 0);
}

function ff_options_view(){
    $_admin_menu_ff_options = new admin_menu_ff_options();
    $_admin_menu_ff_options->printPage();
}

function ff_options_save(){}

