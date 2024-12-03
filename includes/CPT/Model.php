<?php

namespace Govpack\CPT;

use WP_Post;

class Model {

	public WP_Post $post;

	public array $data;

	public function __construct(WP_Post $post) {
		$this->post = $post;
	}

	public static function get($id) {
		return new self(get_post($id));
	}

	public function data() {

		if(!isset($this->data)){
			$this->data = $this->populate();
		}

		return $this->data;
	}
	
	public function populate() : array {

		$data = [];
	
		foreach(Profile::fields()->all() as $field){
			$data[$field->slug()] = $field->get_model_value($this);
		}

		return $data;
	}


}