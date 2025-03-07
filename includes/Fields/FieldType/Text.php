<?php

namespace Govpack\Fields\FieldType;

class Text extends \Govpack\Fields\FieldType {

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
	 * Output Formats
	 * 
	 * Formats the field can be output as
	 */
	public array $formats = [ 'text' ];

	/**
	 * Type Icon
	 * 
	 * An Icon to use for the Variation
	 */
	public function variation_icon(): string {
		return 'text';
	}

	public function get_variation_inner_blocks(): array {
		return [
			[ 'govpack/profile-field-' . $this->slug, [ 'fieldType' => $this->slug ] ],
		];
	}
}
