<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Abstracts;

use Govpack\CPT\Profile;

/**
 * Register and handle the "Profile" Custom Post Type
 */
abstract class Taxonomy {
	/**
	 * WordPress Hooks
	 */
	public static function hooks() : void {
		add_action( 'init', [ get_called_class(), 'register_taxonomy' ] );
	}

	/**
	 * Get taxonomy post types
	 *
	 * @return array
	 */
	protected static function get_taxonomy_post_types() : array {
		return [ Profile::CPT_SLUG ];
	}

}
