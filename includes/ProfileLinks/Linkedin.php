<?php
namespace Govpack\ProfileLinks;

class Linkedin extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'linkedin';

	public function meta_key() {
		return 'linkedin';
	}

	public function label() {
		return 'LinkedIn';
	}

	public function url_template() {
		return 'https://www.linkedin.com/in/{linkedin}/';
	}
}
