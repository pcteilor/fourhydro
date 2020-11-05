<?php
class htmlPostPrinter extends htmlPTPrinter {

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* BLOG - FEATURED IMAGE
/*----------------------------------------------------------------------------*/
/******************************************************************************/
	public function printFeaturedImage() {
		
		if( ffWP::getWP('featured type') ){

			$link = ffWP::getWP('featured video-link');

			if( empty($link) ){
				return;
			}
			$video = new ffVideo( $link );
			echo '<div style="padding-top: 60px;">';
			echo '<div class="container grid">';
			echo '<div class="responsive_video">';
			$video->printIframe();
			echo '</div>';
			echo '</div>';
			echo '</div>';

		} else {

			$gallery = ffGalleryCollection::getGallery();
			$featuredImage = $gallery->getFeaturedImage();
			if( null == $featuredImage ) return false;
			
			$isBoxed = ffSP::get('template single-boxed');
			if( 'true' == $isBoxed ) {
				$imageUrl = $featuredImage->image->resize(1080, 327, true);
				$boxedClass = 'boxed'; 
			} else {
				$imageUrl = $featuredImage->image->url;
				$boxedClass = '';
			}
			
			echo '<!-- BANNER -->';
			
			echo '<div class="banner ui_preloader '.$boxedClass.'">';
					echo '<div class="background" style="background-image: url('.$imageUrl.');"></div>';
			echo '</div>';

		}

	}

/*----------------------------------------------------------------------------*/
/* CONTENT
/*----------------------------------------------------------------------------*/
	public function content() {
		the_content();
	}
	
	private function _getMetaPublished() {
		$dateFormat = ffOpt::get('translation time format-post-single');
		$transPublished = ffOpt::get('translation post meta-published');
			
		$date = get_the_date('F j, l');
		
		$output = '';
		$output .= '<h5>';
			$output .= $transPublished;
		$output .= '</h5>';
		$output .= '<p>';
			$output .= $date;
		$output .='</p>';
		
		return $output;
		
	}
	
	private function _getMetaAuthor() {
		/* 		                            		<h5>
		                            		AUTHOR
		                            		</h5>
		                            		<p>
		                            		<a href="#">
		                            		Krisztian Vajon
		                            		</a> */
		$authorUrl = get_the_author_meta('url');
		if( empty($authorUrl) ) 
			$authorUrl = '#';
		
		$authorName = get_the_author();
		
		$transAuthor = ffOpt::get('translation post meta-author');
		
		$output = '';
		$output .= '<h5>';
			$output .= $transAuthor;
		$output .= '</h5>';
		$output .= '<a href="'.$authorUrl.'">';
			$output .= $authorName;
		$output .= '</a>';
		
		return $output;
	}
	
	private function _getMetaTags() {
		/* 		                            		<h5>
		 AUTHOR
		</h5>
		<p>
		<a href="#">
		Krisztian Vajon
		</a> */
		$tags = get_the_tags();
		if( empty( $tags ) ) return '';
		
		$transTags = ffOpt::get('translation post meta-tags');
	
		$output = '';
		$output .= '<h5>';
		$output .= $transTags;
		$output .= '</h5>';
		foreach( $tags as $oneTag ) {
			
			$output .= '<a href="'. get_tag_link($oneTag->term_id).'">';
			$output .= $oneTag->name;
			$output .= '</a>';
			
			if( $oneTag !== end( $tags ) )
				$output .=', ';
		}
		
	
		return $output;
	}
	
	private function _getMetaCategories() {
		//$tags = get_the_tags();
		//if( empty( $tags ) ) return '';
	
		$transTags = ffOpt::get('translation post meta-categories');
		
	
		$output = '';
		$output .= '<h5>';
		$output .= $transTags;
		$output .= '</h5>';
		$output .= get_the_category_list();
	
	
		return $output;
	}
	
	private function _getFloatLinksComments() {
		/*
		  <li>
		                            		<a
		                            		href="#"
		                            		class="ui_button"
		                            		>
		                            				<i class="icon-comments"></i>
		                            				<span>
		                            				24
		                            						</span>
                                    </a>
		                            								</li>
		                            								<li>
		                                    <a
		href="#"
		class="ui_button"
		>
		<i class="icon-heart"></i>
		</a>
		</li>
		 */
		
		
		$transOneComment = ffOpt::get('translation comment comments_one');
		$transMoreComments = ffOpt::get('translation comment comments_more');
		$transZeroComments = ffOpt::get('translation comment comments_zero');
		
		$commentsNumber = get_comments_number();
		$commentsNumberText = '';
		if( $commentsNumber == 0 ) {
			$commentsNumberText = $transZeroComments;
		} else if( $commentsNumber == 1 ) {
			$commentsNumberText = $transOneComment;
		} else {
			$commentsNumberText = str_replace('%', $commentsNumber, $transMoreComments );
		}
		//var_dump( $commentsNumberText );
		//die();
		$output = '';
		$output .= '<ul class="float links">';
		
		$output .= '<li>';
			$output .= '<a href="#" class="ui_button">';
				$output .= '<i class="icon-comments"></i>';
				$output .= '<span>';
					$output .= $commentsNumberText;
				$output .= '</span>';
			$output .= '</a>';
		$output .= '</li>';
		
		$output .= '</ul>';
		return $output;
		
	}
	
