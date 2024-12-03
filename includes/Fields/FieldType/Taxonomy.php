<?php

namespace Govpack\Fields\FieldType;

class Taxonomy extends \Govpack\Fields\FieldType {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'text';

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Text';

	/**
	 * Type Icon
	 * 
	 * An Icon to use for the Variation
	 */
	public function variation_icon(): string {
		return 'text';
	}

	public function get_value_for_model(){
		
	}
}
