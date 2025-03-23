<?php

namespace Govpack\Fields\Field;

use Govpack\Fields\FieldType;
use Govpack\Fields\ProfileServiceRegistry;
use Govpack\Fields\Service as ProfileService;

class Service extends Link {

	protected ProfileService $service;

	public function __construct( string $slug, string $label, FieldType|string|null $type = null ) {
		parent::__construct( $slug, $label, 'service' );
	}

	public function set_service( string|ProfileService $service ): self {
		

		if ( is_a( $service, ProfileService::class ) ) {
			$this->service = $service;
		} elseif(class_exists($service)) {
			$this->service = new $service();
		} else {
			$services = ProfileServiceRegistry::instance();
			if($services->exists($service)){
				$this->service = $services->get($service);
			} else {
				// throw exception
			}

		}

		return $this;
	}

	
	public function to_array(): array {
		return [
			...parent::to_array(),
			'service' => $this->service->slug(),
		];
	}

	

	public function service(): ProfileService {
		return $this->service;
	}
}
