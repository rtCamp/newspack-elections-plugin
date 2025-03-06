<?php

namespace Govpack\Fields\FieldType;

class Post extends \Govpack\Fields\FieldType {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'block';

	
	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Block';

	/**
	 * Output Formats
	 * 
	 * Formats the field can be output as
	 */
	public array $formats = [];

	/**
	 * Type Icon
	 * 
	 * An Icon to use for the Variation
	 */
	public function variation_icon(): string {
		return '';
	}

	public function get_variation_inner_blocks(): array {
		return [];
	}
}
