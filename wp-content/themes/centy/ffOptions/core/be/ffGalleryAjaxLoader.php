<?php
class ffGalleryAjaxLoader{

    static function addHook(){
        add_action('wp_ajax_ff_gallery_load', array( new ffGalleryAjaxLoader(), 'ff_gallery_load') );
    }

    function ff_gallery_load() {
        if( !isset( $_POST['image_id'] ) || empty( $_POST['image_id'] ) ) die();

        $imagesId = $_POST['image_id'];

        $imagesIdArray = $this->getImageIdInArray( $imagesId );

        $this->printGalleryInside( $imagesIdArray);

        die();
    }


    function getImageIdInArray( $idOfImages ) {
        $arrayOfId = array();
        if( strpos( $idOfImages, ',') === false ) {
            $arrayOfId[] = (int)$idOfImages;
        } else {
            $arrayOfId = explode(',', $idOfImages);
        }
        return $arrayOfId;
    }
    
    public function printGalleryInside( $id ) {
        foreach( $id as $oneId ) {
            if( empty( $oneId ) ) continue;

            $img = ffGalleryCollection::getImage( $oneId );
            if( empty( $img ) ) continue;
            $url = $img->image->resize(70,70,true);
            echo '<div class="image" data-id="'.$oneId.'">';
            echo '<img width="70" src="'.$url.'">';
            echo '</div>';
        }
        echo '<div class="clear"></div>';
    }
}