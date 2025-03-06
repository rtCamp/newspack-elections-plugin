<?php

namespace Govpack\Abstracts;

abstract class Registry {

	private array $items;

	public function __construct(){
		$this->items = array();
	}

	public function all() : array {
		return $this->items;
	}

	public function register( mixed $item, string | null $name = null ) {

		if ( $this->exists( $item ) ) {
			$label = is_a( $item, '\Govpack\Collection\Collectable' ) ? $item->slug() : $item;
			throw new \Exception( sprintf( 'Trying to add duplicate Item (%s) to a registry.', $label ) );
		}
		
		$this->add($item, $name);
	}

	protected function add( mixed $item, string | null $name = null ) {
		if(!$name){
			$this->items[] = $item;
		} else {
			$this->items[$name] = $item;
		}
	}

	public function exists( mixed $item ): bool {


		// if the passed item is used as a key on the items collection, check it exists and return true
		if($this->isset($item)){
			return true;
		}

		// if the passed item exists with the array, true return
		if(in_array($item, $this->all())){
			return true;
		}

		// no matches available so false
		return false;
	}	

	public function isset( mixed $key ): bool {
		$items = $this->all();
		return isset($items[$key]);
	}

	public function get( string $item ): mixed {
		if ( $this->exists( $item ) ) {
			return $this->items[ $item ];
		}

		return null;
	}
}	
