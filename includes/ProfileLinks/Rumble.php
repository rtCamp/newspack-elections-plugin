<?php
namespace Govpack\ProfileLinks;

class Rumble extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'rumble';

	/**
	 * @return string
	 *
	 * @psalm-return 'rumble'
	 */
	public function meta_key() {
		return 'rumble';
	}
	/**
	 * @return string
	 *
	 * @psalm-return 'Rumble'
	 */
	public function label() {
		return 'Rumble';
	}
	/**
	 * @return string
	 *
	 * @psalm-return 'https://rumble.com/user/{rumble}/'
	 */
	public function url_template() {
		return 'https://rumble.com/user/{rumble}/';
	}
}
