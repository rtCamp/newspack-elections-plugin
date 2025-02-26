<?php

namespace Govpack\Abstracts;

use Govpack\Interfaces\Collection as InterfacesCollection;
use Govpack\Interfaces\Collectable;

abstract class Collection implements InterfacesCollection {

	public $collection = [];

	public function register( Collectable $item ) {

		if ( $this->exists( $item ) ) {
			throw new \Exception( sprintf( 'Trying to add Type that already exists (%s)', $item->slug ) );
		}

		$this->collection[ $item->slug ] = $item;
	}

	public function exists( Collectable|string $type ): bool {
		$slug = ( is_a( $type, Collectable::class ) ? $type->slug : $type );
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
