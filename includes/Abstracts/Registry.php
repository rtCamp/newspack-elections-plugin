<?php

namespace Govpack\Abstracts;

use Govpack\Collection\Collection;
use Govpack\Collection\Collectable;

abstract class Registry extends Collection{


	public function register( Collectable $item ) {

		if ( $this->exists( $item ) ) {
			throw new \Exception( sprintf( 'Trying to add duplicate Item (%s) to a regsitry.', $item->slug() ) );
		}

		parent::add($item);
	}

	public function add( Collectable $item ) {
		// do nothing, cannot add directly
	}
}