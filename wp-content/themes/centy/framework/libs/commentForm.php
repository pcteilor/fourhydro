<?php
/*******************************************************************************
 * Wrapper on the Comment Form wordpress function, which is required from
 * 3.0 version. Makes this shit much easier :)
*******************************************************************************/


/* ARGS DEFAULT
  
   $args = array(
	'id_form' => 'commentform',
	'id_submit' => 'submit',
	'title_reply' => __( 'Leave a Reply' ),
	'title_reply_to' => __( 'Leave a Reply to %s' ),
	'cancel_reply_link' => __( 'Cancel Reply' ),
	'label_submit' => __( 'Post Comment' ),
	'comment_field' => '<p class="comment-form-comment"><label for="comment">' . _x( 'Comment', 'noun' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>',
	'must_log_in' => '<p class="must-log-in">' .  sprintf( __( 'You must be <a href="%s">logged in</a> to post a comment.' ), wp_login_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>',
	'logged_in_as' => '<p class="logged-in-as">' . sprintf( __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ), admin_url( 'profile.php' ), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>',
	'comment_notes_before' => '<p class="comment-notes">' . __( 'Your email address will not be published.' ) . ( $req ? $required_text : '' ) . '</p>',
	'comment_notes_after' => '<p class="form-allowed-tags">' . sprintf( __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s' ), ' <code>' . allowed_tags() . '</code>' ) . '</p>',
	'fields' => apply_filters( 'comment_form_default_fields', array(
		'author' => '<p class="comment-form-author">' . '<label for="author">' . __( 'Name', 'domainreference' ) . '</label> ' . ( $req ? '<span class="required">*</span>' : '' ) . '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></p>',
		'email' => '<p class="comment-form-email"><label for="email">' . __( 'Email', 'domainreference' ) . '</label> ' . ( $req ? '<span class="required">*</span>' : '' ) . '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' /></p>',
		'url' => '<p class="comment-form-url"><label for="url">' . __( 'Website', 'domainreference' ) . '</label>' . '<input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" /></p>' ) ) );
 */

class ffCommentForm {
	private $_args = array();
	
	private $_replaceRules = array();
	
	public function addReplaceRule( $pattern, $replacement, $isRegularExpression = false ) {
		$newRule = array();
		$newRule['pattern'] = $pattern;
		$newRule['replacement'] = $replacement;
		$newRule['isRegExp'] = $isRegularExpression;
		
		$this->_replaceRules[] = $newRule;
	}
	
	public function setFieldAuthor( $author ) {
		$this->_args['fields']['author'] = $author;
	}
	
	public function setFieldUrl( $url ) {
		$this->_args['fields']['url'] = $url;
	}
	
	public function setFieldEmail( $email ) {
		$this->_args['fields']['email'] = $email;
	}
	
	public function setFieldComment( $comment ) {
		$this->_args['comment_field'] = $comment;
	}
	
	public function setTextMustLogIn( $mustLogIn ) {
		
		$this->_args['must_log_in'] = '<p class="must-log-in">' .  sprintf( __( $mustLogIn ), wp_login_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>';
	}
	
	public function setTextLoggedInAs( $loggedInAs ) {
		global $user_identity;
		$loggedInAs = '<p class="logged-in-as">' . sprintf($loggedInAs, admin_url( 'profile.php' ), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>';
		$this->_args['logged_in_as'] = $loggedInAs;
	}
	
	public function setTextCommentNotesBefore( $commentNotesBefore ) {
		$this->_args['comment_notes_before'] = $commentNotesBefore;
	}
	
	public function setTextCommentNotesAfter( $commentNotesAfter ) {
		$this->_args['comment_notes_after'] = $commentNotesAfter;
	}	
	
	public function setTextSubmit( $submitButton ) {
		$this->_args['label_submit'] = $submitButton;
	}
	
	public function setIdForm( $formId ) {
		$this->_args['id_form'] = $formId;
	}
	
	public function setIdSubmit( $submitId ) {
		$this->_args['id_submit'] = $submitId;
	}
	
	public function setTextTitle( $title ) {
		$this->_args['title_reply'] = $title;
	}
	
	public function setTextTitleReplyTo( $titleReplyTo ) {
		$this->_args['title_reply_to'] = $titleReplyTo;
	}
	
	public function setTextCancelReplyLink( $cancelReplyLink ) {
		$this->_args['cancel_reply_link'] = $cancelReplyLink;
	}
	
	public function renderForm() {
		ob_start();
		comment_form( $this->_args );
		$commentForm = ob_get_contents();
		ob_end_clean();
		
		$commentFormAdjusted = $this->_adjustCommentForm( $commentForm );
		echo $commentFormAdjusted;
	}
	
	private function _adjustCommentForm( $commentForm ) {
		if( !empty($this->_replaceRules) ) {
			foreach( $this->_replaceRules as $oneRule ) {
				$commentForm = str_replace( $oneRule['pattern'], $oneRule['replacement'], $commentForm);
			}
		}
		return $commentForm;
	}
}