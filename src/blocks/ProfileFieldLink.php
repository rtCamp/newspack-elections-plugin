<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class ProfileFieldLink extends \Govpack\Blocks\ProfileFieldText {

	public string $block_name = 'npe/profile-field-link';
	public $field_type        = 'link';
	
	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileFieldLink' );
	}

	
	public function show_block(): bool {
		
		if ( empty( $this->get_value() ) ) {
			return false;
		}

		return true;
	}

	public function output(): string {
		
		$link = $this->get_value();
		if ( ! is_array( $link ) ) {
			return '';
		}

		
		return sprintf( '<a href="%s">%s</a>', $link['url'], $this->linkText() );
	}

	public function linkText(): string {
		$link = $this->get_value();

		$has_label_override = ( $this->attribute( 'linkTextOverride' ) && $this->attribute( 'linkTextOverride' ) );
		$has_default_label  = ( isset( $link['linkText'] ) && $link['linkText'] );
		$default_label      = $has_default_label ? $link['linkText'] : 'Link';

		if ( $this->attribute( 'linkFormat' ) === 'url' ) {
			return $link['url'] ?? '';
		}

		if ( $this->attribute( 'linkFormat' ) === 'label' ) {
			return ( $has_label_override ? $this->attribute( 'linkTextOverride' ) : $default_label );
		}

		if ( $this->attribute( 'linkFormat' ) === 'icon' ) {
			if ( is_a( $this->get_field(), 'Govpack\Fields\Field\Service' ) ) {
				return $this->get_field()->service()->icon();
			}
		}


		return $default_label;
	}

	public function variations(): array {
		return $this->create_field_variations();
	}

	public function create_field_variations(): array {

		$variations = [];
		
	

		foreach ( \Govpack\Profile\CPT::fields()->of_format( $this->field_type ) as $field ) {

			if ( ! $field->is_block_enabled() ) {
				continue;
			}

			$variation = [
				'category'    => 'govpack-profile-fields',
				'name'        => sprintf( 'profile-field-%s', $field->slug ),
				'title'       => $field->label,
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display Profile Field: %s' ),
					$field->label
				),
				'attributes'  => [
					'fieldType' => $field->type->slug,
					'fieldKey'  => $field->slug,
				],
				'isActive'    => [ 'fieldKey' ],
				'scope'       => [ 'inserter' ],
				'icon'        => $field->type->variation_icon(),
			];

			$variations[] = $variation;
		}

		return $variations;
	}
}
