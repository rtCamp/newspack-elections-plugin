<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileRow;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileRow extends \Govpack\Blocks\ProfileField {

	public string $block_name = 'govpack/profile-row';


	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileRow' );
	}

	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	public function handle_render( array $attributes, string $content, \WP_Block $block ) {
		
		?>
		<div <?php echo get_block_wrapper_attributes(); ?>>
			<?php echo $content; ?>
		</div>
		<?php
	}

	public function show_block(): bool {
	
		if ( $this->should_hide_if_empty() && ( ! $this->has_field() || $this->get_value() ) ) {
			return false;
		}
	
		return true;
	}

	public function get_value(): string {

		if ( ! $this->has_field() ) {
			return '';
		}

		if ( ! $this->has_profile() ) {
			return '';
		}

		return $this->get_profile()->value( $this->get_field()->slug() );
	}

	public function should_hide_if_empty(): bool {
		return $this->attribute( 'hideFieldIfEmpty' );
	}

	public function variations(): array {

		$types  = $this->create_field_type_variations();
		$fields = $this->create_field_variations();

		return array_merge( $types, $fields );
	}

	public function create_field_variations(): array {

		$variations = [];
		
		foreach ( \Govpack\Profile\CPT::fields()->all() as $field ) {
			$variation = [
				'category'    => 'newspack-elections-profile-row-fields',
				'name'        => sprintf( 'profile-field-row-%s', $field->slug ),
				'title'       => $field->label,
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display Profile Field: %s' ),
					$field->label
				),
				'attributes'  => [
					'fieldType' => $field->type->slug,
					'fieldKey'  => $field->slug,
				],
				'isActive'    => [ 'fieldKey' ],
				'scope'       => [ 'inserter', 'block' ],
				'icon'        => $field->type->variation_icon(),
			];

			$variations[] = $variation;
		}

		return $variations;
	}


	public function create_field_type_variations(): array {
		$types      = \Govpack\Profile\CPT::get_field_types();
		$variations = [];

		foreach ( $types as $type ) {
			$variation = [
				'category'    => 'newspack-elections-profile-row-type',
				'name'        => sprintf( 'profile-field-%s', $type->slug ),
				'title'       => sprintf( 'Profile %s Row', ucfirst( $type->label ) ),
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display a profile row of type: %s' ),
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
