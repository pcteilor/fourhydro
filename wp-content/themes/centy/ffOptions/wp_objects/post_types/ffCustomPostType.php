<?php

class ffCustomPostType{
    static $instances = array();

    protected $isRegistered = false;

    protected $slug_id;

    protected $args;
    protected $labels;
    protected $messages;
    protected $supports;

    function getArgs(){ return $this->args; }
    function getLabels(){ return $this->labels; }

    function __construct( $slug_id, $name, $singular_name = null ){
        // Prepare for registering
        $this->slug_id = $slug_id;

        $this->args = new ffCustomPostTypeArgs();
        $this->supports = new ffCustomPostTypeSupports();
        $this->labels = new ffCustomPostTypeLabels( $name, $singular_name );
        $this->messages = new ffCustomPostTypeMessages( $name, $singular_name );

        // register hook
        add_action( 'init', array($this, 'register' ) );
        add_filter( 'post_updated_messages', array($this, 'messages' ) );

        ffCustomPostType::$instances[ $slug_id ] = $this;
    }

    function messages( $messages ){
        $messages[ $this->slug_id ] = $this->messages->getMessages();
        return $messages;
    }

    function register(){
        if( $this->isRegistered ){
            return;
        }
        
        $this->isRegistered = true;
        
        $args = $this->args->getArray();
        $args['labels'] = $this->labels->getArray();
        $args['supports'] = $this->supports->getArray();

        register_post_type( $this->slug_id, $args );
    }
}

?>