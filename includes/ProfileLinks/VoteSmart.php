<?php
namespace Govpack\ProfileLinks;

class VoteSmart extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'votesmart';

	/**
	 * @return string
	 *
	 * @psalm-return 'votesmart_id'
	 */
	public function meta_key() {
		return 'votesmart_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'VoteSmart'
	 */
	public function label() {
		return 'VoteSmart';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://justfacts.votesmart.org/candidate/biography/{votesmart_id}/'
	 */
	public function url_template() {
		return 'https://justfacts.votesmart.org/candidate/biography/{votesmart_id}/';
	} 
}
