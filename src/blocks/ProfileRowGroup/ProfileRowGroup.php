<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\ProfileRowGroup;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileRowGroup extends \Govpack\Blocks\ProfileRow\ProfileRow {

	public string $block_name = 'govpack/profile-row-group';


	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileRowGroup' );
	}

}
