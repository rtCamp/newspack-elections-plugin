<?php
namespace Govpack\ProfileLinks;

class Fec extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'fec';

	/**
	 * @return string
	 *
	 * @psalm-return 'fec_id'
	 */
	public function meta_key() {
		return 'fec_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'Federal Election Comission'
	 */
	public function label() {
		return 'Federal Election Comission';
	}

	/**
	 * @return false
	 */
	public function enabled() {
		return false;
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://www.fec.gov/data/candidate/{fec_id}/'
	 */
	public function url_template() {
		return 'https://www.fec.gov/data/candidate/{fec_id}/';
	}
}
