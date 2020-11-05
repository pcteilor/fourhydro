<?php

add_action( 'admin_menu', 'ff_sitepreferences_add_menu' );

function ff_sitepreferences_add_menu(){
    fEnv::addAdminMenu('Site Preferences', 'Site Preferences', 'ff_sitepreferences', 1);
}

function ff_sitepreferences_view(){
    $_admin_menu_ff_sitepreferences = new admin_menu_ff_sitepreferences();
    $_admin_menu_ff_sitepreferences->printPage();
}

function ff_sitepreferences_save(){}

