<?php
namespace Govpack\ProfileLinks;

class GovTrack extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'govtrack';

	/**
	 * @return string
	 *
	 * @psalm-return 'govtrack_id'
	 */
	public function meta_key() {
		return 'govtrack_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'GovTrack'
	 */
	public function label() {
		return 'GovTrack';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://www.govtrack.us/congress/members/{govtrack_id}/'
	 */
	public function url_template() {
		return 'https://www.govtrack.us/congress/members/{govtrack_id}/';
	}
}
