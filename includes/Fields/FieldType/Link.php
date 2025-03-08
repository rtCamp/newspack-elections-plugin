<?php

namespace Govpack\Fields\FieldType;

class Link extends \Govpack\Fields\FieldType {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'link';

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Link';

	/**
	 * Output Formats
	 * 
	 * Formats the field can be output as
	 */
	public array $formats = [ 'link' ];

	/**
	 * Default Block
	 * 
	 * Block used to output the field by default
	 */
	public ?string $default_block = "govpack/profile-field-link";


	public function variation_icon(): string {
		return 'admin-links';
	}

	public function value( $value ) {
		return $value;
	}
}
