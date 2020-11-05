<?php
class htmlPTPrinter /*extends htmlBasePrinter*/ {

    protected static $sortableTagsMaxCount = 5;

    public function printFeaturedImageList() {
    
    	$gallery = ffGalleryCollection::getGallery();
    	$featuredImage = $gallery->getFeaturedImage();
    	if( null == $featuredImage ) return false;
    
    	$readMoreText = ffOpt::get('translation post read-more');
    	$fixedHeight = ffSP::get('template fixed_height');
    
    	echo '<span class="col-4-9 image">';
    	echo '<img src="'.$featuredImage->image->resize(768, $fixedHeight, true).'" alt="'.$featuredImage->altText.'" />';
    	echo '<span class="hover">';
    	echo '<span>';
    	echo $readMoreText;
    	echo '</span>';
    	echo '</span>';
    	echo '</span>';
    }
    public function loadTagsByPostByCategory(){
    
    	$catTax = ffSP::get_term_taxonomy();
    	$catID  = ffSP::get_term_id( $catTax );
    	$tagTax = str_replace('-category', '-tag', $catTax);
    
    	global $wpdb;
    
    	// Hmmm...
    
    	// ... Simple mysql
    
    	$SQL = "
    
    	SELECT COUNT(t_tag.term_id) AS `cnt`, `t_tag`.*, `tt_tag`.`taxonomy` AS `taxonomy`
    	FROM  `$wpdb->term_relationships` `tr_cat`, `$wpdb->term_taxonomy` `tt_cat`
    	,
    	`$wpdb->term_relationships` `tr_tag`, `$wpdb->term_taxonomy` `tt_tag`, `$wpdb->terms` t_tag
    	WHERE `tr_cat`.`term_taxonomy_id` = `tt_cat`.`term_taxonomy_id`
    	AND `tt_cat`.`term_id` = $catID
    	AND `tt_cat`.`taxonomy` = '$catTax'
    
    	AND `tr_tag`.`term_taxonomy_id` = `tt_tag`.`term_taxonomy_id`
    	AND `tt_tag`.`term_id` = `t_tag`.`term_id`
    	AND `tt_tag`.`taxonomy` = '$tagTax'
    
    	AND `tr_tag`.`object_id` = `tr_cat`.`object_id`
    	GROUP BY( t_tag.term_id )
    
    	" ;
    
    	$_tags = $wpdb->get_results( $SQL );
    
    	if( empty( $_tags ) ){
    	return $this->tags = array();
    	}
    
    	foreach ($_tags as $r) {
    	$this->tags_count[$r->term_id] = $r->cnt;
    	}
    
    	$sorting_function  = 'sortTags';
    
    	// name / count
    	if( 'name' == ffSP::get('tags order_by', $catTax, $catID) ){
    			$sorting_function .= '_name';
    	}else{
    	$sorting_function .= '_count';
    	}
    
    	// asc / desc
    		//	if( 'asc' == ffSP::get('tags order', $catTax, $catID) ){
    					$sorting_function .= '_desc';
    					
    			//		}else{
    				//	$sorting_function .= '_desc';
    					//}
    
    					usort($_tags, array($this, $sorting_function) );
    
    					return $this->tags = $_tags;
    }
    
    public function sortTags_name_asc  ($a, $b){ return ($a->name  == $b->name ) ? 0 : ( ($a->name  < $b->name ) ? -1 : 1 ); }
    public function sortTags_name_desc ($a, $b){ return ($a->name  == $b->name ) ? 0 : ( ($a->name  > $b->name ) ? -1 : 1 ); }
    public function sortTags_count_asc ($a, $b){ return ($a->count == $b->count) ? 0 : ( ($a->count < $b->count) ? -1 : 1 ); }
    public function sortTags_count_desc($a, $b){ return ($a->count == $b->count) ? 0 : ( ($a->count > $b->count) ? -1 : 1 ); }    
    
    public function getPostID(){
		    global $post;
		    return $post->ID;
    }
    public function printPostClass() {
    	$gallery = ffGalleryCollection::getGallery();
    	if( null == $gallery->getFeaturedImage() ) echo 'col-9-9';
    	else echo 'col-5-9';
    }
    
    public function printAttachmentImage() {
    	global $post;
    	$attImg = ( wp_get_attachment_image_src( $post->ID, 'full') );
    	
    	$image = fImg::resize($attImg[0], 730 );
    	
    	echo '<div class="banner ui_preloader boxed">';
    	echo '<div class="background" style="background-image: url('.$image.');"></div>';
    	echo '</div>';
    }
    
