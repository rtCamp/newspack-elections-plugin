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
class ProfileSocialLink extends \Govpack\Blocks\ProfileFieldText {

	public string $block_name = 'npe/profile-social-link';
	public $field_type        = 'service';
	
	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileSocialLink' );
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

		$hasLabelOverride = ( $this->attribute( 'linkTextOverride' ) && $this->attribute( 'linkTextOverride' ) );
		$hasDefaultLabel  = ( isset( $link['linkText'] ) && $link['linkText'] );
		$defaultLabel     = $hasDefaultLabel ? $link['linkText'] : 'Link';

		if ( $this->attribute( 'linkFormat' ) === 'url' ) {
			return $link['url'] ?? '';
		}

		if ( $this->attribute( 'linkFormat' ) === 'label' ) {
			return ( $hasLabelOverride ? $this->attribute( 'linkTextOverride' ) : $defaultLabel );
		}

		if ( $this->attribute( 'linkFormat' ) === 'icon' ) {
			if ( is_a( $this->get_field(), 'Govpack\Fields\Field\Service' ) ) {
				return $this->get_field()->service()->icon();
			}
		}


		return $defaultLabel;
	}

	public function variations(): array {
		//return $this->create_field_variations();
		return [];
	}

	public function create_field_variations(): array {

		$variations = [];
		

		foreach ( \Govpack\Profile\CPT::fields()->of_type( $this->field_type ) as $field ) {

			if ( ! $field->is_block_enabled() ) {
				continue;
			}

			$variation = [
				'category'    => 'newspack-elections-profile-row-fields',
				'name'        => sprintf( 'profile-field-service-%s', $field->slug ),
				'title'       => $field->label,
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display Profile Social media Field: %s' ),
					$field->label
				),
				'attributes'  => [
					'field' => [ 
						'type' => $field->type->slug,
						'key'  => $field->slug,
					],
				],
				'isActive'    => [ 'field.type', 'field.key' ],
				'scope'       => [ 'inserter' ],
				'icon'        => $field->type->variation_icon(),
			];

			$variations[] = $variation;
		}

	
		return $variations;
	}
}
