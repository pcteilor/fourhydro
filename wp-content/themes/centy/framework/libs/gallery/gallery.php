<?php

class ffGalleryCollection implements Iterator {
	/**
	 * 
	 * @var array[ffGalleryCollection]
	 */
	private static $_galleries;
	private $_postId = null;
	private $_pointer = null;
	private $_elements = null;
	private $_imagesWpFormat = null;
	private $_mapIdToOrder = null;
	
	public static function getImageFromUrl( $url ) {
		return self::getAttFromUrl( $url );
	}
	
	private function _getAttIdFromUrl ($link) {
		global $wpdb;
		$link = preg_replace('/-\d+x\d+(?=\.(jpg|jpeg|png|gif)$)/i', '', $link);
		
		$result = mysql_query( "SELECT ID from {$wpdb->posts} WHERE guid='$link'");
		$row = mysql_fetch_array( $result );
		if( $row!= null ) return $row['ID'];
		else return null;
		
		//return $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE guid='$link'");
	}
	
	public static function printImage( $url, $classes = '') {
		$imageObject = self::getAttFromUrl( $url );
		
		echo '<img class="'.$classes.'" title="'.$imageObject->title.'" alt="'.$imageObject->altText.'" src="'.$url.'" />';
	}
	
	public static function getPrintImage( $url, $classes = '') {
		$imageObject = self::getAttFromUrl( $url );
	
		return '<img class="'.$classes.'" title="'.$imageObject->title.'" alt="'.$imageObject->altText.'" src="'.$url.'" />';
	}	
	
	/**
	 * @return ffGalleryImage
	 */
	public static function getAttFromUrl( $url ) {
		$inst = new ffGalleryCollection(null);
		$attId = $inst->_getAttIdFromUrl( $url );
		//var_dump( $attId );
		if( $attId != null ) {
			$attachmentArgs = array(
					'post_type' => 'attachment',
					'numberposts' => -1,          // one attachement image per post
					'post_status' => null,
					'post__in' => array( $attId ),
					'orderby' => 'menu_order ID'
						
			);
		
			$att = get_post( $attId );
			

			return $inst->_convertWpImgToGalleryImg( $att );
		} else {
			$image = new ffImage();
			$galleryImage = new ffGalleryImage();
			///// IMAGE FILLING
			$image->url = $url;
			
			///// GALLERY INFO FILLING
			$galleryImage->id = '';
			$galleryImage->title = '';
			$galleryImage->altText ='';
			$galleryImage->caption = '';
			$galleryImage->description = '';
			$galleryImage->image = $image;
			return $galleryImage;
		}
		/*if( empty($wpImage) or empty($wpImage->guid) ){
				return null;
		}
		$image = new ffImage();
		$galleryImage = new ffGalleryImage();
		///// IMAGE FILLING
		$image->url = $wpImage->guid;
		
		///// GALLERY INFO FILLING
		$galleryImage->id = $wpImage->ID;
		$galleryImage->title = $wpImage->post_title;
		$galleryImage->altText = get_post_meta($wpImage->ID, '_wp_attachment_image_alt', true);
		$galleryImage->caption = $wpImage->post_excerpt;
		$galleryImage->description = $wpImage->post_content;
		$galleryImage->image = $image;
		
		return $galleryImage;*/
	}
	
	/**
	 * @var ffGalleryImage;
	 */
	private $_featuredImg = null;
	
	/**
	 * @param unknown $postId
	 * @return ffGalleryCollection
	 */
	public static function getGallery( $postId = null ) {
		if( $postId == null ) {
			global $post;
			$postId = $post->ID;
		}
		if( !isset(self::$_galleries[ $postId ] ) ) {
			self::$_galleries[ $postId ] = new ffGalleryCollection( $postId );
		}
		
		return self::$_galleries[ $postId ];
	}
	
	/**
	 * @param unknown $imageId
	 * @return ffGalleryImage
	 */
	public static function getImage( $imageId ) {
		return self::getGallery('universal')->getGalleryImage( $imageId );
	}
	
	public function getGalleryImage( $id ) {
		$wpImage = get_post( $id );
		$galleryImage = $this->_convertWpImgToGalleryImg( $wpImage );
		return $galleryImage;
	}
	
	public function __construct( $postId ) {
		$this->_postId = $postId;
		
	}
	
	/**
	 * @return ffGalleryImage
	 */
	public function getFeaturedImage() {		
		$featuredImgId = get_post_thumbnail_id( $this->_postId );
		$featuredImg = null;
		if( !empty( $featuredImgId ) ) {
				$featuredImgWp = get_post( $featuredImgId );
				$featuredImg = $this->_convertWpImgToGalleryImg( $featuredImgWp );
		} else {
			//$this->_loadGallery();
			$featuredImg = $this->current();
			
		}
		
		return $featuredImg;
	}
	
