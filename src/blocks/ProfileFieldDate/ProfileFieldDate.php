<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileFieldDate;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileFieldDate extends \Govpack\Blocks\ProfileFieldText\ProfileFieldText {

	public string $block_name = 'govpack/profile-field-date';
	public $template          = 'profile';

	public $field_type  = 'date';
	private $show       = null;
	private $profile    = null;
	private $attributes = [];
	protected $plugin;
	private string $default_variation;

	
	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileFieldDate' );
	}

	

	public function variations(): array {

		//$types  = $this->create_field_type_variations();
		$fields = $this->create_field_variations();

		return array_merge( [], $fields );
	}

	

	public function create_field_type_variations(): array {
		$types      = \Govpack\Profile\CPT::get_field_types();
		$variations = [];

		foreach ( $types as $type ) {
			$variation = [
				'category'    => 'govpack-profile-field',
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
			];

			$variations[] = $variation;
		}

		return $variations;
	}
}
