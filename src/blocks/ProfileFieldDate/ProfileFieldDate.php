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

	public $field_type = 'date';

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileFieldDate' );
	}

	
	public function handle_render( array $attributes, string $content, WP_Block $block ) {
		?>
		<div <?php echo get_block_wrapper_attributes(); ?>>
			Date Field
		</div>
		<?php
	}
	public function variations(): array {
		return $this->create_field_variations();
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
