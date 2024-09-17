<?php
namespace Govpack\ProfileLinks;

class OpenSecrets extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'opensecrets';

	public function meta_key() {
		return 'opensecrets_id';
	}

	public function label() {
		return 'OpenSecrets';
	}

	public function enabled() {
		return false;
	}



}
