<?php

namespace Govpack\Interfaces;

interface Collectable {

	public function slug(): string;

	public function to_array(): array;

	public function to_rest(): array;
}
