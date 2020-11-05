<?php
  
class ffCustomPostTypeSupports{
    protected $l = array(
                      'title', 'editor', 'author', 'thumbnail', 'excerpt',
                      'trackbacks', 'custom-fields', 'comments', 'revisions',
                      'page-attributes', 'post-formats',
                   );

    protected $title = true;
    protected $editor = true;
    protected $author = true;
    protected $thumbnail = true;
    protected $excerpt = true;
    protected $trackbacks = false;
    protected $custom_fields = false;
    protected $comments = false;
    protected $revisions = false;
    protected $page_attributes = false;
    protected $post_formats = false;

    public function getArray(){
        $ret = array();
        foreach ($this->l as $key) {
            $tk = str_replace('-','_',$key);
            //echo "$tk: ".$this->$tk."<br>";
            if( $this->$tk ){
                $ret[] = $key;
            }
        }
        return $ret;
    }

}
?>