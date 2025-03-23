<?php

namespace Govpack;

use Govpack\Fields\FieldTypeRegistry;
use Govpack\Fields\FieldType;
use Govpack\Fields\FieldManager;
use Govpack\Fields\FieldType\Service;
use Govpack\Fields\ProfileServiceRegistry;

class Fields {

	private FieldTypeRegistry $types;
	private ProfileServiceRegistry $services;
	
	public function __construct() {
		$this->types = FieldTypeRegistry::instance();
		$this->register_field_types();

		$this->services = ProfileServiceRegistry::instance();
		$this->register_services();
	}

	public function register_field_types(): void {

		$types = [
			FieldType\Text::class,
			FieldType\Date::class,
			FieldType\Link::class,
			FieldType\Email::class,
			FieldType\Phone::class,
			FieldType\Service::class,
			FieldType\Taxonomy::class,
			FieldType\PostProperty::class,
		];

		foreach ( $types as $type ) {
			$this->types->register( new $type() );
		}
	}

	public function register_services(): void {

		$services = [
			'facebook' => 'Facebook',
			'instagram' => 'Instagram',
			'twitter' => 'Twitter',
			'x' => 'X',
			'youtube' => 'YouTube',

			'ballotpedia' => "Ballotpedia",
			'fec' => "FEC",
			'gab' =>  "Gab",
			'google' => "Google",
			'govtrack' => "GovTrack",
			'linkedin' => "Linkedin",
			'open-secrets' => "OpenSecrets",
			'open-states' => "OpenStates",
			'rumble' => "Rumble",
			'vote-smart' => "VoteSmart",
			'vote-view' => "VoteView",
			'wikipedia' => "Wikipedia"
		];


		foreach ( $services as $slug => $label ) {
			$this->services->register( new Fields\Service($slug, $label) );
		}
	}

	public function services(): ProfileServiceRegistry {
		return $this->services;
	}

	public function types(): FieldTypeRegistry {
		return $this->types;
	}

	public function create_field_set(): FieldManager {
		return new FieldManager();
	}
}
