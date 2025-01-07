<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileSeparator;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileSeparator extends \Govpack\Blocks\ProfileRow\ProfileRow {

	public string $block_name = 'govpack/profile-separator';
	

	private $show       = null;
	private $profile    = null;
	
	protected $plugin;

	private string $default_variation;

	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}



	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileSeparator' );
	}

	/**
	 * Block render handler for .
	 *
	 * @param array  $attributes    Array of shortcode attributes.
	 * @param string $content Post content.
	 * @param WP_Block $block Reference to the block being rendered .
	 *
	 * @return string HTML for the block.
	 */
	public function render( array $attributes, ?string $content = null, ?WP_Block $block = null ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
	}

	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	public function handle_render( array $attributes, string $content, WP_Block $block ) {
	}
}
