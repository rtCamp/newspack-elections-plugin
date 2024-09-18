<?php
namespace Govpack\ProfileLinks;

class Linkedin extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'linkedin';

	/**
	 * @return string
	 *
	 * @psalm-return 'linkedin'
	 */
	public function meta_key() {
		return 'linkedin';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'LinkedIn'
	 */
	public function label() {
		return 'LinkedIn';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://www.linkedin.com/in/{linkedin}/'
	 */
	public function url_template() {
		return 'https://www.linkedin.com/in/{linkedin}/';
	}
}
