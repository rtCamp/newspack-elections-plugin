<?php
namespace Govpack\ProfileLinks;

class Google extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'google';

	/**
	 * @return string
	 *
	 * @psalm-return 'google_entity_id'
	 */
	public function meta_key() {
		return 'google_entity_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'Google Trends'
	 */
	public function label() {
		return 'Google Trends';
	}

	/**
	 * @return string
	 */
	public function prep_meta_value( $meta_value ) {
		return rawurlencode( $meta_value );
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://trends.google.com/trends/explore?date=all&q={google_entity_id}'
	 */
	public function url_template() {
		///m/01rbs3 = %2Fm%2F01rbs3
		return 'https://trends.google.com/trends/explore?date=all&q={google_entity_id}';
	} 
}
