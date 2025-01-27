<?php

namespace Govpack\Fields;

use Govpack\Profile\Profile;

class PostField extends Field {

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
	public null|string $source_key = null;


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

	public function __construct( string $slug, string $label, FieldType|string|null $type = null ) {
	
		parent::__construct( $slug, $label, 'block' );
	}


	public function raw( Profile $model ) {

		if ( $this->source !== 'post' ) {
			return 'incompatible source';
		}

		$value = trim( $model->post->{$this->source_key} );

		if ( \method_exists( $this, $this->source_key ) ) {
			return call_user_func( [ $this, $this->source_key ], $value, $model );
		}

		return $value;
	}

	public function post_excerpt( $value, $model ) {
		$value = apply_filters( 'get_the_excerpt', $value, $model->post );
		$value = apply_filters( 'the_excerpt', $value );
		return $value;
	}

	public function post_title( $value, $model ) {
		$value = get_the_title( $model->post );
		return $value;
	}
}
