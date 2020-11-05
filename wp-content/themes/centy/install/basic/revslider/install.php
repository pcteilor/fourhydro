<?php
  
class revsliderInstall {

	static function isRevSliderInstalled(){
		require_once ABSPATH . 'wp-admin/includes/plugin.php' ;
		return is_plugin_active('revslider/revslider.php');
	}

	static function updateFileDynamicCaptions(){
		@file_put_contents(
			ABSPATH . 'wp-content/plugins/revslider/rs-plugin/css/dynamic-captions.css',
			file_get_contents( dirname(__FILE__).'/textstyles.css' )
		);
	}

	static function emptySliders(){
		if( ! revsliderInstall::isRevSliderInstalled() ){
			return;
		}

		global $wpdb;
		$prefix = $wpdb->prefix;

		$SQL = "TRUNCATE ".$prefix."revslider_sliders";
		@mysql_query( $SQL );
		
		$SQL = "TRUNCATE ".$prefix."revslider_slides";
		@mysql_query( $SQL );
	}

	static function addDefaultStyles(){
		if( ! revsliderInstall::isRevSliderInstalled() ){
			return;
		}

		global $wpdb;

		if( $wpdb->get_row("SELECT * FROM ".$wpdb->prefix."revslider_css WHERE handle = '.tp-caption.large-100-black'") ){
			return;
		}

		$content = file_get_contents( dirname(__FILE__) . '/textstyles.css' );

		$content = str_replace("\n", " ", $content);
		$content = str_replace("\r", " ", $content);

		$items = explode('}',$content);

		foreach ($items as $key => $line) {
			$line = trim($line);
			if( empty($line) ){
				unset($items[ $key ]);
				continue;
			}

			$line = explode('{', $line);
			$selector = trim( $line[0] );
			$css = trim( $line[1] );

			$css = explode(';', $css);
			foreach($css as $index => $rule){
				$rule = trim($rule);
				if( empty($rule) ){
					unset($css[ $index ]);
					continue;
				}
				$rule = explode(':', $rule);
				$rule[0] = trim( $rule[0] );
				$rule[1] = trim( $rule[1] );
				
				$css[ $index ] = '"' . $rule[0] . '":"' . $rule[1] . '"';
			}


			$css = implode(',', $css);

			//( '.tp-caption.large-100-black', NULL, NULL, '{"font-size":"48px","font-weight":"100","color":"#171717","line-height":"64px"}'),

            $wpdb->query( "DELETE FROM `".$wpdb->prefix."revslider_css` WHERE `handle` = '".$selector."'" );

			$items[ $key ] = "( '".$selector."', NULL, NULL, '{".$css."}' )";
		}

		$styles_sql  = '';
		$styles_sql .= "INSERT INTO `".$wpdb->prefix."revslider_css` ( `handle`, `settings`, `hover`, `params`) VALUES \n";
		$styles_sql .= implode(",\n",$items);

		$wpdb->query( $styles_sql );
	}

	static function addDefaultSliders(){
		if( ! revsliderInstall::isRevSliderInstalled() ){
			return;
		}

		global $wpdb;
		// Adding slides
		$prefix = $wpdb->prefix;

		// SLIDERS empty ?
		$sql = "SELECT COUNT(`id`) AS cnt FROM ".$prefix."revslider_sliders";
		if( false == ( $result = @mysql_query( $sql ) )) return;
		$row = mysql_fetch_array( $result );
		if( 0 != 1 * $row['cnt'] ) return;

		// SLIDES empty ?
		$sql = "SELECT COUNT(`id`) AS cnt FROM ".$prefix."revslider_slides";
		if( false == ( $result = @mysql_query( $sql ) )) return;
		$row = mysql_fetch_array( $result );
		if( 0 != 1 * $row['cnt'] ) return;

		$f = file( dirname(__FILE__).'/revslider.frs' );

		$sqlF = array();
		foreach ($f as $value) {
			$value = trim($value);
			if( '/' == substr($value, 0, 1) ) continue;
			if( empty($value) ) continue;

			$tdu = get_template_directory_uri();
			$tdu = str_replace("/","\\\\/",$tdu);

			$value = str_replace("%%%THEME-URL%%%", $tdu, $value);

			$value = str_replace("INSERT IGNORE INTO `wp_revslider_sliders` ", "INSERT IGNORE INTO `".$prefix."revslider_sliders`", $value);
			$value = str_replace("INSERT IGNORE INTO `wp_revslider_slides` ", "INSERT IGNORE INTO `".$prefix."revslider_slides`", $value);

			$sqlF[] = $value;
		}

		foreach ($sqlF as $sql) {
			mysql_query( $sql );
		}
		fOpt::Set('basicinstall', 'revslider_data', 'installed' );
	}
}