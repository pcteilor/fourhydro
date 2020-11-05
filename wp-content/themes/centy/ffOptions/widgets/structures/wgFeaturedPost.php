<?php
  
class wgFeaturedPost{

    static function createStructure(){

        $a = new ffStructure();
        $a->startSection( 'wgFeaturedPost', 'Featured Post');

            $a->addOption(ffOptEnv::TEXT, 'title', 'Title');

                $a->addOption(ffOptEnv::SELECT, 'post', 'Post', 'empty')
                    ->addSelectCallback('PostList');
                
                $a->addOption(ffOptEnv::TEXT, 'char-limit', 'Limit character count', 200);
        $a->endSection();
        
        return $a;

    }

}


