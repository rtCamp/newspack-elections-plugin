<?php


namespace Govpack\Fields;

use Govpack\Fields\FieldType;

use Govpack\Abstracts\Collection;
use Govpack\Interfaces\Collection as CollectionInterface;
use Govpack\Interfaces\Collectable;

class FieldTypeRegistry extends Collection implements CollectionInterface {

	use \Govpack\Instance;

	public function __construct() {
		$this->collection = [];
		$this->create_types();
	}

	public function create_types() {
		$this->register( new FieldType\Text() );
		$this->register( new FieldType\Date() );
		$this->register( new FieldType\Link() );
		$this->register( new FieldType\Taxonomy() );
	}
}
