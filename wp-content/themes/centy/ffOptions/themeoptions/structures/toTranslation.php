<?php

class toTranslation{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'translation', 'Translation');

            ////////////////////////////////////////////////////////////////////
            // HOME
            ////////////////////////////////////////////////////////////////////
            $a->addElement( ffOptEnv::HEADER, 'Home' );
            $a->startSection( 'home', '');
                $a->addOption( ffOptEnv::TEXT, 'from-the-blog-title', __('From the Blog Title' ,'default'), __('From the %s','default'));
            $a->endSection();

            $a->addElement( ffOptEnv::HEADER, 'Time Format' );
            $a->startSection( 'time', '');
            	$a->addOption( ffOptEnv::TEXT, 'format-post-cat', 'Time Format - Post Category List', 'Y, F j');
            	$a->addOption( ffOptEnv::TEXT, 'format-post-cat-modern', 'Time Format - Post Category Modern', 'Y, M j');
            	$a->addOption( ffOptEnv::TEXT, 'format-post-single', 'Time Format - Post Single', 'F j, l');
            $a->endSection();
            
            $a->addElement( ffOptEnv::HEADER, 'Posts' );
            $a->startSection( 'post', '');
                $a->addOption( ffOptEnv::TEXT, 'read-more', 'Read more button', 'Read more');
                $a->addOption( ffOptEnv::TEXT, 'sortable-all', 'All ( Sortable ) ', 'All');
                
                $a->addOption( ffOptEnv::TEXT, 'meta-published', 'Published', 'Published');
                $a->addOption( ffOptEnv::TEXT, 'meta-author', 'Author', 'Author');
                $a->addOption( ffOptEnv::TEXT, 'meta-author', 'Author', 'Author');
                $a->addOption( ffOptEnv::TEXT, 'meta-tags', 'Tags', 'Tags');
                $a->addOption( ffOptEnv::TEXT, 'meta-categories', 'Categories', 'Categories');
                $a->addOption( ffOptEnv::TEXT, 'meta-share', 'Share', 'Share');
                
                $a->addOption( ffOptEnv::TEXT, 'sortable-columns-1', '1 Column', '1 Column');
                $a->addOption( ffOptEnv::TEXT, 'sortable-columns-2', '2 Columns', '2 Columns');
                $a->addOption( ffOptEnv::TEXT, 'sortable-columns-3', '3 Columns', '3 Columns');
                $a->addOption( ffOptEnv::TEXT, 'sortable-columns-4', '4 Columns', '4 Columns');
                
                $a->addOption( ffOptEnv::TEXT, 'related-projects', 'Related Projects', 'Related Projects');
                
                $a->addOption( ffOptEnv::TEXT, 'post-prev', 'Previous posts', 'Previous');
                $a->addOption( ffOptEnv::TEXT, 'post-next', 'Next posts', 'Next');
                
                $a->addOption( ffOptEnv::TEXT, 'no-posts', 'Nothing Found', 'Nothing Found');
                

                
                
                $a->addOption( ffOptEnv::TEXT, 'written-by-on-date', 'Written by, on date', 'Written by %s on %s');
                $a->addOption( ffOptEnv::TEXT, 'created-by-on-date', 'Created by, on date', 'Written by %s on %s');
                
                
            $a->endSection();
            
            $a->addElement( ffOptEnv::HEADER, 'Navigation' );
			$a->startSection( 'navigation', '');
            	$a->addOption( ffOptEnv::TEXT, 'menu-title-responsive', 'Menu title in responsive mode', 'Menu');
            $a->endSection();            
            
            $a->addElement( ffOptEnv::HEADER, 'Widgets' );
            $a->startSection( 'widgets', '');
                $a->addOption( ffOptEnv::TEXT, 'search-placeholder', __(' Placeholder of the header input search','default'), __('Search','default'));
            $a->endSection();

            $a->addElement( ffOptEnv::HEADER, 'Comments count' );
            $a->startSection( 'comment', '');

                $a->addOption(ffOptEnv::TEXT, 'comments_zero', 'No Comments', __('No Comments','default'));
                $a->addOption(ffOptEnv::TEXT, 'comments_one', '1 Comment', __('1 Comment','default'));
                $a->addOption(ffOptEnv::TEXT, 'comments_more', '% Comments', __('% Comments','default'));

                //$a->addOption( ffOptEnv::TEXT, 'enter-discussion', __(' Comment Form Title'), __('Leave a Comment'));

            $a->addElement( ffOptEnv::HEADER, 'Comments inputs' );
                $a->addOption( ffOptEnv::TEXT, 'form_title', 'Comment form title', __('Have your say','default'));
                $a->addOption( ffOptEnv::TEXT, 'name', 'Author Name', __('Name','default'));
                $a->addOption( ffOptEnv::TEXT, 'email', 'Author Email', __('Email','default'));
                $a->addOption( ffOptEnv::TEXT, 'website', 'Author Website', __('Website','default'));
                $a->addOption( ffOptEnv::TEXT, 'comment', 'Comment', _x( 'Comment', 'noun' ,'default'));
                $a->addOption( ffOptEnv::TEXT, 'label_submit', ' Submit Comment Button', __('Post Comment','default'));
                $a->addOption( ffOptEnv::TEXT, 'reply', ' Reply Button', __('Reply','default'));

            $a->addElement( ffOptEnv::HEADER, 'Comment texts' );
            	$a->addOption( ffOptEnv::TEXT, 'area_title', 'Comment Area Title', __('Comments','default'));
                $a->addOption( ffOptEnv::TEXT, 'logged-logout', ' Appears when someone logged in wordpress check the comment form', __('Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out &raquo;</a>','default'));
                $a->addOption( ffOptEnv::TEXT, 'cancel', ' Cancel Comment Reply link', __('Click here to cancel reply.','default'));
                $a->addOption( ffOptEnv::TEXT, 'approval', ' Comment awaiting for approval text', __('Your comment is awaiting moderation.','default'));

                $a->addOption( ffOptEnv::TEXT, 'log-in-to-reply', 'Log in to reply', __('You must be <a href="%s">logged in</a> to post a comment.','default'));
                $a->addOption( ffOptEnv::TEXT, 'closed', 'Appears when comments are closed', __('Comments are closed.','default'));
                $a->addOption( ffOptEnv::TEXT, 'time-ago', 'Time ago', __('%s ago','default'));
            $a->endSection();
            
            $a->startSection( 'pagination', '');
            
            
            	$a->addOption( ffOptEnv::TEXT, 'link-older', 'Older Articles', __('Older Articles','default'));
            	$a->addOption( ffOptEnv::TEXT, 'link-recent', 'Recent Articles', __('Recent Articles','default'));
            $a->endSection();            

            /*
            $a->addElement( ffOptEnv::HEADER, 'Post Meta' );
            $a->addOption( ffOptEnv::TEXT, 'header-search-input', __(' Placeholder of the header input search'), __('Enter keywords...'));
            $a->addOption( ffOptEnv::TEXT, 'header-search-button', __(' Search button description'), __('Search'));

            $a->addElement( ffOptEnv::HEADER, 'Post Meta' );
            $a->addOption( ffOptEnv::TEXT, 'post-posted-in', __('Posted in (e.g.) Blog, Uncategorized'), __('Posted in'));

            $a->addElement( ffOptEnv::HEADER, __('Post Buttons') );
            $a->addOption( ffOptEnv::TEXT, 'post-button-readmore', __(' Read more button'), __('READ MORE'));

            $a->addElement( ffOptEnv::HEADER, __('Search') );
            $a->addOption( ffOptEnv::TEXT, 'search-nothingfound', __('Nothing Found'), __(' Nothing Found'));

            $a->addElement( ffOptEnv::HEADER, '404 Page' );
            $a->addOption( ffOptEnv::TEXT, '404-heading', __(' Search Not Found Title'), __('Not Found'));
            $a->addOption(ffOptEnv::TEXTAREA, '404-content', __(' Search Not Found Message'), __('Sorry, but you are looking for something that isn\'t here.'));
            */

        $a->endSection();

        return $a;

    }

}
