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

	/**
	 * Output Formats
	 * 
	 * Formats the field can be output as
	 */
	public array $formats = [ 'text', 'date' ];

	
	public function variation_icon(): string {
		return 'calendar';
	}

	public function format( $value ) {
		// The JS saves the timestamp with milliseconds, we only want it with seconds so divide by 1000 to remove
		$timestamp = intval( $value );
		return ( $timestamp / 1000 );
	}

	public function get_variation_inner_blocks(): array {
		return [
			[ 'govpack/profile-field-date' ],
		];
	}
}
