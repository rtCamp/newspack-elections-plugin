<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack;

use Govpack\FrontEnd\FrontEnd;
use Govpack\Admin\Admin;




/**
 * Main Govpack Class.
 */
class Govpack {

	use \Govpack\Instance;

	/**
	 * Reference to REST API Prefix for consistency.
	 *
	 * @access public
	 * @var string REST API Prefix
	 */
	const REST_PREFIX = 'govpack/v1';
	private null|Dev_Helpers $dev;
	private FrontEnd $front_end;
	private Admin $admin;
	private Blocks $blocks;
	private Icons $icons;
	public Version $version;

	/**
	 * Inits the class and registeres the hooks call.
	 */
	public function __construct() {
		
		$this->hooks();
		$this->require( 'includes/govpack-functions.php' );
		$this->require( 'includes/govpack-functions-template.php' );

		$this->version = new Version( $this );

		if ( class_exists( '\Govpack\Dev_Helpers' ) ) {
			$this->dev = new \Govpack\Dev_Helpers( $this );
			$this->dev->hooks();
		}
	}

	public function path( $path ) {
		return GOVPACK_PLUGIN_PATH . $path;
	}

	public function require( string $path ): string {
		return require_once $this->path( $path ); //phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	}

	public function build_path( string $path ): string {
		return trailingslashit(
			trailingslashit( $this->path( 'build' ) ) . $path 
		);
	}

	public function url( string $path ): string {
		return trailingslashit( GOVPACK_PLUGIN_URL ) . $path;
	}

	/**
	 * Action called by the plugin activation hook.
	 * Causes rewrite rules to be regenerated so permalinks will work
	 */
	public static function activation(): void {
		\Govpack\Profile\CPT::register_post_type();
		flush_rewrite_rules( false ); //phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.flush_rewrite_rules_flush_rewrite_rules

		// get capabilities setup first.
		\Govpack\Capabilities::instance()->add_capabilities();
	}

	public static function deactivation(): void {
		
		// get capabilities setup first.
		\Govpack\Capabilities::instance()->remove_capabilities();
	}

	public function hooks(): void {
		\add_action( 'after_setup_theme', [ $this, 'setup' ] );
		\add_action( 'plugins_loaded', [ '\Govpack\ActionScheduler\ActionScheduler', 'hooks' ], 0 );
		\add_action( 'init', [ $this, 'register_blocks' ] );
	}


	/**
	 * Registers Plugin Post Types
	 */
	public static function post_types(): void {
		// Custom Post Types.
		\Govpack\Profile\CPT::init();
	}

	/**
	 * Registers Plugin Taxonomies
	 */
	public static function taxonomies(): void {
		// Custom Post Types.
		\Govpack\Tax\LegislativeBody::hooks();
		\Govpack\Tax\OfficeHolderStatus::hooks();
		\Govpack\Tax\OfficeHolderTitle::hooks();
		\Govpack\Tax\Party::hooks();
		\Govpack\Tax\State::hooks();
	}
	

	public function setup(): void {

		// Custom Post Types & taxonomies.
		self::post_types();
		self::taxonomies();

		if ( defined( 'WP_CLI' ) && \WP_CLI ) {
			\Govpack\CLI::init();
		}

		( new ProfileBindingSource() )->register();

		\Govpack\Importer\Importer::hooks();
		\Govpack\Admin\Export::hooks(); 
		
		\Govpack\Widgets::hooks();

		if ( is_admin() ) {
			$this->admin();
		}
		
		if ( ! is_admin() ) {
			$this->front_end();
		}
	}

	public function admin(): Admin {
		if ( ! isset( $this->admin ) ) {
			$this->admin = new Admin( $this );
			$this->admin->hooks();
		}

		return $this->admin;
	}

	public function front_end(): FrontEnd {

		if ( ! isset( $this->front_end ) ) {
			$this->front_end = FrontEnd::instance();
			$this->front_end->hooks();
			$this->front_end->template_loader();
		} 

		return $this->front_end;
	}

	public function blocks(): Blocks {

		if ( ! isset( $this->blocks ) ) {
			$this->blocks = new Blocks( $this );
			$this->blocks->hooks();
		}
		
		return $this->blocks;
	}

	public function icons(): Icons {

		if ( ! isset( $this->icons ) ) {
			$this->icons = new Icons( $this );
		}
		
		return $this->icons;
	}

	
		

	public function register_blocks() {
		$this->blocks()->register( new \Govpack\Blocks\Profile\Profile( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileSelf\ProfileSelf( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileBlockV2\ProfileBlockV2( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileTerms\ProfileTerms( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileMeta\ProfileMeta( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileRow\ProfileRow( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileFieldText\ProfileFieldText( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileLink\ProfileLink( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileLabel\ProfileLabel( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileRowGroup\ProfileRowGroup( $this ) );
		$this->blocks()->register( new \Govpack\Blocks\ProfileSeparator\ProfileSeparator( $this ) );
	}
}
