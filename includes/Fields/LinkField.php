<?php

namespace Govpack\Fields;

use Govpack\Profile\Profile;

class LinkField extends Field {


	/**
	 * Link Text
	 * 
	 * The Group the field belongs to. Controls where the field is output in the admin.
	 */
	public string $link_text;

	/**
	 * Properties to include in array
	 * 
	 * Array of property names that will be included when transformed to an array
	 */
	protected array $to_array = [ 'slug', 'label', 'type', 'group', 'meta_key', 'link_text' ];

	/**
	 * Construct the profile field
	 */
	public function __construct( string $slug, string $label, FieldType|string|null $type = null ) {
		$this->slug     = $slug;
		$this->label    = $label;
		$this->meta_key = $this->slug;

		$this->set_type( 'link' );
	}
	
	public function link_text( string $link_text ): self {
		$this->link_text = $link_text;
		return $this;
	}

	public function format($raw_value){

		if(!$this->is_value_valid($raw_value)){
			return [];
		}
		
		return [
			"url" => $raw_value,
			"linkText" => $this->link_text
		];
	}

	public function is_value_valid($raw_value){

		if($raw_value === ""){
			return false;
		}

		return true;
	}
}
