<?php

namespace Govpack;

use Govpack\Fields\FieldTypeRegistry;
use Govpack\Fields\FieldType;
use Govpack\Fields\FieldManager;

class Fields {

	private FieldTypeRegistry $types;
	
	public function __construct() {
		$this->types = FieldTypeRegistry::instance();
		$this->register_field_types();
	}

	public function register_field_types(): void {

		$types = [
			FieldType\Text::class,
			FieldType\Date::class,
			FieldType\Link::class,
			FieldType\Email::class,
			FieldType\Phone::class,
			FieldType\Taxonomy::class,
			FieldType\PostProperty::class,
		];

		foreach ( $types as $type ) {
			$this->types->register( new $type() );
		}
	}

	public function types(): array {
		return $this->types->all();
	}

	public function create_field_set() : FieldManager{
		return new FieldManager();
	}
}
