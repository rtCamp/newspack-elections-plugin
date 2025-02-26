<?php

namespace Govpack\Collection;

interface CollectionInterface {

	public function get( string $item ): Collectable|bool;

	public function register( Collectable $item );

	public function exists( string $item );

	public function all();

	public function to_array(): array;

	public function to_rest(): array;
}
