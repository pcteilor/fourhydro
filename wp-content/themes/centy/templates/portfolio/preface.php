<?php 
	if( $showPreface ) {
	
?>                    
                    <div class="row">
<?php 
		if( $showTextPreface ) {
?>
                        <div class="<?php echo $colClass; ?>">
                            <h2>
                                <?php echo $prefaceTitle; ?>
                            </h2>
                            <p>
                                <?php echo $prefaceDescription; ?>
                            </p>
                        </div>
<?php 
		} // END if( $showTextPreface ) {
		if( $showFilterablePanel ) {

		$tagList = ( ffCurrOpt::get('portfolio preface tags') );
		if( empty( $tagList ) ) $tagList = array();
?>
                        <div class="<?php echo $colClass; ?> right">

                            <!-- CATEGORIES -->

                            <div class="ui_select ui_filter_switch">
                                <label>
                                    <?php echo ffOpt::get('translation post sortable-all'); ?>
                                </label>
                                <ul>
                                    <li class="active first">
                                        <a data-ui_select_value="all">
                                            <?php echo ffOpt::get('translation post sortable-all'); ?>
                                        </a>
                                    </li>
                                    <?php
                                    	$lastKey = end($tagList);
                                    	foreach( $tagList as $tagId => $oneTag ) {
											$class = '';
											if( $oneTag == $lastKey ) $class = 'last';
											//$first = $tagId == 0;
											//$last = $tagId == count($tagList) - 1;
											//$order = $first || $last ? (' class="' + ($first  ? 'first ' : '') + ($last ? 'last" ' : '" ')) : '';
											echo '<li class="'.$class.'">';
												echo '<a data-ui_select_value="'.$oneTag->term_id.'">';
		                                           echo $oneTag->name;
		                                        echo '</a>';
		                                    echo '</li>';
										}
                                    ?>
                                    
                                </ul>
                            </div>

                            <!-- COLUMNS -->
                            <?php /*
                            <div class="ui_select columns">
                                <label>
                                   <?php
                                   		$numberOfColumns = ffSP::get('template filterable number-of-columns');
                                   		echo ffOpt::get('translation post sortable-columns-'.$numberOfColumns); 
                                   ?>
                                </label>
                                <ul>
                                    <li class="first <?php if( $numberOfColumns == 1) echo 'active'; ?>">
                                        <a data-ui_select_value="1">
                                            <?php echo ffOpt::get('translation post sortable-columns-1'); ?>
                                        </a>
                                    </li>
                                    <li class="<?php if( $numberOfColumns == 2) echo 'active'; ?>">
                                        <a data-ui_select_value="2">
                                            <?php echo ffOpt::get('translation post sortable-columns-2'); ?>
                                        </a>
                                    </li>
                                    <li class="<?php if( $numberOfColumns == 3) echo 'active'; ?>">
                                        <a data-ui_select_value="3">
                                            <?php echo ffOpt::get('translation post sortable-columns-3'); ?>
                                        </a>
                                    </li>
                                    <li class="last <?php if( $numberOfColumns == 4) echo 'active'; ?>">
                                        <a data-ui_select_value="4">
                                            <?php echo ffOpt::get('translation post sortable-columns-4'); ?>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            */ ?>
                        </div>
<?php
		} // END if( $showFilterablePanel ) { 
?>                        
                    </div>
<?php 
		
	} // END if( $showPreface ) {
?>