<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileFieldLink;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileFieldLink extends \Govpack\Blocks\ProfileFieldText\ProfileFieldText {

	public string $block_name = 'govpack/profile-field-link';
	public $template          = 'profile';

	private $show       = null;
	private $profile    = null;
	protected $plugin;

	private string $default_variation;

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileFieldLink' );
	}

	

	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	public function handle_render( array $attributes, string $content, WP_Block $block ) {
		?>
		<div <?php echo get_block_wrapper_attributes(); ?>>
			Link Field
		</div>
		<?php
	}  


	public function variations(): array {
		return $this->create_field_variations();
	}

	public function create_field_variations(): array {

		$variations = [];
		
		foreach ( \Govpack\Profile\CPT::fields()->all() as $field ) {
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
					'fieldKey'  => $field->slug,
				],
				'isActive'    => [ 'fieldKey' ],
				'scope'       => [ 'inserter' ],
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
}
