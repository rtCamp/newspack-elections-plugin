<?php

namespace Govpack\Fields\FieldType;

class Date extends Text {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'date';

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Date';

	
	public function variation_icon(): string {
		return 'calendar';
	}
}
