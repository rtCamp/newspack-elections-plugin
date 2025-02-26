<?php

namespace Govpack\Fields;

use Govpack\Collection\CollectableInterface;
use Govpack\Collection\Collectable;

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

	public function format( $value ) {
		return $value;
	}

	public function __toString() {
		return $this->slug;
	}

	public function to_array(): array {
		return [
			'slug'  => $this->slug,
			'label' => $this->label,
		];
	}

	public function to_rest(): array {
		return $this->to_array();
	}
}
