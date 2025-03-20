<?php

namespace Govpack\Fields\Field;

use Govpack\Fields\FieldType;
use Govpack\Fields\Service as ProfileService;

class Service extends Link {

	protected ProfileService $service;

	public function __construct( string $slug, string $label, FieldType|string|null $type = null ) {
		parent::__construct( $slug, $label, 'service' );
	}

	public function set_service( string|ProfileService $service ): self {

		if ( ! is_a( $service, ProfileService::class ) ) {
			$service = new $service();
		}

		$this->service = $service;

		return $this;
	}

	
	public function to_array(): array {
		return [
			...parent::to_array(),
			'service' => $this->service->slug(),
		];
	}

	

	public function service(): ProfileSurface {
		return $this->service;
	}
}
