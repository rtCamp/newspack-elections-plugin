<?php

namespace Govpack\Core;

trait Instance {
	/**
	 * Stores static instance of class.
	 *
	 * @access protected
	 */
	protected static $instance = null;

	/**
	 * Returns static instance of class.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
