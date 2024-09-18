<?php
namespace Govpack\ProfileLinks;

class BallotPedia extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'ballotpedia';

	/**
	 * @return string
	 *
	 * @psalm-return 'balletpedia_id'
	 */
	public function meta_key() {
		return 'balletpedia_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'Ballotpedia'
	 */
	public function label() {
		return 'Ballotpedia';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://ballotpedia.org/{balletpedia_id}'
	 */
	public function url_template() {
		return 'https://ballotpedia.org/{balletpedia_id}';
	}
}