    public function printFeaturedImage() {
    	$gallery = ffGalleryCollection::getGallery();
    	$featuredImage = $gallery->getFeaturedImage();
    	if( null == $featuredImage ) return false;
    
    	$readMoreText = ffOpt::get('translation post read-more');
    	$fixedHeight = ffSP::get('template fixed_height');
    
    	echo '<span class="col-4-9 image">';
    	echo '<img src="'.$featuredImage->image->resize(730, $fixedHeight, true).'" alt="'.$featuredImage->altText.'" />';
    	echo '<span class="hover">';
    	echo '<span>';
    	echo $readMoreText;
    	echo '</span>';
    	echo '</span>';
    	echo '</span>';
    }
/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* <p><div>, </div></p>, <br /> ... FIX
/*----------------------------------------------------------------------------*/
/******************************************************************************/
	public function date() {
		$dateFormat = ffOpt::get('translation time format-post-cat');
		
		
		echo '<h5>';
		echo strtoupper(get_the_date($dateFormat));
		echo '</h5>';
	}
    
	public function permalink() {
		echo get_permalink();
	}
    
	public function contentPortfolioSingle( $content = null) {
		if( null === $content ){
			global $post;
			$content = $post->post_content;
		}
		
		$content = do_shortcode( $content );
		$content = wpautop( $content );
		
		$fixing = array (
				'<p><div>' => '<div>',
				'</div></p>' => '</div>',
		);
		
		$content = preg_replace('/<p>\s*<div/si', '<div',  $content);
		$content = preg_replace('/<\/div>\s*<\/p>/si', '</div>',  $content);
		
		echo $content;
	}
	
	public function the_content_upgraded( $content = null) {
		if( null === $content ){
			global $post;
			$content = $post->post_content;
		}
		
		$content = do_shortcode( $content );
		$content = wpautop( $content );
		
		$fixing = array (
				'<p><div>' => '<div>',
				'</div></p>' => '</div>',
		);
		
		$content = preg_replace('/<p>\s*<div/si', '<div',  $content);
		$content = preg_replace('/<\/div>\s*<\/p>/si', '</div>',  $content);
		
		echo $content;		
	}
	
    public function the_content( $content = null ){
    	the_content('');
    	//the_content();
    	/*
        if( null === $content ){
            global $post;
            $content = $post->post_content;
        }

        $content = do_shortcode( $content );
        $content = wpautop( $content );

        $fixing = array (
            '<p><div>' => '<div>',
            '</div></p>' => '</div>',
        );

        $content = preg_replace('/<p>\s*<div/si', '<div',  $content);
        $content = preg_replace('/<\/div>\s*<\/p>/si', '</div>',  $content);

        echo $content;*/
    }

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* GALLERY
/*----------------------------------------------------------------------------*/
/******************************************************************************/
    protected static $postImageWidth = 870;
    //protected static $postImageHeight = 870;

    protected function getGaleryIDsArrayFromString($IDs){
        $IDs = trim($IDs);
        if( empty ($IDs) ) return false;

        $IDs = ( FALSE === strpos($IDs, ',') ) ?
                array( $IDs ) :
                explode( ',', $IDs) ;

        $ret = array();
        foreach($IDs as $key=>$id) {
            $id = ceil( 1*$id );
            if( empty($id) ) continue;
            $ret[] = $id;
        }
        return empty($ret) ? false : $ret;
    }

    public function featuredImage($gallery = null) {
        if( null == $gallery ){
        		global $post;
            $gallery = ffGalleryCollection::getGallery( $post->ID );
        }
        if( null == ($featuredImage = $gallery->getFeaturedImage() ) ) {
            return;
        }

        echo  '<div class="featured_image_container">
                  <a class="featured_image_wrapper" href="'.$featuredImage->image.'" rel="prettyPhoto">
                      <img class="featured_image" src="'.$featuredImage->image->resize(self::$postImageWidth, null, 1).'" alt="" />
                  </a>
                </div>';
    }

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* TITLE, COMMENT COUNT, METAS
/*----------------------------------------------------------------------------*/
/******************************************************************************/
    public function title() {
      echo '<h2>'; 
      	the_title();
      echo '</h2>';
      
    }
    
    protected function __get__the_author_posts_link(){
      global $authordata;
      if ( !is_object( $authordata ) ) return false;
      $link = sprintf(
          '<a href="%1$s" title="%2$s" rel="author">%3$s</a>',
          get_author_posts_url( $authordata->ID, $authordata->user_nicename ),
          esc_attr( sprintf( __( 'Posts by %s','default' ), get_the_author() ) ),
          get_the_author()
      );
      return apply_filters( 'the_author_posts_link', $link );
    }

    public function written_by(){
        printf( ffOpt::get('translation post written-by-on-date'), $this->__get__the_author_posts_link(), get_the_date() );
    }

    public function created_by(){
        printf( ffOpt::get('translation post created-by-on-date'), $this->__get__the_author_posts_link(), get_the_date() );
    }

