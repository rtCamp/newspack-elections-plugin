<?php

namespace Govpack\BlockEditor;


class BlockCategories {

	private $block_categories = array();

	public function add_hooks() {
		add_filter( 'block_categories_all', array( $this, 'register_block_categories' ) );
	}

	public function add( array|string $slug_or_array, ?string $label = null): self {

		if(is_array($slug_or_array)){
			
			foreach($slug_or_array as $slug => $label){
				$this->block_categories[ $slug ] = array(
					'title' => $label,
				);
			}

		} else {

			$slug = $slug_or_array;
			if(!$label){
				$label = $slug;
			}

			$this->block_categories[ $slug ] = array(
				'title' => $label,
			);
		}

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
