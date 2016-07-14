<?php

	/* 	Author: Angel Magaña -- cheleguanaco@cheleguanaco.com
	*  	File: ./custom/clients/base/views/dashlet-calendar/dashlet-calendar.php
	*	
	*	Version: 1.0	
	*
	*  	Metadata for graphical calendar dashlet   
	*/

$viewdefs['base']['view']['dashlet-calendar'] = array(
    'dashlets' => array(
        array(
            'label' => 'My Calendar',
            'description' => 'Graphical Daily Calendar',
            'config' => array(
            	'activity' => 'Calls',
            ),
            'preview' => array(
            ),
            'filter' => array(
            )
        ),
    ),
    'panels' => array(
        array(
            'name' => 'dashlet_settings',
            'columns' => 2,
            'labelsOnTop' => true,
            'placeholders' => true,
            'fields' => array(
                array(
                    'name' => 'activity',
                    'label' => 'Activities',
                    'type' => 'enum',
                    'options' => array(
                        'Calls' => 'Calls',
                        'Meetings' => 'Meetings',
                        'CallsMeetings' => 'Calls & Meetings',
                    ),
                ),
            ),
        ),
    ),
);