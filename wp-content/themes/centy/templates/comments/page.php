<?php 
 function ff_comments_callback($comment, $args, $depth) {
 	$dateTimestamp = (strtotime( $comment->comment_date ));
 	
 	$trans_posted =''; //ffOpt::Get('toTranslation blog_onecomment_posted').' ';
 	$trans_at = '';//ffOpt::Get('toTranslation blog_onecomment_at').' ';
 	$trans_reply ='';// ffOpt::Get('toTranslation blog_onecomment_reply').' ';
 	
 	
 	$loginText ='';//  ffOpt::Get('toTranslation blog_onecomment_login').' ';
 	$waitingForApproval ='';// ffOpt::Get('toTranslation blog_onecomment_approval').' ';
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
														'reply_text' => $trans_reply.'xxx',
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

							<!-- COMMENTS -->

                            <div id="comments">
                                <h3 class="h5">
                                   COMMENTSxx
                                </h3>
								  <?php  wp_list_comments(array('style' => 'ul', 'callback' => 'ff_comments_callback')); ?>

                            </div>
                            <?php 
$name = 'xx';//ffOpt::Get('toTranslation blog_commentform_name');
$email ='xx';//ffOpt::Get('toTranslation blog_commentform_email');
$website = 'xx';//ffOpt::Get('toTranslation blog_commentform_website');
$content = 'xx';//ffOpt::Get('toTranslation blog_commentform_comment');
$submit = 'xx';//ffOpt::Get('toTranslation blog_commentform_postcomment');
 
$mustLogin = 'xx';//ffOpt::Get('toTranslation blog_commentform_must_logged_in');

$loggedInAs = 'xx';//ffOpt::Get('toTranslation blog_commentform_logged_in_as');


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

$commentForm->setTextTitle('titulek');

// ADJUSTING THE WORDPRESS FUNCTION TO BETTER FIT BY REPLACE RULES
//$commentForm->addReplaceRule('<div id="respond">', '<div id="respond"><h3 class="h5">NADPIS</h3>');
//$commentForm->addReplaceRule('id="reply-title"', 'style="display:none;"');
//$commentForm->addReplaceRule('id="submit"', 'id="submit" class="submit_comment"');

$commentForm->renderForm();
?>
