<?php

namespace Govpack\Collection;

abstract class Collection implements CollectionInterface {

	public $collection = [];

	public function add( Collectable $item ) {
		$this->collection[ $item->slug() ] = $item;
	}

	public function exists( Collectable|string $type ): bool {
		$slug = ( is_a( $type, Collectable::class ) ? $type->slug() : $type );
		return isset( $this->collection[ $slug ] );
	}

	public function get( string $item ): bool|Collectable {
		if ( $this->exists( $item ) ) {
			return $this->collection[ $item ];
		}

		return false;
	}


	public function all(): array {
		return $this->collection;
	}

	public function to_array(): array {

		$arr = [];

		foreach ( $this->collection as $item ) {
			$arr[] = $item->to_array();
		}

		return $arr;
	}

	public function to_rest(): array {
		
		return \array_map(
			function ( $item ) {
				return $item->to_rest();
			}, 
			array_values( $this->all() ) 
		);
	}
}
