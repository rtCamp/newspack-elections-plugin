<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack;

use Govpack\BlockEditor\BlockCategories;
use Govpack\BlockEditor\PatternCategories;

class BlockEditor {


	private BlockCategories $block_categories;
	private PatternCategories $pattern_categories;

	public function hooks(){

	}

	public function block_categories() : BlockCategories {
		if ( ! isset( $this->block_categories ) ) {
			$this->block_categories = new BlockCategories();
			$this->block_categories->add_hooks();
		}
		return $this->block_categories;
	}

	public function pattern_categories() {
		if ( ! isset( $this->pattern_categories ) ) {
			$this->pattern_categories = new PatternCategories();
		}
		return $this->pattern_categories;
	}

}
