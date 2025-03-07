<?php

namespace Govpack\Fields\FieldType;

class Email extends Link {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'email';

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Email';

	/**
	 * Output Formats
	 * 
	 * Formats the field can be output as
	 */
	public array $formats = [ 'link' ];


	public function get_variation_inner_blocks(): array {
		return [
			[ 'govpack/profile-field-link' ],
		];
	}


	public function variation_icon(): string {
		return 'email';
	}

	public function value( $value ) {
		return $value;
	}
}
