<?php

namespace Govpack\Abstracts;

use Govpack\Collection\Collection;
use Govpack\Collection\Collectable;

abstract class Registry extends Collection {


	public function register( string|Collectable $item ) {

		if ( $this->exists( $item ) ) {
			$label = is_a( $item, '\Govpack\Collection\Collectable' ) ? $item->slug() : $item;
			throw new \Exception( sprintf( 'Trying to add duplicate Item (%s) to a registry.', $label ) );
		}

		$this->add( $item );
	}

	public function add( string|Collectable $item ) {
		$this->collection[ $item ] = $item;
	}
}
