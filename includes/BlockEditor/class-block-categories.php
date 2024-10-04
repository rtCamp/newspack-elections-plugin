<?php

namespace Govpack\Core\BlockEditor;


class Block_Categories {

	private $block_categories = array();

	public function add_hooks() {
		add_filter( 'block_categories_all', array( $this, 'register_block_categories' ) );
	}

	public function add( string $slug, string $label ): self {
		$this->block_categories[ $slug ] = array(
			'title' => $label,
		);

		return $this;
	}

	public function register_block_categories( $categories ) {
		foreach ( $this->block_categories as $slug => $args ) {
			$categories[] = array(
				'slug' => $slug,
				...$args,
			);
		}
		return $categories;
	}
}
