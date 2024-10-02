<?php
namespace Govpack\ProfileLinks;

class BallotPedia extends \Govpack\ProfileLinks\ProfileLink {

	protected string $slug = 'ballotpedia';

	/**
	 * @return string
	 *
	 * @psalm-return 'balletpedia_id'
	 */
	public function meta_key(): string {
		return 'balletpedia_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'Ballotpedia'
	 */
	public function label(): string {
		return 'Ballotpedia';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://ballotpedia.org/{balletpedia_id}'
	 */
	public function url_template(): string {
		return 'https://ballotpedia.org/{balletpedia_id}';
	}
}
