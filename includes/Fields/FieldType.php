<?php

namespace Govpack\Fields;

use Govpack\Interfaces\Collectable as CollectableInterface;
use Govpack\Abstracts\Collectable;

abstract class FieldType extends Collectable implements CollectableInterface {

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

	public function value( $value ) {
		return $value;
	}

	public function __toString() {
		return $this->slug;
	}
}
