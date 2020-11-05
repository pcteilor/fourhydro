<?php
/**
 * Prints pagination from data received from fPaginationData.
 * 
 * The received data are in this format
 * page => pagenumber( eg. 1, 2, 50), prev, next, startdot, enddot
 * link => url or null
 * selected => true or false
 * 
 * @author boobs.lover
 */
class fPagination {

	public static function Render() {
	
		$pg = new fPaginationData();
		$data = $pg->compute();
		
		if( $data == null ) return;
		
		$olderText = ffOpt::get('translation pagination link-older');//'OLDER ARTICLES';
		$recentText = ffOpt::get('translation pagination link-recent');
	
		$olderLink = '&nbsp';
		$recentLink = '&nbsp';
		
		foreach( $data as $one_element ) {
			if( $one_element['page'] == 'next'){
					$olderLink .= '<a href="'.$one_element['link'].'" class="ui_button" >';			
						$olderLink .= '<i class="icon-angle-left"></i>';
						$olderLink .= '<span>'; 
							$olderLink .= $olderText;
						$olderLink .= '</span>';
					$olderLink .= '</a>';
			}else if( $one_element['page'] == 'prev'){
					$recentLink .= '<a href="'.$one_element['link'].'" class="ui_button" >';
						$recentLink .= '<span>';
							$recentLink .= $recentText;
						$recentLink .= '</span>';
						$recentLink .= '<i class="icon-angle-right"></i>';
					$recentLink .= '</a>';
			}
		}
		
		
		
		echo '<div class="grid navigation">';
			echo '<div class="row">';
				echo '<div class="col-4-12">';
					echo $olderLink;
				echo '</div>';
				echo '<div class="col-1-12 gap"></div>';
				echo '<div class="col-4-12 right">';
					echo $recentLink;
				echo '</div>';
				echo '<div class="col-3-12 gap"></div>';
			echo '</div>';
		echo '</div>';

	}
	
	public static function RenderPortfolio() {
	
		$pg = new fPaginationData();
		$data = $pg->compute();
	
		if( $data == null ) return;
	
		$olderText = ffOpt::get('translation pagination link-older');//'OLDER ARTICLES';
		$recentText = ffOpt::get('translation pagination link-recent');
	
		$olderLink = '&nbsp';
		$recentLink = '&nbsp';
	
		foreach( $data as $one_element ) {
			if( $one_element['page'] == 'next'){
				$olderLink .= '<a href="'.$one_element['link'].'" class="ui_button" >';
				$olderLink .= '<i class="icon-angle-left"></i>';
				$olderLink .= '<span>';
				$olderLink .= $olderText;
				$olderLink .= '</span>';
				$olderLink .= '</a>';
			}else if( $one_element['page'] == 'prev'){
				$recentLink .= '<a href="'.$one_element['link'].'" class="ui_button" >';
				$recentLink .= '<span>';
				$recentLink .= $recentText;
				$recentLink .= '</span>';
				$recentLink .= '<i class="icon-angle-right"></i>';
				$recentLink .= '</a>';
			}
		}
	
	
	
		echo '<div class="grid navigation">';
		echo '<div class="row">';
		echo '<div class="col-5-12">';
		echo $olderLink;
		echo '</div>';
		echo '<div class="col-2-12 gap"></div>';
		echo '<div class="col-5-12 right">';
		echo $recentLink;
		echo '</div>';
		echo '</div>';
		echo '</div>';
	
	}	
}