    public function comments_bubble(){
        if( ffOpt::get('comments disqus isenabled') ){
            echo '<a class="comments_bubble" href="';
            the_permalink();
            echo '#disqus_thread">...</a>';
        }else{
            echo '<a class="comments_bubble comments_bubble_active" href="';
            the_permalink();
            echo '#comments">';
            comments_number(0,1,'%');
            echo '</a>';
        }
    }

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* EXCERPT
/*----------------------------------------------------------------------------*/
/******************************************************************************/
    public function excerpt() {
        global $post;

        echo '<p>';
    		if( !empty($post->post_excerpt) ){
            the_excerpt( $readMore );
    		}else if( FALSE !== stripos($post->post_content, "<!--more-->") ){
            $exc = explode("<!--more-->", $post->post_content);
            $exc = $exc[0];
            echo do_shortcode($exc);
        }else{
            $exc = get_the_excerpt();
            $exc = str_replace("[...]","", $exc);
            echo $exc;
        }
        echo '</p>';

        echo '<a href="'.get_permalink().'" class="button button_light_bg noselect read_more">';
        echo ffOpt::Get('translation post read-more');
        echo '</a>';
    }

    public function excerptUnderTitle() {
        global $post;

        echo '<div class="sub"><p>';

    		if( !empty($post->post_excerpt) ){
            the_excerpt( $readMore );
    		}else if( FALSE !== stripos($post->post_content, "<!--more-->") ){
            $exc = explode("<!--more-->", $post->post_content);
            $exc = $exc[0];
            echo do_shortcode($exc);
        }

        echo '</p></div>';
    }

    public function afterExcerptContent() {
        global $post;
        if( ! empty($post->post_excerpt) ){
            $this->the_content();
    		}else if( FALSE !== stripos($post->post_content, "<!--more-->") ){
            $exc = explode("<!--more-->", $post->post_content, 2);
            $exc = $exc[1];
            $this->the_content( $exc );
        }else{
            $this->the_content();
        }
    }

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* SORTABLE STUFF
/*----------------------------------------------------------------------------*/
/******************************************************************************/

    protected $tags_count = array();

    public function printSortableTags(){
        echo '<div class="sortable-1_wrapper">';
  		  echo '<div class="sortable-1 sortable_desktop">';
  		  echo '<div class="sortable_menu">';
    		echo '
    			<a href="#" class="item item_active">
    				<span>All</span>
    			</a>';
        if( !empty( $this->tags_count ) ){
            arsort( $this->tags_count, SORT_NUMERIC);
            $tag_cnt = 0;
            foreach($this->tags_count as $term_id=>$count) {
                echo '
            			<a href="#'.$this->tags[$term_id]->slug.'" class="item">
            				<span>'.$this->tags[$term_id]->name.'</span>
            			</a>';
                $tag_cnt ++;
                if( $tag_cnt == self::$sortableTagsMaxCount){
                    break;
                }
            }
        }
  		  echo '</div>';
  		  echo '<div class="clear"></div>';
  		  echo '</div>';
  		  echo '</div>';
    }

    public function runLoopBuffer( $templater_function ){
        ob_start();
        if ( have_posts() ) :
        	while ( have_posts() ) : the_post();
             ffTemplater::$templater_function();
        	endwhile;
        endif;
        $ret = ob_get_contents();
        ob_end_clean();
        return $ret;
    }

    protected function addTagsOfPost( $ID ){
        global $wpdb;
        $SQL = "SELECT `t`.*
                FROM  `$wpdb->term_relationships` `tr`, `$wpdb->term_taxonomy` `tt`, `$wpdb->terms` t
                WHERE `tr`.`term_taxonomy_id` = `tt`.`term_taxonomy_id`
                AND `tt`.`term_id` = `t`.`term_id`
                AND `tt`.`taxonomy` = '$this->tag_slug'
                AND `tr`.`object_id` = $ID";

        $result = mysql_query( $SQL );

        $ret = array();

        if($result != false) {
            while( $row = mysql_fetch_array( $result ) ) {
                $term_id = $row['term_id'];
                $this->tags[ $term_id ] = (object) array(
                    'name' => $row['name'],
                    'slug' => $row['slug'],
                );
                $ret[ $term_id ] = $this->tags[ $term_id ];
                $this->tags_count[$term_id] = empty( $this->tags_count[$term_id] ) ? 1 : $this->tags_count[$term_id] +1;
            }
        }

        return $ret;
    }

    public function printDataTag( $ID ){
        $tags = $this->addTagsOfPost($ID);

        foreach($tags as $index=>$tag) {
            echo "#";
            echo $tag->slug;
            echo " ";
        }
        echo "#";
    }

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* END OF CLASS
/*----------------------------------------------------------------------------*/
/******************************************************************************/

}

