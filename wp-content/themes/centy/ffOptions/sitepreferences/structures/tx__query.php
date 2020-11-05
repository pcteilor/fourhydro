<?php

class tx__query{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'query', '');

            $a->addOption(ffOptEnv::TEXT, 'posts_per_page', 'Posts per page', 0);
            $a->addElement(ffOptEnv::DESCRIPTION, 'Set value "0" (zero) for no limit');

            $a->addOption(ffOptEnv::SELECT, 'order_by', 'Order by', '')
                ->addSelectValue('', '- Default -')
                ->addSelectValue('ID', 'ID')
                ->addSelectValue('author', 'Author')
                ->addSelectValue('title', 'Title')
                ->addSelectValue('date', 'Date')
                ->addSelectValue('modified', 'Modified')
                ->addSelectValue('comment_count', 'Comment Count');

            $a->addOption(ffOptEnv::SELECT, 'order', 'Order', '')
                ->addSelectValue('', '- Default -')
                ->addSelectValue('asc', 'Ascending order (a, b, c ... z)')
                ->addSelectValue('desc', 'Descending order (99, 98, 97 ... 2, 1)');

        $a->endSection();

        return $a;

    }

}
