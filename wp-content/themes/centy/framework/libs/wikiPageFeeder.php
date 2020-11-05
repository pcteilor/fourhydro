<?php
  
class wikiPageFeeder{
    protected $pages;

    function __construct( $parent_wiki_page ){
        $args = array(
                    'sort_order' => 'ASC',
                    'sort_column' => 'menu_order',
                    'hierarchical' => 1,
                    'child_of' => $parent_wiki_page,
                    'parent' => -1,
                    'post_type' => 'page',
                    'post_status' => 'publish'
                );
        $this->pages = get_pages( $args );
    }
    
    function printSubPages(){
        global $post;
        foreach ($this->pages as $key=>$subPage) {
            $post = $subPage;
            setup_postdata( $post );
        		ffTemplater::requirePageWikiSub();
        }
    }
    
    function printSidebar(){
        $l = array();
        foreach ($this->pages as $key=>$page) {
            $l[ $page->ID ] = $page->post_title;
        }
        ffTemplater::requirePageWikiSidebar($l);
    }
}
?>