	public function loadGalleryFromFFMeta( $metaName ) {
		
		
		$galleryIDs = ffWP::getWp('gallery items', $this->_postId);
		$metaValue = $galleryIDs;
		
		//echo 'xxx';
		
		if( !empty( $metaValue ) ) {
			$customGalleryExploded = explode(',', $metaValue);
		
			$attachmentArgs = array(
					'post_type' => 'attachment',
					'numberposts' => -1,          // one attachement image per post
					'post_status' => null,
					'post__in' => $customGalleryExploded,
					'orderby' => 'menu_order ID'
		
			);
		
			$this->_imagesWpFormat = get_posts( $attachmentArgs );
			$this->_pointer = 0;
				
			$mapToIdHolder = ( $customGalleryExploded );
				
			arsort( $mapToIdHolder );
			$counter = 0;
			foreach( $mapToIdHolder as $key=>$value ) {
				 
				$mapToIdHolder[ $key ] = $counter;
				$counter++;
			}
				
				
			$this->_mapIdToOrder = ($mapToIdHolder);
		}
	}
	
	public function loadGalleryFromMeta( $metaValue ) {
		if( !empty( $metaValue ) ) {
			$customGalleryExploded = explode(',', $metaValue);
		
			$attachmentArgs = array(
					'post_type' => 'attachment',
					'numberposts' => -1,          // one attachement image per post
					'post_status' => null,
					'post__in' => $customGalleryExploded,
					'orderby' => 'menu_order ID'
						
			);
		
			$this->_imagesWpFormat = get_posts( $attachmentArgs );
			$this->_pointer = 0;
			
			$mapToIdHolder = ( $customGalleryExploded );
			
			arsort( $mapToIdHolder );
			$counter = 0;
			foreach( $mapToIdHolder as $key=>$value ) {
				
				$mapToIdHolder[ $key ] = $counter;
				$counter++;
			}
			
			
			$this->_mapIdToOrder = ($mapToIdHolder);
		}
	}
	private function _loadGallery() {
    $customGallery = null;
		if( !empty( $customGallery ) ) {
			$this->loadGalleryFromMeta( $customGallery );
		} else {
			return;
			$attachmentArgs = array(
					'post_type' => 'attachment',
					'numberposts' => -1,          // one attachement image per post
					'post_status' => null,
					'post_parent' => $this->_postId,
					'orderby' => 'menu_order ID'
			);
			$this->_imagesWpFormat = get_posts( $attachmentArgs );
		}
	}
	
	public function getNumberOfImages() {
		
		if( $this->_elements == null ) {
			$this->_init();
			$this->_elements = count( $this->_imagesWpFormat );
		}
		
		return $this->_elements;
	}
	
	private function _init() {
		
		if( null === $this->_pointer ) {
			$this->_pointer = 0;
			$this->_loadGallery();
		}
	}
	
	private function _getCurrentGalleryItem() {
		if( empty($this->_imagesWpFormat[ $this->_getRealId() ]) ){
			return null;
		}else{
			return $this->_imagesWpFormat[ $this->_getRealId() ];
		}
	}
	/**
	 * 
	 * @param unknown $wpImage
	 * @return ffGalleryImage
	 */
	private function _convertWpImgToGalleryImg( $wpImage ) {
		
		if( empty($wpImage) or empty($wpImage->guid) ){
				return null;
		}
		
		$image = new ffImage();
		$galleryImage = new ffGalleryImage();
		///// IMAGE FILLING
		$image->url = $wpImage->guid;
		
		///// GALLERY INFO FILLING
		$galleryImage->id = $wpImage->ID;
		$galleryImage->title = $wpImage->post_title;
		$galleryImage->altText = get_post_meta($wpImage->ID, '_wp_attachment_image_alt', true);
		$galleryImage->caption = $wpImage->post_excerpt;
		$galleryImage->description = $wpImage->post_content;
		$galleryImage->image = $image;
		
		return $galleryImage;
	}
	
	private function _convertToGallleryClass() {
		$wpImage = $this->_getCurrentGalleryItem();
		$galleryImage = $this->_convertWpImgToGalleryImg( $wpImage );
		return $galleryImage;
	}
	
/******************************************************************************/
/* INTERFACE ITERATOR
/******************************************************************************/
	private function _getRealId() {
		if( $this->_mapIdToOrder != null ) {
			if( isset($this->_mapIdToOrder[ $this->_pointer ]) )
				return $this->_mapIdToOrder[ $this->_pointer ];
			else
				return null;
		} else {
			return $this->_pointer;
		}
	}
	
	public function current () {
		
		$this->_init();
		return $this->_convertToGallleryClass();
	}
	public function key () {
		$this->_init();
		return $this->_pointer;
	}
	public function next () {
		$this->_init();
		$this->_pointer++;
	}
	public function rewind () {
		$this->_init();
		$this->_pointer=0;
	}
	public function valid () {		
		$this->_init();
		return isset( $this->_imagesWpFormat[ $this->_getRealId() ] );
	}	
}