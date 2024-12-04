<?php

namespace Govpack\Profile;

use WP_Post;

class Profile {

	public WP_Post $post;

	public array $data;
	public array $values;

	public function __construct( WP_Post $post ) {
		$this->post = $post;
		$this->values = [];
	}

	public static function get( $id ) {
		return new self( get_post( $id ) );
	}

	public function data() {

		if ( ! isset( $this->data ) ) {
			$this->data = $this->populate();
		}

		return $this->data;
	}
	
	public function populate(): array {

		$data = [];
	
		foreach ( CPT::fields()->all() as $field ) {

			$data[ $field->slug() ] = $this->raw_val( $field->slug() );
			
		}

		return $data;
	}

	public function raw_val( string $key ) {
		
		$field                        = CPT::fields()->get( $key );
		$this->data[ $field->slug() ] = $field->raw( $this );

		return $this->data[ $key ];
	}

	public function value(string $key){

		if(!isset($this->values[ $key ])){
			$field = CPT::fields()->get( $key );
			$this->values[ $field->slug() ] =  $field->value( $this );
		}

		return $this->values[ $key ];
	}

	public function values() : array {

		foreach ( CPT::fields()->all() as $field ) {
			$this->values[ $field->slug() ] = $this->value( $field->slug() );
		}

		return $this->values;
	}
}
