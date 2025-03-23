<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Admin;

use Govpack\Capabilities;
use Govpack\Profile\CPT as Profile;
use Govpack\Govpack;

use Exception;

/**
 * GovPack Admin Hooks
 */
class Admin {

	//use \Govpack\Instance;

	private Govpack $plugin;

	public function __construct( Govpack $plugin ) {
		$this->plugin = $plugin;
	}
	/**
	 * Register Hooks for usage in wp-admin.
	 */
	public function hooks(): void {
		\add_action( 'admin_menu', [ '\Govpack\Admin\Menu', 'add_taxonomy_submenus' ], 10, 1 );
		\add_action( 'admin_menu', [ $this, 'create_menus' ], 1, 1 );
		\add_action( 'admin_enqueue_scripts', [ __CLASS__, 'register_assets' ], 100, 1 );
		\add_action( 'admin_enqueue_scripts', [ __CLASS__, 'load_assets' ], 101, 1 );
		//\add_action( 'block_categories_all', [ __CLASS__, 'block_categories' ], 10, 2 );                
		\add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'enqueue_block_editor_assets' ] );
		\add_action( 'current_screen', [ __CLASS__, 'conditional_hooks' ] );
	
		\add_action( 'after_setup_theme', [ '\Govpack\Admin\Export', 'hooks' ], 11, 1 );
	}


	/**
	 * Register Block Assets.
	 */
	public static function enqueue_block_editor_assets(): void {
	}

	/**
	 * Callback that adds a Category to the Block Editor for Govpack
	 * 
	 * @param array $categories The existing Block Categories.
	 */

	
	
	/**
	 * Utility Function that redirects to Profiles archive.
	 */
	public static function redirect_to_profiles(): void {
		wp_safe_redirect( admin_url( 'edit.php?post_type=' . Profile::CPT_SLUG ), 302 );
		exit;
	}

	/**
	 * Used to check if we're loaing the main "Govpack" page, redirect to the profile stable is we are.
	 */
	public static function conditional_hooks(): void {
		$screen = get_current_screen();
		

		if ( ! $screen ) {
			return;
		}

		switch ( $screen->base ) {
			case 'toplevel_page_govpack':
				self::redirect_to_profiles();
				break;
			case 'options-permalink':
				Permalink_Settings::hooks();
				break;
		}
	}

	public function get_menu_svg() {
		return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 16H20M4 16V18.5C4 19.3284 4.67157 20 5.5 20H18.5C19.3284 20 20 19.3284 20 18.5V16M4 16V10.5C4 9.67157 4.67157 9 5.5 9H8M20 16V10.5C20 9.67157 19.3284 9 18.5 9H16" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M16 9H18.5C19.3284 9 20 9.67157 20 10.5V14.5C20 15.3284 19.3284 16 18.5 16H5.5C4.67157 16 4 15.3284 4 14.5V10.5C4 9.67157 4.67157 9 5.5 9H8" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M7 12.5H17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 12V6C16 5.17157 15.3284 4.5 14.5 4.5H9.5C8.67157 4.5 8 5.17157 8 6V12" stroke="white" stroke-width="1.5"/>
<path d="M10.5 8.5L11.5 9.5L13.5 7.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
';
	}

	public function create_menu_svg() {
		return sprintf( 'data:image/svg+xml;base64,%s', base64_encode( $this->get_menu_svg() ) );
		//return sprintf( 'data:image/svg+xml;base64,%s', "PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgMTZIMjBNNCAxNlYxOC41QzQgMTkuMzI4NCA0LjY3MTU3IDIwIDUuNSAyMEgxOC41QzE5LjMyODQgMjAgMjAgMTkuMzI4NCAyMCAxOC41VjE2TTQgMTZWMTAuNUM0IDkuNjcxNTcgNC42NzE1NyA5IDUuNSA5SDhNMjAgMTZWMTAuNUMyMCA5LjY3MTU3IDE5LjMyODQgOSAxOC41IDlIMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNiA5SDE4LjVDMTkuMzI4NCA5IDIwIDkuNjcxNTcgMjAgMTAuNVYxNC41QzIwIDE1LjMyODQgMTkuMzI4NCAxNiAxOC41IDE2SDUuNUM0LjY3MTU3IDE2IDQgMTUuMzI4NCA0IDE0LjVWMTAuNUM0IDkuNjcxNTcgNC42NzE1NyA5IDUuNSA5SDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik03IDEyLjVIMTciIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE2IDEyVjZDMTYgNS4xNzE1NyAxNS4zMjg0IDQuNSAxNC41IDQuNUg5LjVDOC42NzE1NyA0LjUgOCA1LjE3MTU3IDggNlYxMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHBhdGggZD0iTTEwLjUgOC41TDExLjUgOS41TDEzLjUgNy41IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" );
	}
	/**
	 * Creates the Govpack Menu in the Dashboard Navigation
	 */
	public function create_menus(): void {

	
		$menu = new Menu();
		$menu->set_page_title( __( 'Elections', 'newspack-elections' ) )
			->set_menu_title( __( 'Elections', 'newspack-elections' ) )
			->set_menu_slug( 'govpack' )
			->set_icon( $this->create_menu_svg() )
			->set_callback(
				function () {
					// no call back as this should be redirected.
				}
			);

		$item = new MenuItem();
		$menu->add_item(
			$item->set_page_title( __( 'Import', 'newspack-elections' ) )
				->set_menu_title( __( 'Import', 'newspack-elections' ) )
				->set_menu_slug( 'govpack_import' )
				->set_capability( Capabilities::CAN_IMPORT )
				->set_callback( [ '\Govpack\Admin\Pages\Import', 'view' ] ) 
		);

		$item = new MenuItem();
		$menu->add_item(
			$item->set_page_title( __( 'Export', 'newspack-elections' ) )
				->set_menu_title( __( 'Export', 'newspack-elections' ) )
				->set_menu_slug( 'govpack_export' )
				->set_capability( Capabilities::CAN_EXPORT )
				->set_callback( [ '\Govpack\Admin\Pages\Export', 'view' ] ) 
		);

		$menu->create();
	}

	/**
	 * Register Govpack JS/CSS Assets for wp-admin 
	 */
	public static function register_assets(): void {

		$file = GOVPACK_PLUGIN_BUILD_PATH . 'admin.asset.php';

		if ( file_exists( $file ) ) {
			$asset_data = require_once $file; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		}

		wp_register_style(
			'govpack-admin-style',
			GOVPACK_PLUGIN_BUILD_URL . 'admin.css',
			$asset_data['dependencies'] ?? '',
			$asset_data['version'] ?? '',
			'all'
		);

		wp_register_script(
			'govpack-admin-script',
			GOVPACK_PLUGIN_BUILD_URL . 'admin.js',
			$asset_data['dependencies'] ?? '',
			$asset_data['version'] ?? '',
			true
		);


		$file = GOVPACK_PLUGIN_BUILD_PATH . 'editor.asset.php';

		if ( file_exists( $file ) ) {
		
			$asset_data = require_once $file; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		}

		wp_register_script(
			'govpack-editor',
			GOVPACK_PLUGIN_BUILD_URL . 'editor.js',
			$asset_data['dependencies'] ?? [],
			$asset_data['version'] ?? '',
			true
		);
		wp_register_style(
			'govpack-editor-style',
			GOVPACK_PLUGIN_BUILD_URL . 'editor.css',
			[],
			true
		);
	}

	/**
	 * Conditionally Enqueue JS/CSS Assets depending on wp_screen
	 */
	public static function load_assets(): void {
		\wp_enqueue_style( 'govpack-admin-style' );
		
		$screen = get_current_screen();

		if ( $screen === null ) {
			return;
		}

		if ( true === $screen->is_block_editor() && 'govpack_profiles' === $screen->post_type ) {
			
			\wp_enqueue_script( 'govpack-editor' );
			\wp_enqueue_style( 'govpack-editor-style' );
		}
	}
}
