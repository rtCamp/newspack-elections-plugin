<?php

namespace Govpack\Fields\FieldType;

class Phone extends Link {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'phone';

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Phone';



	public function variation_icon(): string {
		return 'phone';
	}

	public function value( $value ) {
		return $value;
	}
}
