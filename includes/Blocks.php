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
		$file = GOVPACK_PLUGIN_BUILD_PATH . 'block-editor.asset.php';

		if ( file_exists( $file ) ) {
			$asset_data = require_once $file; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		}

		wp_register_script(
			'govpack-block-editor',
			GOVPACK_PLUGIN_BUILD_URL . 'block-editor.js',
			$asset_data['dependencies'] ?? '',
			$asset_data['version'] ?? '',
			true
		);

		wp_enqueue_script('govpack-block-editor');
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

	public function handle_block_registration( Abstracts\Block $block ): void {
		$block->hooks();
		$block->register();
	}
}
