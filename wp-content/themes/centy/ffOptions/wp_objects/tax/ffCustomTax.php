<?php

class ffCustomTax{
    static $instances = array();

    protected $isRegistered = false;

    protected $slug_id;

    protected $args;
    protected $labels;
    protected $supports = array();

    function getArgs(){ return $this->args; }
    function getLabels(){ return $this->labels; }
    function getSupport(){ return $this->supports; }
    function getInstance($name){ return empty(ffCustomTax::$instances[$name])?false:ffCustomTax::$instances[$name]; }

    function __construct( $slug_id, $name, $singular_name = null ){
        // Prepare for registering
        $this->slug_id = $slug_id;

        // Args
        $this->args = new ffCustomTaxArgs();
        $this->labels = new ffCustomTaxLabels( $name, $singular_name );

        // register hook
        add_action('init', array($this, 'register' ) );

        ffCustomTax::$instances[ $slug_id ] = $this;
    }
    
    function addSupport($post_type){
        $this->supports[] = $post_type;
    }

    function register(){
        if( $this->isRegistered ){
            return;
        }
        
        $this->isRegistered = true;
        
        $args = $this->args->getArray();
        $args['labels'] = $this->labels->getArray();

        register_taxonomy( $this->slug_id, $this->supports, $args );
    }
}

?>