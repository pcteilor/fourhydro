<?php


$showTextPreface = ffSP::get('template preface-show');


$showFilterablePanel = ffSP::get('template filterable-show');


$prefaceTitle = ffSP::get('template preface title');
$prefaceDescription= ffSP::get('template preface description');

$colClass = 'col-1-2';

if( !$showTextPreface || !$showFilterablePanel )
	$colClass = 'col-2-2';

$showPreface = ( !$showTextPreface && !$showFilterablePanel ) ? false : true;

