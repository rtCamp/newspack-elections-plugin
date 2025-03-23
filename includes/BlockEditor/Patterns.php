<?php

namespace Govpack\BlockEditor;

use Govpack\Govpack;
use WP_Block_Patterns_Registry;

class Patterns {

	private string $pattern_directory;
	private WP_Block_Patterns_Registry $registry;
	private Govpack $plugin;

	private string $default_category;

	public function __construct($plugin){
		$this->plugin = $plugin;
	}

	public function set_pattern_directory(string $path) : self {
		$this->pattern_directory = $path;
		return $this;
	}

	public function set_default_category(string $category) : self {
		$this->default_category = $category;
		return $this;
	}

	public function hooks() {
		add_action( 'admin_init', [ __CLASS__, 'register_block_patterns' ] );
	}

	private function registry() : WP_Block_Patterns_Registry {

		if(!isset($this->registry)){
			$this->registry = WP_Block_Patterns_Registry::get_instance();
		}

		return $this->registry;
	}

	public function load_patterns_in_directory() : self {
		

		$patterns = $this->load_patterns_files();
		

		foreach ( $patterns as $file => $pattern_data ) {
			if ( $this->registry()->is_registered( $pattern_data['slug'] ) ) {
				continue;
			}

			$path = trailingslashit($this->pattern_directory) . $file;

			if ( ! file_exists( $path ) ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf(
						/* translators: %s: file name. */
						__( 'Could not register file "%s" as a block pattern as the file does not exist.' ),
						$file
					),
					'6.4.0'
				);
				
				continue;
			}

			$pattern_data['filePath'] = $path;

			// Translate the pattern metadata.
			// phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText,WordPress.WP.I18n.NonSingularStringLiteralDomain,WordPress.WP.I18n.LowLevelTranslationFunction
			$pattern_data['title'] = translate_with_gettext_context( $pattern_data['title'], 'Pattern title', $this->plugin->text_domain );
			if ( ! empty( $pattern_data['description'] ) ) {
				// phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText,WordPress.WP.I18n.NonSingularStringLiteralDomain,WordPress.WP.I18n.LowLevelTranslationFunction
				$pattern_data['description'] = translate_with_gettext_context( $pattern_data['description'], 'Pattern description', $this->plugin->text_domain );
			}

			
			// if categories are set then force the defauly category
			if( $this->use_default_category() && (
				(!isset($pattern_data["categories"])) || ( empty($pattern_data["categories"]))
			)){
				$pattern_data["categories"] = [$this->default_category];
			}

			if(!isset($pattern_data["source"]) || empty($pattern_data["source"])){
				$pattern_data["source"] = "plugin";
			}
			
		
			register_block_pattern( $pattern_data['slug'], $pattern_data );

		}

		return $this;
	}

	private function use_default_category() : bool{
		return isset($this->default_category) && $this->default_category;
	}

	public function load_patterns_files() : array | bool{

		if ( ! is_dir( $this->pattern_directory ) ) {
			return false;
		}

		$pattern_data = [];

		$files = (array) self::scandir( $this->pattern_directory, 'php', -1 );
		
		$default_headers = array(
			'title'         => 'Title',
			'slug'          => 'Slug',
			'description'   => 'Description',
			'viewportWidth' => 'Viewport Width',
			'inserter'      => 'Inserter',
			'categories'    => 'Categories',
			'keywords'      => 'Keywords',
			'blockTypes'    => 'Block Types',
			'postTypes'     => 'Post Types',
			'templateTypes' => 'Template Types',
		);

		$properties_to_parse = array(
			'categories',
			'keywords',
			'blockTypes',
			'postTypes',
			'templateTypes',
		);

		foreach ( $files as $file ) {
			$pattern = get_file_data( $file, $default_headers );

			if ( empty( $pattern['slug'] ) ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf(
						/* translators: 1: file name. */
						__( 'Could not register file "%s" as a block pattern ("Slug" field missing)' ),
						$file
					),
					'6.0.0'
				);
				continue;
			}

			if ( ! preg_match( '/^[A-z0-9\/_-]+$/', $pattern['slug'] ) ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf(
						/* translators: 1: file name; 2: slug value found. */
						__( 'Could not register file "%1$s" as a block pattern (invalid slug "%2$s")' ),
						$file,
						$pattern['slug']
					),
					'6.0.0'
				);
			}

			// Title is a required property.
			if ( ! $pattern['title'] ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf(
						/* translators: 1: file name. */
						__( 'Could not register file "%s" as a block pattern ("Title" field missing)' ),
						$file
					),
					'6.0.0'
				);
				continue;
			}

			// For properties of type array, parse data as comma-separated.
			foreach ( $properties_to_parse as $property ) {
				if ( ! empty( $pattern[ $property ] ) ) {
					$pattern[ $property ] = array_filter( wp_parse_list( (string) $pattern[ $property ] ) );
				} else {
					unset( $pattern[ $property ] );
				}
			}

			// Parse properties of type int.
			$property = 'viewportWidth';
			if ( ! empty( $pattern[ $property ] ) ) {
				$pattern[ $property ] = (int) $pattern[ $property ];
			} else {
				unset( $pattern[ $property ] );
			}

			// Parse properties of type bool.
			$property = 'inserter';
			if ( ! empty( $pattern[ $property ] ) ) {
				$pattern[ $property ] = in_array(
					strtolower( $pattern[ $property ] ),
					array( 'yes', 'true' ),
					true
				);
			} else {
				unset( $pattern[ $property ] );
			}

			$key = str_replace( trailingslashit($this->pattern_directory), '', $file );

			$pattern_data[ $key ] = $pattern;
		}

		//if ( $can_use_cached ) {
		//	$this->set_pattern_cache( $pattern_data );
		//}

		return $pattern_data;
	}
	

	private static function scandir( $path, $extensions = null, $depth = 0, $relative_path = '' ) {
		if ( ! is_dir( $path ) ) {
			return false;
		}

		if ( $extensions ) {
			$extensions  = (array) $extensions;
			$_extensions = implode( '|', $extensions );
		}

		$relative_path = trailingslashit( $relative_path );
		if ( '/' === $relative_path ) {
			$relative_path = '';
		}

		$results = scandir( $path );
		$files   = array();

		/**
		 * Filters the array of excluded directories and files while scanning theme folder.
		 *
		 * @since 4.7.4
		 *
		 * @param string[] $exclusions Array of excluded directories and files.
		 */
		$exclusions = (array) apply_filters( 'npe_scandir_exclusions', array( 'CVS', 'node_modules', 'vendor', 'bower_components' ) );

		foreach ( $results as $result ) {
			if ( '.' === $result[0] || in_array( $result, $exclusions, true ) ) {
				continue;
			}
			if ( is_dir( $path . '/' . $result ) ) {
				if ( ! $depth ) {
					continue;
				}
				$found = self::scandir( $path . '/' . $result, $extensions, $depth - 1, $relative_path . $result );
				$files = array_merge_recursive( $files, $found );
			} elseif ( ! $extensions || preg_match( '~\.(' . $_extensions . ')$~', $result ) ) {
				$files[ $relative_path . $result ] = $path . '/' . $result;
			}
		}

		return $files;
	}
}