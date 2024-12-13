<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileFieldTerm;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileFieldTerm extends \Govpack\Blocks\Profile\Profile {

	public string $block_name = 'govpack/profile-field-term';
	public $template          = 'profile';

	private $show       = null;
	private $profile    = null;
	private $attributes = [];
	protected $plugin;

	private string $default_variation;

	public function __construct( $plugin ) {

		$this->plugin            = $plugin;
		$this->default_variation = 'govpack_officeholder_status'; // TODO: reference the const from the taxonomy file.
	}

	public function disable_block( $allowed_blocks, $editor_context ): bool {
		return false;
	}

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileFieldTerm' );
	}

	public function variations(): array {

		$taxonomies = get_object_taxonomies(
			'govpack_profiles', // TODO: reference the const from the post_type file.
			[
				'publicly_queryable' => true,
				'show_in_rest'       => true,
			],
			'objects'
		);
	
		$variations = [];

		// Create and register the eligible taxonomies variations.
		foreach ( $taxonomies as $taxonomy ) {


			if ( $taxonomy->_builtin ) {
				continue;
			}
			$variation = [
				'name'        => $taxonomy->name,
				'title'       => $taxonomy->label,
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display a list of assigned terms from the taxonomy: %s' ),
					$taxonomy->label
				),
				'attributes'  => [
					'taxonomy' => $taxonomy->name,
				],
				'isActive'    => [ 'taxonomy' ],
				'scope'       => [ 'inserter', 'transform' ],
			];
			// Set the category variation as the default one.
			if ( $this->default_variation === $taxonomy->name ) {
				$variation['isDefault'] = true;
			}
			
			$variations[] = $variation;
			
		}

		return $variations;
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

	
	public function template(): string {
		return sprintf( 'blocks/%s', $this->template );
	}
}
