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
		/**
		 * @psalm-suppress InvalidArgument
		 */
		add_action( 'init', [ get_called_class(), 'register_taxonomy' ], 10, 0 );
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
