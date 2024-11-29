<?php

namespace Govpack\Fields;

abstract class FieldType {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug;

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label;


	public function get_variation_inner_blocks(): array {
		return [
			[ 'govpack/profile-label', [] ],
			[ 'core/paragraph', [] ],
		];
	}

	abstract public function variation_icon(): string;
}
