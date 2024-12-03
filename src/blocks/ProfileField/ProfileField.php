<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileField;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileField extends \Govpack\Blocks\Profile\Profile {

	public string $block_name = 'govpack/profile-field';
	public $template          = 'profile';

	private $show       = null;
	private $profile    = null;
	private $attributes = [];
	protected $plugin;

	private string $default_variation;

	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	public function disable_block( $allowed_blocks, $editor_context ): bool {
		return false;
	}

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileField' );
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

	public function variations(): array {

		$types  = $this->create_field_type_variations();
		$fields = $this->create_field_variations();

		return array_merge( $types, $fields );
	}

	public function create_field_variations(): array {

		$variations = [];
		
		foreach ( \Govpack\CPT\Profile::fields()->all() as $field ) {
			$variation = [
				'category'    => 'govpack-profile-fields',
				'name'        => sprintf( 'profile-field-%s', $field->slug ),
				'title'       => $field->label,
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display Profile Field: %s' ),
					$field->label
				),
				'attributes'  => [
					'fieldType' => $field->type->slug,
					'meta_key'  => $field->slug,
				],
				'isActive'    => [ 'meta_key' ],
				'scope'       => [ 'inserter', 'transform' ],
				'icon'        => $field->type->variation_icon(),
			];

			$variations[] = $variation;
		}

		return $variations;
	}

	public function get_icon_map() {
		return [
			'text'     => 'text',
			'textarea' => 'text',
			'date'     => 'calendar',
			'url'      => 'admin-links',
		];
	}

	public function get_variation_icon( $type ) {
		$icon_map = $this->get_icon_map();
		return $icon_map[ $type ];
	}

	public function create_field_type_variations(): array {
		$types      = \Govpack\CPT\Profile::get_field_types();
		$variations = [];

		foreach ( $types as $type ) {
			$variation = [
				'category'    => 'govpack-profile-fields',
				'name'        => sprintf( 'profile-field-%s', $type->slug ),
				'title'       => sprintf( 'Profile %s Field', ucfirst( $type->label ) ),
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display a profile field of type: %s' ),
					$type->label
				),
				'attributes'  => [
					'fieldType' => $type->slug,
				],
				'isActive'    => [ 'fieldType' ],
				'scope'       => [ 'inserter', 'transform' ],
				'icon'        => $type->variation_icon(),
				'innerBlocks' => $type->get_variation_inner_blocks(),
			];

			$variations[] = $variation;
		}

		return $variations;
	}
}
