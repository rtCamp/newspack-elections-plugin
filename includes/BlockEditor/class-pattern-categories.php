<?php

namespace Govpack\Core\BlockEditor;


class Pattern_Categories {

	public function add( string $slug, string $label ): self {

		$args = array(
			'label' => $label,
		);

		register_block_pattern_category(
			$slug,
			$args
		);
		return $this;
	}
}
