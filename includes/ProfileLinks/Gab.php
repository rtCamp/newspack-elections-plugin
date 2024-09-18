<?php
namespace Govpack\ProfileLinks;

class Gab extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'gab';

	/**
	 * @return string
	 *
	 * @psalm-return 'gab'
	 */
	public function meta_key() {
		return 'gab';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'Gab'
	 */
	public function label() {
		return 'Gab';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://gab.com/{gab}/'
	 */
	public function url_template() {
		return 'https://gab.com/{gab}/';
	}
}
