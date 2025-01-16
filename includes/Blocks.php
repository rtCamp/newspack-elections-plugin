<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack;

class Blocks {

	use PluginAware;

	private array $blocks = [];

	public function __construct( Govpack $plugin ) {
		$this->plugin( $plugin );
	}

	public function hooks(): void {
		add_action( 'init', [ $this, 'provide_register_blocks_hook' ], 99 );
		add_action( 'gp_register_blocks', [ $this, 'register_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
	}

	/**
	 * Register Block Assets.
	 */
	public function enqueue_block_editor_assets(): void {
	
		$this->register_script( 'govpack-block-editor', 'block-editor' );
		wp_enqueue_script( 'govpack-block-editor' );

		$this->register_script( 'govpack-blocks-editor', 'editor-blocks' );
		wp_enqueue_script( 'govpack-blocks-editor' );

		$this->register_style( 'govpack-blocks-editor', 'editor-blocks' );
		wp_enqueue_style( 'govpack-blocks-editor' );
	}

	public function register_style( $handle, $asset_name ) {
		wp_enqueue_style(
			$handle,
			GOVPACK_PLUGIN_BUILD_URL . $asset_name . '.css',
			[],
			1
		);
	}

	public function register_script( $handle, $asset_name ) {
		$file = GOVPACK_PLUGIN_BUILD_PATH . $asset_name . '.asset.php';

		if ( file_exists( $file ) ) {
			$asset_data = require_once $file; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		}

		wp_register_script(
			$handle,
			GOVPACK_PLUGIN_BUILD_URL . $asset_name . '.js',
			$asset_data['dependencies'] ?? '',
			$asset_data['version'] ?? '',
			true
		);
	}

	public function provide_register_blocks_hook(): void {
		do_action( 'gp_register_blocks' );
	}

	public function is_late_block_registration(): bool {
		// did_action returns the number of times ran, anything more than 0 should be true
		return ( did_action( 'gp_register_blocks' ) > 0 );
	}

	public function register( Abstracts\Block $block ): void {
		$this->blocks[ $block->block_name ] = $block;

		if ( $this->is_late_block_registration() ) {
			$this->handle_block_registration( $block );
		}
	}

	public function register_blocks(): void {
		foreach ( $this->blocks as $name => $block ) {
			$this->handle_block_registration( $block );
		}
	}

	public static function filter_server_side_block_meta_data( $settings, $metadata ) {
		unset( $settings['editor_script_handles'] );
		return $settings;
	}

	public function handle_block_registration( Abstracts\Block $block ): void {

		add_filter( 'block_type_metadata_settings', [ __CLASS__, 'filter_server_side_block_meta_data' ], 10, 2 );

		$block->hooks();
		$block->register();
		
		remove_filter( 'block_type_metadata_settings', [ __CLASS__, 'filter_server_side_block_meta_data' ], 10, 2 );
	}
}
