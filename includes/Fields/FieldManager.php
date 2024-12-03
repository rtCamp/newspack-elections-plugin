<?php

namespace Govpack\Fields;



class FieldManager extends \Govpack\Abstracts\Collection implements \Govpack\Interfaces\Collection {

	/**
	 * Field Groups
	 * 
	 * Allowed Groups in which a field can appear.
	 */
	const GROUPS = [
		'ABOUT' => 'about',
	];

	/**
	 * Collection of types used by fields;
	 */
	public FieldTypes $types;


	public function __construct(FieldTypes $types) {
		$this->types = $types;
	}	

	
	public function register_fields( Field|array $fields_input ) {
		if ( is_array( $fields_input ) ) {
			foreach ( $fields_input as $field ) {
				$this->register( $field );
			}
		} else { 
			$this->register( $fields_input );
		}
	}

	public function to_array(): array {

		$arr = [];

		foreach ( $this->collection as $field ) {
			$arr[] = $field->to_array();
		}

		return $arr;
	}

	public function get_by_source( string $source ): array {
		return array_filter(
			$this->collection,
			function ( $field ) use ( $source ) {
				return $field->source === $source;
			}
		);
	}

	public function get_types(): array {
		return $this->types->all();
	}
}
