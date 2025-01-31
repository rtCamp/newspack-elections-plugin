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
	public FieldTypeRegistry $types;

	public function get( string $item ): Field|bool {
		return parent::get( $item );
	}

	public function __construct( FieldTypeRegistry $types ) {
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

	public function find( string $prop, mixed $value ): array {
		return array_filter(
			$this->collection,
			function ( $field ) use ( $prop, $value ) {
				if ( ! isset( $field->$prop ) ) {
					return false;
				}
				return $field->$prop === $value;
			}
		);
	}

	public function get_types(): array {
		return $this->types->all();
	}

	public function of_type( $type ): array {
		return array_filter(
			$this->collection,
			function ( $field ) use ( $type ) {
				return $field->type->slug === $type;
			}
		);
	}

	public function of_format( $format ): array {
		return array_filter(
			$this->collection,
			function ( $field ) use ( $format ) {
				return in_array( $format, $field->type->formats );
			}
		);
	}
}
