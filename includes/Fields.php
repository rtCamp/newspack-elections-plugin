<?php

namespace Govpack;

use Govpack\Fields\FieldTypeRegistry;
use Govpack\Fields\FieldType;

class Fields {

	private FieldTypeRegistry $registry;

	public function __construct() {
		$this->registry = FieldTypeRegistry::instance();
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
			$this->registry->register( new $type() );
		}
	}

	public function types(): array {
		return $this->registry->all();
	}
}
