<?php


namespace Govpack\Fields;

use Govpack\Abstracts\Registry;
use Govpack\Fields\FieldType;


class FieldTypeRegistry extends Registry  {

	use \Govpack\Instance;

	public function __construct() {
		parent::__construct();
		$this->create_types();
	}

	public function create_types() {
		$this->register( new FieldType\Text() );
		$this->register( new FieldType\Date() );
		$this->register( new FieldType\Link() );
		$this->register( new FieldType\Taxonomy() );
		$this->register( new FieldType\Block() );
	}
}
