<?php
	/* 	Author: Angel Magaña -- cheleguanaco@cheleguanaco.com
	*  	File: ./custom/Extension/application/Ext/JSGroupings/fullcalendar.js.ext.php
	*	
	*	Version: 1.0
	*
	*  	JSGroupings extension to load Fullcalendar JS libraries   
	*/

	$js_groupings[] = $sugar_grp_sidecar = array_merge($sugar_grp_sidecar,
		array(
			'custom/fullcalendar/lib/moment.min.js' => 'include/javascript/sugar_sidecar.min.js',
			'custom/fullcalendar/fullcalendar.min.js' => 'include/javascript/sugar_sidecar.min.js',
		)
	);

?>