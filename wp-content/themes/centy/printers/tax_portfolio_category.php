<?php

class html_portfolio_category_Printer extends htmlPortfolioPrinter {

/******************************************************************************/
/*----------------------------------------------------------------------------*/
/* PORTFOLIO - TAGS
/*----------------------------------------------------------------------------*/
/******************************************************************************/

    public function printSortableLoop(){
        $buffer = $this->runLoopBuffer('requireLoopItemPortfolio');
        $this->printSortableTags();

        echo '<div class="portfolio_grid_wrapper">
        				<div class="portfolio_grid sortable_grid grid grid_3 sortable"
                      data-grid-4-width="840"
                      data-grid-3-width="680"
                      data-grid-2-width="480"
                      data-grid-selectors-for-padding="img"
                      data-grid-wrappers-for-padding=".image_container"
                      data-grid-centering-for-padding="center"
                      >';
        echo $buffer;
        echo '<div class="clear"></div></div></div>';
    }
}