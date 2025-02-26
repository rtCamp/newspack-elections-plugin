<?php

namespace Govpack\Collection;

abstract class Collectable implements CollectableInterface {

	protected string $slug;

	public function slug(): string {
		return $this->slug;
	}

	abstract function to_array(): array;
	
	abstract function to_rest(): array; 
}
