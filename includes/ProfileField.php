<?php

namespace Govpack;

class ProfileField {



	/**
	 * Field Slug
	 * 
	 * Machine readable name to reference the field
	 */
	public string $slug;

	/**
	 * Field Label
	 * 
	 * Human readable label for fields
	 */
	public string $label;

	/**
	 * Field Type
	 * 
	 * Type of field. Used for determining the input view and what blocks can output this field.
	 */
	public string $type = "text";

	/**
	 * Field Group
	 * 
	 * The Group the field belongs to. Controls where the field is output in the admin.
	 */
	public null|string $group = null;

	/**
	 * Field Source
	 * 
	 * Where the profile sources the data. 1 of meta, term, post
	 */
	public string $source = "meta";

	/**
	 * Meta Key 
	 * 
	 * metakey to use as a source
	 */
	public null|string $meta_key = null;

	/**
	 * Properties to include in array
	 * 
	 * Array of property names that will be included when transformed to an array
	 */
	protected array $to_array = ["slug", "label", "type", "group", "meta_key", "source"];

	/**
	 * Construct the profile field
	 */
	public function __construct(string $slug, string $label, string $type = "text"){
		$this->slug = $slug;
		$this->label = $label;
		$this->type = $type;
		$this->meta_key = $this->slug;
	}

	public function group(string $group) : self {
		$this->group = $group;
		return $this;
	}

	public function meta(string $meta_key) : self {
		$this->meta_key = $meta_key;
		return $this;
	}

	public function to_array() : array {

		$val = [];

		foreach($this->to_array as $key){
			if(property_exists($this, $key )){
				if(empty($this->$key)){
					continue;
				}
				$val[$key] = $this->$key;
			}
		}

		return $val;
	}
	
}