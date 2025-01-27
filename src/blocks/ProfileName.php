<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileName extends \Govpack\Blocks\ProfileFieldText {

	public string $block_name = 'govpack/profile-name';
	public $field_type        = 'block';
	

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileName' );
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
			<?php echo $this->output(); ?>
		</div>
		<?php
	}

	public function variations(): array {
		return [];
	}
}
