<?php
namespace Govpack\ProfileLinks;

class WikiPedia extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'wikipedia';

	/**
	 * @return string
	 *
	 * @psalm-return 'wikipedia_id'
	 */
	public function meta_key() {
		return 'wikipedia_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'WikiPedia'
	 */
	public function label() {
		return 'WikiPedia';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://wikipedia.org/wiki/{wikipedia_id}/'
	 */
	public function url_template() {
		return 'https://wikipedia.org/wiki/{wikipedia_id}/';
	} 
}
