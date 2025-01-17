<?php

namespace Govpack\Fields;

use Govpack\Fields\FieldType;
use Govpack\Fields\FieldTypeRegistry;
use Govpack\Profile\Profile;

class Field extends \Govpack\Abstracts\Collectable implements \Govpack\Interfaces\Collectable {

	/**
	 * Field Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug;

	/**
	 * Field Label
	 * 
	 * Human readable label for fields
	 */
	public string $label;

	/**
	 * Field Type
	 * 
	 * Type of field. Used for determining the input view and what blocks can output this field.
	 */
	public FieldType $type;

	/**
	 * Field Group
	 * 
	 * The Group the field belongs to. Controls where the field is output in the admin.
	 */
	public null|string $group = null;

	/**
	 * Field Source
	 * 
	 * Where the profile sources the data. 1 of meta, term, post
	 */
	public string $source = 'meta';

	/**
	 * Meta Key 
	 * 
	 * Metakey to use as a source
	 */
	public null|string $meta_key = null;

	/**
	 * Default Value  
	 * 
	 * Metakey to use as a source
	 */
	public null|string $default = '';

	/**
	 * Properties to include in array
	 * 
	 * Array of property names that will be included when transformed to an array
	 */
	protected array $to_array = [ 'slug', 'label', 'type', 'group', 'meta_key', 'source' ];

	/**
	 * Construct the profile field
	 */
	public function __construct( string $slug, string $label, FieldType|string|null $type = null ) {
		$this->slug     = $slug;
		$this->label    = $label;
		$this->meta_key = $this->slug;

		$this->set_type( $type );
	}

	public function set_type( FieldType|string|null $type ) {

		if ( is_a( $type, '\Govpack\Field\FieldType' ) ) {
			$this->type = $type;
		} elseif ( is_string( $type ) ) {
			$this->type = FieldTypeRegistry::instance()->get( $type );
		}

		if ( ! isset( $this->type ) ) {
			$this->type = FieldTypeRegistry::instance()->get( 'text' );
		}
	}

	public function group( string $group ): self {
		$this->group = $group;
		return $this;
	}

	public function meta( string $meta_key ): self {
		$this->meta_key = $meta_key;
		return $this;
	}

	public function to_array(): array {

		$val = [];

		foreach ( $this->to_array as $key ) {
			if ( property_exists( $this, $key ) ) {
				if ( empty( $this->$key ) ) {
					continue;
				}
				$val[ $key ] = $this->$key;
			}
		}

		return $val;
	}

	
	public function format( $raw_value ) {
		return $this->type->format( $raw_value );
	}

	public function raw( Profile $model ) {

		if ( $this->source === 'meta' ) {
			return trim( $model->post->__get( $this->meta_key ) );
		}


		return 'unknown source';
	}

	public function value( Profile $model ) {
		return $this->format( $this->raw( $model ) );
	}
}
