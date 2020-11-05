<?php
  
class ffDSOption extends ffDSComponent{

	protected $description='';
	protected $value=null;

	public function setTitle( $v ){ $this->title = $v; }
	public function getTitle(    ){ return $this->title; }

	public function setDefault( $v ){ $this->value = $v; }
	public function getDefault(){     return $this->value; }

	public function setValue( $v ){ $this->value = $v; }
	public function getValue(){     return $this->value; }

	public function setDescription( $v ){ $this->description = $v; }
	public function getDescription(){ return $this->description; }

	static function create($id, $type, $struct = null){
		switch( $type ){

			case ffOptEnv::SELECT:
			case ffOptEnv::IMAGE_LIST:
			case ffOptEnv::RADIO:
				$sel = new ffDSOptionSelect($id, $type);
				if( !empty($struct) ){
					$sel->addSelectValues( $struct->getOptions() );
				}
				return $sel;

			default:
				return new ffDSOption($id, $type);
		}
	}

	public function __construct($id, $type = ffOptEnv::TEXT){
		$this->id = $id;
		$this->type = empty($type) ?
					  ffOptEnv::TEXT :
					  $type;
	}
	
	static function addData( $structOption, $data ){

		$opt = ffDSOption::create($structOption->getID(), $structOption->getType(), $structOption);

		if( !empty($data->value) ){
			$opt->setValue( $data->value );
		}else{
			$opt->setValue( $structOption->getDefault() );
		}
		
		if( ffOptEnv::CHECKBOX == $structOption->getType() ){
			$opt->setValue( 1 * $opt->getValue() );
		}

		$opt->setTitle( $structOption->getTitle() ) ;
		$opt->setType( $structOption->getType() ) ;
		$opt->setParams( $structOption->getParams() ) ;
		$opt->setDescription( $structOption->getDescription() );

		return $opt;
	}

	static function addStructure($type, $id, $title, $default, $description ){

		$opt = ffDSOption::create($id, $type);

		$opt->title       = $title;
		$opt->value       = $default;
		$opt->description = $description;

		return $opt;
	}
}
