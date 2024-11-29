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

	public function variation_icon(): string {
		return 'text';
	}
}
