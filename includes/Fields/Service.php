<?php

namespace Govpack\Fields;

abstract class Service {

	protected string $slug;

	protected string $icon_slug;

	public function icon(): string|null {

		$plugin = \Govpack\Govpack::instance();
		$icon   = $plugin->icons()->get( $this->get_icon_slug() );

		if ( $icon === '' ) {
			return null;
		}

		return $icon;
	}

	public function get_icon_slug(): string {
		return isset( $this->icon_slug ) ? $this->icon_slug : $this->slug;
	}

	public function slug(): string {
		return $this->slug;
	}
}
