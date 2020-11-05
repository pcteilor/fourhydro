<?php
class ffCurrOpt {
	private static $_currentOptions = array();
	public static function set( $name, $value ) {
		self::$_currentOptions[ $name ] = $value;
	}
	
	public static function get( $name ) {
		if( isset( self::$_currentOptions[ $name ] ) ) {
			return self::$_currentOptions[ $name ];
		} else {
			return null;
		}
	}
}