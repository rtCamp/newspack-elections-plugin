<?php
namespace Govpack\ProfileLinks;

class VoteView extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'voteview';

	/**
	 * @return string
	 *
	 * @psalm-return 'icpsr_id'
	 */
	public function meta_key() {
		return 'icpsr_id';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'VoteView'
	 */
	public function label() {
		return 'VoteView';
	}

	/**
	 * @return string
	 *
	 * @psalm-return 'https://voteview.com/person/{icpsr_id}/'
	 */
	public function url_template() {
		return 'https://voteview.com/person/{icpsr_id}/';
	} 
}
