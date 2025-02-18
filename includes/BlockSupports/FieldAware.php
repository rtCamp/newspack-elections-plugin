<?php

namespace Govpack\BlockSupports;

use WP_Block_Supports;
use WP_Block_Type;

class FieldAware {

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

	public function get_attribute_name(): string {
		return array_keys( $this->get_attribute() )[0];
	}

	public function get_attribute(): array {
		return [
			'field' => [
				'type' => [
					'type'    => 'string',
					'default' => 'text',
				],
				'key'  => [
					'type' => 'string',
				],
			],
		];
	}

	

	public function full_name(): string {
		return sprintf( '%s/%s', $this->prefix(), $this->name() );
	}

	public function prefix(): string {
		return 'gp';
	}

	public function name(): string {
		return 'field-aware';
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

		if ( ! array_key_exists( $this->get_attribute_name(), $block_type->attributes ) ) {
			$block_type->attributes = array_merge( $block_type->attributes, $this->get_attribute() );
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

		$has_attribute = array_key_exists( 'field', $block_attributes );
		if ( ! $has_attribute ) {
			return [];
		}

		$has_type_attribute = array_key_exists( 'type', $block_attributes['field'] );
		$has_key_attribute  = array_key_exists( 'key', $block_attributes['field'] );

		$classes = [];

		if ( $has_type_attribute ) {
			$classes[] = sprintf( '%s--type-%s', wp_get_block_default_classname( $block_type->name ), $block_attributes['field']['type'] );
		}

		if ( $has_key_attribute ) {
			$classes[] = sprintf( '%s--key-%s', wp_get_block_default_classname( $block_type->name ), $block_attributes['field']['key'] );
		}

		$attrs = [ 'class' => implode( ' ', $classes ) ];
		return $attrs;
	}
}
