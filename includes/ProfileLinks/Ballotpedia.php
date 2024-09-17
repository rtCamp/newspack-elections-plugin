<?php
namespace Govpack\ProfileLinks;

class BallotPedia extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'ballotpedia';

	public function meta_key() {
		return 'balletpedia_id';
	}

	public function label() {
		return 'Ballotpedia';
	}

	public function url_template() {
		return 'https://ballotpedia.org/{balletpedia_id}';
	}
}
