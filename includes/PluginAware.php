<?php

namespace Govpack;

trait PluginAware {
	/**
	 * Stores static instance of class.
	 *
	 * @access protected
	 * @var Govpack The single instance of the class
	 */
	protected Govpack $plugin;

	/**
	 * Returns static instance of class.
	 *
	 * @return Govpack
	 */
	public function plugin( ?Govpack $plugin = null ): Govpack {

		if ( $plugin ) {
			$this->plugin = $plugin;
		}
		
		return $this->plugin;
	}
}
