<?php

namespace Govpack\Fields\FieldType;

class Email extends Link {

	/**
	 * Type Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug = 'email';

	/**
	 * Type Label
	 * 
	 * Human readable label for types
	 */
	public string $label = 'Email';


	public array $formats = [ 
		[
			'value' => 'label',
			'label' => 'Label',
		],
		[
			'value' => 'url',
			'label' => 'Email',
		],
	];

	public function variation_icon(): string {
		return 'email';
	}

	public function value( $value ) {
		return $value;
	}
}
