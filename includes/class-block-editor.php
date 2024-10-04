<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Core;

use Govpack\Core\BlockEditor\Block_Categories;
use Govpack\Core\BlockEditor\Pattern_Categories;

class Block_Editor {


	private Block_Categories $block_categories;
	private Pattern_Categories $pattern_categories;

	public function hooks(){

	}

	public function block_categories() : Block_Categories {
		if ( ! isset( $this->block_categories ) ) {
			$this->block_categories = new Block_Categories();
			$this->block_categories->add_hooks();
		}
		return $this->block_categories;
	}

	public function pattern_categories() {
		if ( ! isset( $this->pattern_categories ) ) {
			$this->pattern_categories = new Pattern_Categories();
		}
		return $this->pattern_categories;
	}

}
