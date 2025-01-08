<?php

namespace Govpack\Blocks;

abstract class ProfileField extends \Govpack\Abstracts\Block {

	protected $plugin;
	protected $attributes = [];
	protected $context    = [];

	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	public function disable_block( $allowed_blocks, $editor_context ): bool {
		return false;
	}

	/**
	 * Block render handler for .
	 *
	 * @param array  $attributes    Array of shortcode attributes.
	 * @param string $content Post content.
	 * @param \WP_Block $block Reference to the block being rendered .
	 *
	 * @return string HTML for the block.
	 */
	public function render( array $attributes, ?string $content = null, \WP_Block $block ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable

		$this->attributes = self::merge_attributes_with_block_defaults( $this->block_name, $attributes );
		$this->context    = $block->context;

		if ( ! $this->show_block() ) {
			return null;
		}

		ob_start();
		$this->handle_render( $attributes, $content, $block );
		return \ob_get_clean();
	}

	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	abstract public function handle_render( array $attributes, string $content, \WP_Block $block ); 

	/**
	 * Determines if a block is shown during render
	 */
	public function show_block(): bool {
		return true;
	}

	/**
	 * These could be moved to a Trait - BlockContextAware
	 */

	public function get_from_context( $key ): mixed {
		if ( isset( $this->context[ $key ] ) ) {
			return $this->context[ $key ];
		}

		return $this->get_prefixed_value_from_context( $key );
	}

	public function get_prefixed_value_from_context( string $key ): mixed {
		if ( isset( $this->context[ $this->get_prefixed_context_key( $key ) ] ) ) {
			return $this->context[ $this->get_prefixed_context_key( $key ) ];
		}

		return null;
	}

	public function get_context_prefix(): string {
		return 'govpack';
	}

	public function get_prefixed_context_key( string $key ): string {
		return sprintf( '%s/%s', $this->get_context_prefix(), $key );
	}

	/**
	 * Get the profileId from the context
	 */
	public function get_profile_id() {
		return $this->get_from_context( 'profileId' );
	}

	public function get_profile() {
		return \Govpack\Profile\Profile::get( $this->get_profile_id() );
	}

	public function get_field_key() {
		return $this->get_from_context( 'fieldKey' ) ?? $this->attributes['fieldKey'] ?? false;
	}

	public function get_field() {
		return \Govpack\Profile\CPT::fields()->get( $this->get_field_key() );
	}
}
