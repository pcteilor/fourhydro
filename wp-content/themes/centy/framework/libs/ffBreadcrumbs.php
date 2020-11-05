<?php

class ffBreadcrumbs {

    private $siteTitle;
    private $blogTitle;

    private static $_instance = null;
    protected $breadcrumbs = null;

    function __construct( $siteTitle = false, $blogTitle = 'Blog' ){

        $this->siteTitle = empty( $siteTitle ) ? get_bloginfo( 'name' ) : $siteTitle ;
        $this->blogTitle = $blogTitle;

        $this->breadcrumbs[] = $this->newItem( $this->siteTitle, get_home_url().'/' );

        // By http://codex.wordpress.org/images/1/18/Template_Hierarchy.png

        if( is_404() ){
            $this->breadcrumbs[] = $this->newItem( '404', $_SERVER["REQUEST_URI"] );
            return;
        }

        if( is_search() ){
            global $_GET;
            $this->breadcrumbs[] = $this->newItem( str_replace(array('<','>'),array('&lt;','&gt;'),$_GET['s']), $_SERVER["REQUEST_URI"] );
            return;
        }

        if( is_archive() ){
            global $wp_query;
            if( is_category() or is_tag() or is_tax() ) {
                $term_id = $wp_query->queried_object->term_id;
                $taxonomy = $wp_query->queried_object->taxonomy;
                $this->_addTaxonomyBreadcrumbs($taxonomy, $term_id);
            }else if( is_author() ){
                $this->breadcrumbs[] = $this->newItem( $wp_query->queried_object->data->display_name, $_SERVER["REQUEST_URI"] );
            }else if( is_date() ){
                // Date ... TODO
                $this->breadcrumbs[] = $this->newItem( 'Archives', $_SERVER["REQUEST_URI"] );
            }else{
                $this->breadcrumbs[] = $this->newItem( 'Archives', $_SERVER["REQUEST_URI"] );
            }
            return;
        }

        if( is_home() or is_front_page() ){
            if( is_home() and ! is_front_page() ){
                $this->breadcrumbs[] = $this->newItem( $this->blogTitle, get_permalink( get_option('page_for_posts') ) );
            }
            return;
        }

        if ( is_page() ) {
            $this->_addPageBreadcrumbs();
            return;
        }
                // must be after is_home() or is_front_page()
        if( is_singular() ){
            $post_type = get_post_type();
            if( 'post' == $post_type ){
                //$this->_addCategoryBreadcrumbs();
                $this->_addTaxonomyBreadcrumbs("category");
            }else{
                $tax = ffCustomTax::getInstance("$post_type-category");
                if( $tax ){
                    $this->_addTaxonomyBreadcrumbs("$post_type-category");
                }
            }
            $this->breadcrumbs[] = $this->newItem( get_the_title(), get_permalink() );
            return;
        }
    }

    private function newItem( $title, $url, $selected = false ) {
        return (object) array(
            'title' => $title,
            'url' => $url,
            'selected' => $selected,
        );
    }

    public function get() {
        return $this->breadcrumbs;
    }
    
    private function _addPageBreadcrumbs() {
        global $post;
        $arrayOfParents = $this->_addPageParents($post->ID );
        foreach ($arrayOfParents as $item) {
            $this->breadcrumbs[] = $item;
        }
    }
    
    private function _addPageParents( $pageId, $selectedPageId = null, $arrayOfParents = null ) {
        $selectedPage = false;
        if( $selectedPageId == null )  {
            $selectedPageId = $pageId;
            $selectedPage = true;
        }
        
        $currentPage = get_page( $pageId );
        if ( is_wp_error( $currentPage ) )
            return $pageId;
        
        if( $arrayOfParents === null ) {
            $arrayOfParents = array();
        }

        $arrayOfParents[] = $this->newItem( $currentPage->post_title, get_permalink( $currentPage->ID ), $selectedPage );
        
        if( $currentPage->post_parent != '0' ) {
            $arrayOfParents = $this->_addPageParents( $currentPage->post_parent, $selectedPageId, $arrayOfParents );
        } else {
            $arrayOfParents = array_reverse( $arrayOfParents );
        }
        return $arrayOfParents;
    }
    
    private function _addTaxonomyBreadcrumbs($tax_slug, $term_id = 0){
        if( empty( $term_id ) ){
            global $post;
            $terms = wp_get_post_terms( $post->ID, $tax_slug );
            if( empty( $terms ) ){
                return;
            }
            $term_id = $terms[0]->term_id;
        }
        $arrayOfParents = array();
        $arrayOfParents = $this->_addTaxParents( $term_id, $arrayOfParents, $tax_slug );

        if( empty($arrayOfParents) ) {
            return;
        }
        foreach ($arrayOfParents as $item) {
            $this->breadcrumbs[] = $item;
        }
    }

    private function _addTaxParents( $taxID, $arrayOfParents = null, $term = "category" ) {
        $currentCat = get_term( $taxID, $term );
        if ( is_wp_error( $currentCat ) ) return array();
        if( $arrayOfParents === null ) {
            $arrayOfParents = array();
        }
        $link = get_term_link($currentCat, $term);
        $arrayOfParents[] = $this->newItem( $currentCat->name, $link );
        
        if( $currentCat->parent != '0' ) {
            $arrayOfParents = $this->_addTaxParents( $currentCat->parent, $arrayOfParents, $term );
        }  else {
            $arrayOfParents = array_reverse( $arrayOfParents );
        }
        return $arrayOfParents;
    }

    /**
     * @return ffBreadcrumbs
     */
    public static function getInstance() {
        
        if( self::$_instance == null ) {
            self::$_instance = new ffBreadcrumbs();
        }
        return self::$_instance;
    }
}