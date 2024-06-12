<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$profile_data = $extra["profile_data"];
$profile_block = $extra["profile_block"];


if ( $profile_block->show('bio') ) {
	echo $profile_data['bio'];
} 
			