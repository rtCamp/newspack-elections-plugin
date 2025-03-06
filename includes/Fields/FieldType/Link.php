<?php

namespace Govpack\Fields\FieldType;

class Link extends \Govpack\Fields\FieldType {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'link';
	const SLUG = "link";
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


	public function get_variation_inner_blocks(): array {
		return [
			[ 'govpack/profile-label', [] ],
			[ 'govpack/profile-field-link', [ 'fieldType' => 'link' ] ],
		];
	}


	public function variation_icon(): string {
		return 'admin-links';
	}

	public function value( $value ) {
		return $value;
	}
}
