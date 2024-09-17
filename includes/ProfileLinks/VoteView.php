<?php
namespace Govpack\ProfileLinks;

class VoteView extends \Govpack\ProfileLinks\ProfileLink {

	protected $slug = 'voteview';

	public function meta_key() {
		return 'icpsr_id';
	}

	public function label() {
		return 'VoteView';
	}

	public function url_template() {
		return 'https://voteview.com/person/{icpsr_id}/';
	} 
}
