<?php
namespace Govpack\ProfileLinks;

class OpenSecrets extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'opensecrets';

	/**
	 * @return string
	 *
	 * @psalm-return 'opensecrets_id'
	 */
	public function meta_key() {
		return 'opensecrets_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'OpenSecrets'
	 */
	public function label() {
		return 'OpenSecrets';
	}

	/**
	 * @return false
	 */
	public function enabled() {
		return false;
	}



}
