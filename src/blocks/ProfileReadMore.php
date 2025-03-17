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
class ProfileReadMore extends \Govpack\Blocks\ProfileFieldText {

	public string $block_name = 'npe/profile-read-more';
	public $field_type        = 'block';
	

	public function block_build_path(): string {
		return $this->plugin->build_path( 'blocks/ProfileReadMore' );
	}

	public function show_block(): bool {
		return true;
	}
	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	public function handle_render( array $attributes, string $content, WP_Block $block ) {
		
		$tagName = 'div';
		
		$block_html = sprintf(
			'<%s %s>%s</%s>', 
			$tagName,
			get_block_wrapper_attributes(),
			$this->output(),
			$tagName
		);

		echo $block_html;
	}

	public function output(): string {

		// Great an array of html attributes for the link
		$link_attrs = [
			'target' => $this->attribute( 'linkTarget' ),
			'href'   => $this->get_profile()->permalink(),
		];

		if ( $this->attribute( 'rel' ) ) {
			$link_attrs['rel'] = $this->attribute( 'rel' );
		}

		$linkText = $this->attribute( 'linkText' );
		$prefix   = $this->attribute( 'prefixWithName' ) ? $this->get_profile()->value( 'name' ) : '';
		$suffix   = $this->attribute( 'suffixWithName' ) ? $this->get_profile()->value( 'name' ) : '';
		$linkText = trim( sprintf( '%s %s %s', $prefix, $linkText, $suffix ) );
		

		return sprintf( '<a %s>%s</a>', self::array_to_html_attributes( $link_attrs ), $linkText );
	}

	


	public function variations(): array {
		return [];
	}
}
