<?php 
 function ff_comments_callback($comment, $args, $depth) {
 	$dateTimestamp = (strtotime( $comment->comment_date ));
 	
 	$trans_posted =''; //ffOpt::Get('translation blog_onecomment_posted').' ';
 	$trans_at = '';//ffOpt::Get('translation blog_onecomment_at').' ';
 	$trans_reply = ffOpt::Get('translation comment reply');
 	
 	
 	$loginText =ffOpt::Get('translation comment log-in-to-reply');
 	$waitingForApproval = ffOpt::Get('translation comment approval');
?>
                                <div id="comment-<?php comment_ID() ?>">
                                    <div class="left">
	                                    <a
	                                        href="#"
	                                        class="avatar"
	                                    >
	                                    	<?php echo get_avatar( get_comment_author_email(), '50', get_template_directory_uri().'/photos/post/avatar.jpg');?>
	                                    </a>
                                    </div>
                                    <div class="right">
                                        <div class="message">
											<?php comment_text(); ?>
											
											<?php 
												if ($comment->comment_approved == '0') {
													 echo $waitingForApproval;
												}
											?>
                                        </div>
                                        <div class="footer">
                                            <a href="<?php echo get_comment_author_url(); ?>">
                                                <?php comment_author_link(); ?>
                                            </a>
                                            <span class="date">
                                               <?php echo date('F j, l', $dateTimestamp); ?>
                                            </span>
                                        	<?php 
	                                        	if($args['type'] == 'all' || get_comment_type() == 'comment') {
													comment_reply_link(array_merge($args, array(
														'reply_text' => $trans_reply,
														'login_text' => $loginText,
														'depth' => $depth,
														'before' => '',
														'after' => ''
													)));
												}
											?>
                                        </div>
                                    </div>
                                </div>
<?php
}
?>
<?php 
	if( have_comments() ) {
?>
							<!-- COMMENTS -->

                            <div id="comments">
                                <h3 class="h5">
                                   <?php echo ffOpt::get('translation comment area_title'); ?>
                                </h3>
								  <?php  wp_list_comments(array('style' => 'ul', 'callback' => 'ff_comments_callback')); ?>
                            </div>
<?php 
	}
?>                            
                            <?php 
$name = ffOpt::Get('translation comment name');
$email =ffOpt::Get('translation comment email');
$website = ffOpt::Get('translation comment website');
$content = ffOpt::Get('translation comment comment');
$submit = ffOpt::Get('translation comment label_submit');
 
$mustLogin = ffOpt::Get('translation comment log-in-to-reply');

$loggedInAs = ffOpt::Get('translation comment logged-logout');
$title = ffOpt::get('translation comment form_title');

$commentForm = new ffCommentForm();

$commentForm->setFieldAuthor('<input name="author" type="text" data-require="any" data-placeholder="'.$name.'" />');

$commentForm->setFieldEmail('<input name="email" type="text" data-require="email" data-placeholder="'.$email.'" />');

$commentForm->setFieldUrl('<input name="url" type="text"  data-placeholder="'.$website.'" />');

$commentForm->setFieldComment('<textarea name="comment" data-require="any" data-placeholder="Comment" ></textarea>');

$commentForm->setTextSubmit($submit);


//$commentForm->setTextMustLogIn($mustLogIn)( fOpt::Get('translation', 'comment-log-in') );

$commentForm->setTextLoggedInAs( $loggedInAs );
$commentForm->setTextCommentNotesAfter('');
$commentForm->setTextCommentNotesBefore('');
$commentForm->setTextTitle('');


$commentForm->setTextMustLogIn($mustLogin);
$commentForm->setTextCancelReplyLink( fOpt::Get('translation', 'comment-cancel' ) );


$commentForm->setIdForm('commentform');

$commentForm->setIdSubmit('submit');

$commentForm->setTextTitle( $title );

// ADJUSTING THE WORDPRESS FUNCTION TO BETTER FIT BY REPLACE RULES
$commentForm->addReplaceRule('<div id="respond">', '<div id="respond"><h5 class="h5">'.$title.'</h5>');
$commentForm->addReplaceRule('id="reply-title"', 'style="display:none;"');
//$commentForm->addReplaceRule('id="submit"', 'id="submit" class="submit_comment"');

$commentForm->renderForm();
?>
