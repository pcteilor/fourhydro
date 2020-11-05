<?php
################################################################################ 
# NOTICE:
################################################################################
# PLEASE NOTE, THAT TEMPLATES COULD HAVE HELPERS ( CODE EXECUTED RIGHT BEFORE
# INCLUDING THE TEMPLATE. THESE HELPERS ARE LOCATED IN:
#
# /templates_helpers/
#
# and are copying the structure of the /templates/ folder. So for example if you
# are editing /templates/blog/blog.php, the helper is:
#
# /templates_helpers/blog/blog.php

?>
			<!-- PREFACE -->

            <div id="preface">
                <div class="container grid">
<?php 
					ffTemplater::requirePortfolioPreface();
?>
                </div>
            </div>

            <!-- PORTFOLIO -->

            <div id="portfolio">
                <div class="container">
                    <div class="grid">
                        <ul class="row items fade ui_filter_items">
<?php 
						echo $portfolioContent;
?>                    

                        </ul>
                    </div>
<?php 
	fPagination::RenderPortfolio();
?>
                </div>
            </div>

<?php 
	//ffTemplater::portfolioRequestButton();
?>