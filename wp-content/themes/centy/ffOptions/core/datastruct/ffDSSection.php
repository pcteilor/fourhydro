<?php
  
class ffDSSection extends ffDSComponent{

    public $type = ffOptEnv::SECTION;

    protected $repeatable;
    protected $childs = array();

    public function typeRepeatable(){ return $this->repeatable; }
    public function isSection(){ return TRUE; }
    public function hasChilds(){ return !empty( $this->childs ); }
    public function getChilds(){ return ( $this->hasChilds() ) ? $this->childs : array(); }

    public function getSection(){ return $this; }
    
    public function addChild( &$item ){
        $this->childs[] = $item;
        return $this;
    }

    public function GetWithHTMLEntities($path = ''){
        $val = "".$this->Get( $path );
        if( ! is_string($val) ){
            return "NOT STRING";
        }

        $val = str_replace( "&", "&amp;", $val);

        $replace =      array( "<"    , ">"    , '"'      , "'"     );
        $replace_with = array( "&lt;" , "&gt;" , '&quot;' , "&#39;" );

        $val = str_replace($replace, $replace_with, $val);

        return $val;
    }

    public function Get($path = ''){

        $path = strtolower($path);

        if( FALSE !== strpos($path, ' ') ){
            list($sub_child, $sub_sub_child) = explode(" ", $path, 2);
            foreach ($this->childs as $ch) {
                if( $sub_child == $ch->id ){
                    return $ch->Get($sub_sub_child);
                }
            }
        }else if( empty($path) ){
            return $this->childs;
        }else{
            foreach ($this->childs as $ch) {
                if( $path == $ch->id ){
                    if( $ch->isSection() ){
                        if( $ch->typeRepeatable() ){
                            return $ch->getChilds();
                        }else{
                            return $ch;
                        }
                    }else{
                        return $ch->getValue();
                    }
                }
            }
        }

        return "UNDEFINED PATH: '".$path;
    }

}
