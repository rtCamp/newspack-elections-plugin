<?php

namespace Govpack\Fields;

use Govpack\Profile\Profile;

class BiographyField extends Field {

	/**
	 * Field Source
	 * 
	 * Where the profile sources the data. 1 of meta, term, post
	 */
	public string $source = 'post';


	/**
	 * Source Key 
	 * 
	 * Key to use as locator for the source
	 */
	public null|string $source_key = "post_excerpt";


	/**
	 * Properties to include in array
	 * 
	 * Array of property names that will be included when transformed to an array
	 */
	protected array $to_array = [ 'slug', 'label', 'type', 'group', 'source_key', 'source' ];

	public function key( string $key ): self {
		$this->source_key = $key;
		return $this;
	}

	public function raw( Profile $model ) {

		if ( $this->source === 'meta' ) {
			return trim( $model->post->__get( $this->meta_key ) );
		}

		if ( $this->source === 'post' ) {
			$excerpt = trim( $model->post->{$this->source_key} );

			$excerpt = apply_filters( 'get_the_excerpt', $excerpt, $model->post );
			$excerpt = apply_filters( 'the_excerpt', $excerpt );

			return $excerpt;
		}

		return 'unknown source';
	}



}
