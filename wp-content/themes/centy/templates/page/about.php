<?php 
	ffTemplater::requirePagePreface();
?>

<!-- ABOUT -->

<?php 
	if( $highlight->get('enableSection') ) {
?>            
            <div
                id="about"
                class="highlight"
            >
                <div class="container">
                    <h2>
                        <?php echo $highlight->get('highlight_title'); ?>
                    </h2>
                    <p>
                        <?php echo $highlight->get('highlight_content'); ?>
                    </p>
                </div>
            </div>
<?php 
	} // END if( $highlight->get('enableSection') )
?>
            <!-- HISTORY -->

            <div id="history">
                <div class="container grid">
                    <div id="post-<?php the_ID(); ?>" <?php post_class('row'); ?>>
                        <div class="col-2-12">
                            <h5 class="aside">
                                <?php echo $sectionTitle; ?>
                            </h5>
                        </div>
                        <div class="col-1-12 gap"></div>
                        <div class="col-9-12">
							<?php 
                            	$fprinter->title();	
                            ?>
                            <?php 
                            	$fprinter->the_content_upgraded();
                            ?>
                        </div>
                    </div>
                </div>
            </div>
<?php 
	if( $team->get('enableSection') ) {
?> 
            <!-- TEAM -->

            <div id="team">
                <div class="container grid">
                    <div class="row">
                        <div class="col-2-12">
                            <h5 class="aside">
                                <?php echo $team->get('section_title'); ?>
                            </h5>
                        </div>
                        <div class="col-1-12 gap"></div>

                        <!-- MEMBERS -->

                        <div class="col-9-12 grid">
                            <ul class="row items fade">
                            <?php 
                            	foreach( $team->get('items') as $oneMember ) {
                            ?>

                                <!-- MEMBER -->

                                <li class="col-1-3">
                                    <a
                                        href="<?php echo $oneMember->get('image'); ?>"
                                        rel="team"
                                        class="ui_lightbox"
                                    >
                                        <span class="image">
                                            <img
                                                src="<?php echo $oneMember->get('image'); ?>"
                                                alt=""
                                            />
                                        </span>
                                        <span class="description">
                                            <h4>
                                                <?php echo $oneMember->get('title'); ?>
                                            </h4>
                                            <p>
                                                <?php echo $oneMember->get('text'); ?>
                                            </p>
                                        </span>
                                    </a>
                                </li>
							<?php 
								} // END foreach( $team->get('items') as $oneMember )
							?>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
<?php 
	} // END if( $team->get('enableSection') )
?>
	
<?php 
	if( $imageStripe->get('enableSection') ) {
?> 
            <!-- OFFICE -->

            <div class="banner ui_preloader">
                <div
                    class="background"
                    style="background-image: url(<?php echo $imageStripe->get('image_source'); ?>);"
                ></div>
            </div>
            
<?php 
	} // END if( $imageStripe->get('enableSection') )
?>            

<?php 
	if( $clients->get('enableSection') ) {
?> 
            <!-- CLIENTS -->

            <div id="clients">
                <div class="container grid">
                    <div class="row">
                        <div class="col-2-12">
                            <h5 class="aside">
                                <?php echo $clients->get('section_title'); ?>
                            </h5>
                        </div>
                        <div class="col-10-12 gap"></div>
                        <div class="col-1-1 list">
                            <ul class="float scale">
							<?php 
								foreach( $clients->get('items') as $oneClient ) {
							?>
                                <!-- CLIENT -->

                                <li>
                                    <a <?php if( $oneClient->get('url') != '' ) echo 'href="'.$oneClient->get('url').'"'; ?>>
                                        <img
                                            src="<?php echo $oneClient->get('image'); ?>"
                                            alt=""
                                            width="143"
                                            height="98"
                                            class="normal"
                                        />
                                        <img
                                            src="<?php echo $oneClient->get('image'); ?>"
                                            alt=""
                                            width="143"
                                            height="98"
                                            class="hover"
                                        />
                                    </a>
                                </li>
							<?php 
								} // END foreach( $clients->get('items') as $oneClient )
							?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
<?php 
	} // END if( $clients->get('enableSection') )
?>
	
<?php 
	if( $requestButton->get('enableSection') ) {
?> 	
            <!-- QUOTATION REQUEST -->

            <div
                id="request"
                class="highlight"
            >
                <div class="container">
                    <a
                        href="<?php echo $requestButton->get('button_url'); ?>"
                        class="ui_button"
                        data-ui_button_type="inverse"
                    >
                        <?php echo $requestButton->get('button_title'); ?>
                    </a>
                </div>
            </div>
<?php 
	} // END if( $requestButton->get('enableSection') )
?>       
	
