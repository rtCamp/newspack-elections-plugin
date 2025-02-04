<?php

namespace Govpack\BlockSupports;

use WP_Block_Supports;
use WP_Block_Type;

class FieldTypeClasses {

	public static function register() {

		$self = new static();
		WP_Block_Supports::get_instance()->register(
			$self->full_name(),
			[
				'register_attribute' => [ $self, 'attributes' ],
				'apply'              => [ $self, 'apply' ],
			]
		);
	}

	public function full_name(): string {
		return sprintf( '%s/%s', $this->prefix(), $this->name() );
	}

	public function prefix(): string {
		return 'gp';
	}

	public function name(): string {
		return 'field-type-classes';
	}

	public function is_supported_by_block_type( WP_Block_Type $block_type ): bool {
		return block_has_support( $block_type, $this->full_name() );
	}

	/**
	 * Registers the example attribute for block types that support it.
	 *
	 * @param WP_Block_Type $block_type Block Type.
	 */
	function attributes( WP_Block_Type $block_type ) {
		
		if ( ! $this->is_supported_by_block_type( $block_type ) ) {
			return [];
		}

		if ( ! $block_type->attributes ) {
			$block_type->attributes = [];
		}

		if ( ! array_key_exists( 'fieldType', $block_type->attributes ) ) {
			$block_type->attributes['fieldType'] = [
				'type' => 'string',
			];
		}
	}

	/**
	 * Add the example attribute to the output.
	 *
	 * @param WP_Block_Type $block_type Block Type.
	 * @param array         $block_attributes Block attributes.
	 *
	 * @return array Block example.
	 */
	public function apply( WP_Block_Type $block_type, array $block_attributes ): array {

		if ( ! $block_attributes ) {
			return [];
		}

		if ( ! $this->is_supported_by_block_type( $block_type ) ) {
			return [];
		}

		$has_attribute = array_key_exists( 'fieldType', $block_attributes );
		if ( ! $has_attribute ) {
			return [];
		}

		$class = [ 'class' => sprintf( '%s--type-%s', wp_get_block_default_classname( $block_type->name ), $block_attributes['fieldType'] ) ];
		return $class;
	}
}
