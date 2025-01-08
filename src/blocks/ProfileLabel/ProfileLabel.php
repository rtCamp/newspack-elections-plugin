<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileLabel;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileLabel extends \Govpack\Blocks\ProfileField {

	public string $block_name = 'govpack/profile-label';

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileLabel' );
	}

	
	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	public function handle_render( array $attributes, string $content, WP_Block $block ) {
		gp_dump( $this->get_field() );
		?>
		<div <?php echo get_block_wrapper_attributes(); ?>>
			Label
		</div>
		<?php
	}

	public function show_block(): bool {
		return true;
		return $this->show_label() && $this->has_label();
	}

	public function show_label(): bool {
		$showLabel = ( isset( $this->context['govpack/showLabel'] ) 
			? $this->context['govpack/showLabel'] 
			: $this->context['govpack/showLabels']
		) ?? true;

		return $showLabel;
	}

	public function has_label(): bool {
		if (
			( $this->attributes['label'] === false ) ||
			( $this->attributes['label'] === '' ) ||
			( $this->attributes['label'] === null )
		) {
			return false;
		}

		return $this->has_label_from_attributes() || $this->has_label_from_context();
	}

	private function has_label_from_attributes(): bool {
		if (
			( $this->attributes['label'] === false ) ||
			( $this->attributes['label'] === '' ) ||
			( $this->attributes['label'] === null )
		) {
			return false;
		}

		return true;
	}

	private function has_label_from_context(): bool {
		return true;
	}
}
