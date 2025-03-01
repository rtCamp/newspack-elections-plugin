<?php

namespace Govpack\Abstracts;

use Govpack\Collection\Collection;
use Govpack\Collection\Collectable;

abstract class Registry {

	public Collection $collection;

	public function __construct() {
		$this->collection = new Collection();
	}

	public function get( string $item ) : Collectable|bool {
		return $this->collection->get( $item );
	}

	public function all(  ) : array {
		return $this->collection->all();
	}

	public function register( Collectable $item ) {

		if ( $this->collection->exists( $item ) ) {
			throw new \Exception( sprintf( 'Trying to add duplicate Item (%s) to a regsitry.', $item->slug() ) );
		}

		$this->collection->add($item);
	}
}