	private function _getSocialLinks() {
		if ( !ffOpt::get('social sharing-enable ')) return '';
		
		$sharer = new ffSocialSharer();
		if( ffOpt::get('social sharing-enable-facebook') )
			$sharer->addPossibleLink('facebook');
		
		if( ffOpt::get('social sharing-enable-twitter') )
			$sharer->addPossibleLink('twitter');
		
		if( ffOpt::get('social sharing-enable-google') )
			$sharer->addPossibleLink('googleplus');
		
		$title = get_the_title();
		$url = get_permalink();
		$socialLinks = $sharer->getShareLinks($url, $title);
		
		$shareTitle = ffOpt::get('translation post meta-share');
		
		$output = '';
		$output .= '<h5>'.$shareTitle.'</h5>';
		$output .= '<ul class="float social">';
		foreach( $socialLinks as $oneLink ) {
			if( $oneLink->type == 'googleplus' )
				$oneLink->type = 'google-plus';
			$output .= '<li>';
			$output .= '<a href="'.$oneLink->url.'" class="icon-'.$oneLink->type.'-sign">';
			$output .= '</a>';
			$output .= '</li>';
			
			
		}
		$output .= '</ul>';
		return $output;

	}
	
	public function printPostMetaSidebar() {
		$postMeta = '';
		
		if( ffSP::get('template meta date-show') )
			$postMeta .= $this->_getMetaPublished();
		
		if( ffSP::get('template meta author-show') )
			$postMeta .= $this->_getMetaAuthor();
		

		if( ffSP::get('template meta category-show') )
			$postMeta .= $this->_getMetaCategories();
		
		if( ffSP::get('template meta tag-show') )
			$postMeta .= $this->_getMetaTags();
		
		
		$postFloatLinks = '';
		
		if( ffSP::get('template meta comment-show') )
			$postFloatLinks .= $this->_getFloatLinksComments();
		
		$postSocialLinks = '';
		
		if( ffSP::get('template meta share-show') )
			$postSocialLinks .= $this->_getSocialLinks();
		if( !empty( $postMeta ) ) {
			echo '<!-- SIDEBAR -->';
			echo '<div id="sidebar" class="col-3-12" >';
				echo '<!-- INFO -->';
				echo $postMeta;
				echo $postFloatLinks;
				echo $postSocialLinks;
			echo '</div>';
		}
		/*<!-- SIDEBAR -->
		
		<div
		id="sidebar"
		class="col-3-12"
		>
		
		<!-- INFO -->
		
		<h5>
		PUBLISHED
                            </h5>
		                            <p>
		                            		May 3, Friday
		                            		</p>
		                            		<h5>
		                            		AUTHOR
		                            		</h5>
		                            		<p>
		                            		<a href="#">
		                            		Krisztian Vajon
		                            		</a>
		                            		</p>
		                            		<ul class="float links">
		                            		<li>
		                            		<a
		                            		href="#"
		                            		class="ui_button"
		                            		>
		                            				<i class="icon-comments"></i>
		                            				<span>
		                            				24
		                            						</span>
                                    </a>
		                            								</li>
		                            								<li>
		                                    <a
		href="#"
		class="ui_button"
		>
		<i class="icon-heart"></i>
		</a>
		</li>
		<li>
		<a
		href="#"
		class="ui_button"
		>
		<i class="icon-heart-empty"></i>
		</a>
		</li>
		</ul>
		
		<!-- SOCIAL -->
		
		<h5>
		SHARE
		</h5>
		<ul class="float social">
		<li>
		<a
		href="#"
		class="icon-twitter-sign"
				></a>
				</li>
				<li>
				<a
				href="#"
						class="icon-facebook-sign"
						></a>
						</li>
						<li>
						<a
						href="#"
						class="icon-google-plus-sign"
						></a>
						</li>
						<li>
						<a
						href="#"
						class="icon-pinterest-sign"
						></a>
						</li>
						<li>
						<a
						href="#"
						class="icon-github-sign"
						></a>
						</li>
						<li>
						<a
                                        href="#"
                                        class="icon-linkedin-sign"
		                                        ></a>
		                                        		</li>
		                                        		</ul>
		                                        		</div>*/
	}
/*----------------------------------------------------------------------------*/
/* TITLE
/*----------------------------------------------------------------------------*/
    public function title() {
      echo '<h1>';
      echo '<a href="';
      the_permalink();
      echo '">';
      the_title();
      echo '</a></h1>';
    }

/*----------------------------------------------------------------------------*/
/* EXCERPT
/*----------------------------------------------------------------------------*/
    public function excerpt() {
        global $post;

        echo '<p>';
        if( !empty($post->post_excerpt) ){
            echo do_shortcode($post->post_excerpt);
    		}else if( FALSE !== stripos($post->post_content, "<!--more-->") ){
            $exc = explode("<!--more-->", $post->post_content);
            $exc = $exc[0];
            echo do_shortcode($exc);
        }else{
            $exc = get_the_excerpt();
            $exc = substr($exc,0,-5);
            echo $exc;
        }
        echo '</p>';

        echo '<p><a href="'.get_permalink().'" class="button button_light_bg noselect read_more">';
        echo ffOpt::Get('translation post read-more');
        echo '</a></p>';
    }

}