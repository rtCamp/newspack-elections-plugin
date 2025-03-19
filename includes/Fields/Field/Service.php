<?php

namespace Govpack\Fields\Field;

use Govpack\Fields\FieldType;
use Govpack\Fields\Service as ProfileSurface;

class Service extends Link {

	protected ProfileSurface $service;

	public function __construct( string $slug, string $label, FieldType|string|null $type = null ) {
		parent::__construct( $slug, $label, 'service' );
	}

	public function set_service( string|ProfileSurface $service ): self {

		if ( ! is_a( $service, ProfileSurface::class ) ) {
			$service = new $service();
		}

		$this->service = $service;

		return $this;
	}

	
	public function to_array(): array {
		return [
			...parent::to_array(),
			'icon' => $this->service->icon(),
		];
	}

	public function to_rest(): array {

		$data = parent::to_rest();
		if ( $data['icon'] ) {
			$data['icon'] = \esc_svg( $data['icon'] );
		}

		return $data;
	}

	public function service(): ProfileSurface {
		return $this->service;
	}
}
