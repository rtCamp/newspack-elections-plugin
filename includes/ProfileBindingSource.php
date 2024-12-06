<?php

namespace Govpack;

class ProfileBindingSource extends Abstracts\BlockBindingSource {

	public function __construct() {
		parent::__construct( 'govpack/profile', 'Govpack Profile Field' );
	}

	function contexts(): array {
		return [ 'govpack/profileId' ];
	}
	
	function callback( array $source_args, \WP_Block $block_instance, string $attribute_name ): mixed {
		return 'bound';
	}
}
