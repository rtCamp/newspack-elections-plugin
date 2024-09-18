<?php
namespace Govpack\ProfileLinks;

class OpenStates extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'openstates';

	/**
	 * @return string
	 *
	 * @psalm-return 'openstates_id'
	 */
	public function meta_key() {
		return 'openstates_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'OpenStates'
	 */
	public function label() {
		return 'OpenStates';
	}

	/**
	 * @return false
	 */
	public function enabled() {
		return false;
	}
}
