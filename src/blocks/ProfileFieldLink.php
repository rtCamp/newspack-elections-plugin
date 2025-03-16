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

	public string $block_name = 'govpack/profile-field-link';
	public $field_type        = 'link';
	
	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileFieldLink' );
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



		$hasLabelOverride = ($this->attribute( 'linkTextOverride' ) && $this->attribute( 'linkTextOverride' ) );
		$hasDefaultLabel = (isset($link['linkText']) && $link['linkText']);
		$defaultLabel = $hasDefaultLabel ? $link['linkText'] : "Link";

		if($this->attribute("linkFormat") === "url"){
			return $link['url'];
		}

		if($this->attribute("linkFormat") === "label"){
			return ($hasLabelOverride ? $this->attribute( 'linkTextOverride' ) : $defaultLabel);
		}

		return	$defaultLabel;

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
