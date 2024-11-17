<?php

namespace Govpack;

class ProfileFieldsManager {

	/**
	 * Field Groups
	 * 
	 * Allowed Groups in which a field can appear.
	 */
	const GROUPS = [
		"ABOUT" => "about"
	];

	/**
	 * Collection of fields for the profile;
	 */
	public array $fields = [];


	public function add_fields(ProfileField|array $fields_input){
		if(is_array($fields_input)){
			foreach($fields_input as $field){
				$this->add($field);
			}
		} else { 
			$this->add($fields_input);
		}
	}

	public function add(ProfileField $field){

		if($this->exists($field)){
			throw new \Exception(sprintf("Trying to add Field that already exists (%s)", $field->slug));
		}

		$this->fields[$field->slug] = $field;
	}

	public function exists(ProfileField | string $field) : bool {
		
		$slug = ( is_a($field, ProfileField::class) ? $field->slug : $field );
		return isset($this->fields[$slug]);
	}

	public function to_array() : array {

		$arr = [];

		foreach($this->fields as $field){
			$arr[] = $field->to_array();
		}

		return $arr;
	}

	public function get_by_source(string $source) : array {
		return array_filter($this->fields, function($field) use ($source) {
			return $field->source === $source;
		});
	}

	public function get_types() : array {

		$types = [];

		foreach($this->fields as $field){
			$type = $field->type;

			if(in_array($type, $types)){
				continue;
			}

			$types[] = $type;
		}

		return $types;
	}
	
}