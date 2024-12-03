<?php

namespace Govpack\Abstracts;

use Govpack\Interfaces\Collectable as InterfacesCollectable;

abstract class Collectable implements InterfacesCollectable {

	protected string $slug;

	public function slug() : string {
		return $this->slug;
	}

}