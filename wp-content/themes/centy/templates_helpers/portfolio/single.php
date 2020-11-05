<?php
$prevPost = get_previous_post();
$nextPost = get_next_post();


$portSidebar = ffWP::get('wpportfoliosidebar');

$sidebarInfo = $portSidebar->get('aside-info');
$sidebarButtons = $portSidebar->get('aside-button');


$showIntro = ffWP::get('wpintro show');

$prevNextClass = ( $showIntro ) ? 'col-1-3' : 'col-3-3';

$socialLinksUnparsed = ffWP::get('wpportfoliosidebar share url');
$socialLinks = new ffSocialFeeder( $socialLinksUnparsed );
