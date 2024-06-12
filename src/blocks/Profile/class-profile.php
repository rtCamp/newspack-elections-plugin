<?php
/**
 * Govpack
 *
 * @package Govpack
 */

namespace Govpack\Blocks\Profile;

use WP_Block;

defined( 'ABSPATH' ) || exit;

/**
 * Register and handle the block.
 */
class Profile extends \Govpack\Core\Abstracts\Block {

	public $block_name = "govpack/profile";
	public $template = "profile";

	private $show = null;
	private $profile = null;
	private $attributes = [];

	public function disable_block( $allowed_blocks, $editor_context ){
		return false;
	}


	public function block_build_path() : string {
		return trailingslashit(GOVPACK_PLUGIN_BUILD_PATH . 'blocks/Profile');
	}
	
	

	/**
	 * Shortcode handler for [govpack].
	 *
	 * @param array  $attributes    Array of shortcode attributes.
	 * @param string $content Post content.
	 * @param WP_Block $block Reference to the block being rendered .
	 *
	 * @return string HTML for the block.
	 */
	public function render( array $attributes, ?string $content = null, ?WP_Block $block = null ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable

		if ( ! $attributes['profileId'] ) {
			return;
		}

		if ( \is_admin() ) {
			return false;
		}


		return $this->handle_render( $attributes, $content, $block );
	}

	/**
	 * Loads a block from display on the frontend/via render.
	 *
	 * @param array  $attributes array of block attributes.
	 * @param string $content Any HTML or content redurned form the block.
	 * @param WP_Block $template The filename of the template-part to use.
	 */
	public function handle_render(array $attributes, string $content, WP_Block $block ) {

		
		
		$this->profile = \Govpack\Core\CPT\Profile::get_data( $attributes['profileId'] );
	
		if ( ! $this->profile ) {
			return;
		}

		$this->enqueue_view_assets();

		$this->attributes = self::merge_attributes_with_block_defaults( $this->block_name, $attributes );
		return gp_template_loader()->render_block(
			$this->template(),
			$this->attributes, 
			$content, 
			$block, 
			[
				"profile_block" => $this,
				"profile_data" => $this->profile
			] 
		);

	}	

	public function populate_show(){
		return [
			"photo" => ( has_post_thumbnail( $this->profile['id'] ) && $this->attributes['showAvatar'] ),
			"name" => ( isset( $this->profile['name'] ) && $this->attributes['showName'] ),
			"status_tag" => ( isset( $this->profile['status'] ) && $this->attributes['showStatusTag'] ),
			"secondary_address" => ( isset( $this->profile['address']['secondary'] ) &&  ( $this->profile['address']['secondary'] !== $this->profile['address']['default'] ) ),
			"social" => ($this->attributes['showSocial'] && $this->profile['hasSocial']),
			"bio" => ($this->attributes['showBio'] && $this->profile['bio']),
			"labels" => (isset( $this->attributes['showLabels'] ) && ($this->attributes['showLabels']) ),
			"links" => $this->should_show_links()
		];
	}

	private function should_show_Links(){
		if(isset($this->attributes['showOtherLinks'])){
			return $this->attributes['showOtherLinks'];
		}
	
		if(!isset($this->profile['links']) || empty($this->profile['links'])){
			return false;
		}
	
		if(
			(!isset($this->attributes['selectedLinks'])) ||
			(empty($this->profile['selectedLinks']))
		){
			return true;
		}
	
		return false;
	}

	public function rows(){

		$rows = [ 
			[
				"key" => "age",
				"value" => esc_html($this->profile["age"]),
				"label" => "Age",
				"shouldShow" => $this->attributes["showAge"]
			],
			[
				"key" => "leg_body",
				"value" => esc_html($this->profile["legislative_body"]),
				"label" => "Legislative Body",
				"shouldShow" => $this->attributes["showLegislativeBody"]
			],
			[
				"key" => "position",
				"value" => esc_html($this->profile["position"]),
				"label" => "Position",
				"shouldShow" => $this->attributes["showPosition"]
			],
			[
				"key" => "party",
				"value" => esc_html($this->profile["party"]),
				"label" => "Party",
				"shouldShow" => $this->attributes["showParty"]
			],
			[
				"key" => "district",
				"value" => esc_html($this->profile["district"]),
				"label" => "District",
				"shouldShow" => $this->attributes["showDistrict"]
			],
			[
				"key" => "state",
				"value" => esc_html($this->profile["state"]),
				"label" => "State",
				"shouldShow" => $this->attributes["showState"]
			],
			[
				"key" => "status",
				"value" => esc_html($this->profile["status"]),
				"label" => "Status",
				"shouldShow" => $this->attributes["showDistrict"]
			],
			[
				"key" => "social",
				"value" => gp_social_media( $this->profile, $this->attributes ),
				"label" => "Social Media",
				"shouldShow" => $this->show("social")
			],
			[
				"key" => "comms_capitol",
				"value" => gp_contact_info( 'Capitol', $this->profile['comms']['capitol'], $this->attributes['selectedCapitolCommunicationDetails'] ),
				"label" => "Contact Info (Capitol)",
				"shouldShow" => $this->attributes["showCapitolCommunicationDetails"]
			],
			[
				"key" => "comms_district",
				"value" => gp_contact_info( 'District', $this->profile['comms']['district'], $this->attributes['selectedDistrictCommunicationDetails'] ),
				"label" => "Contact Info (District)",
				"shouldShow" => $this->attributes["showDistrictCommunicationDetails"]
			],
			[
				"key" => "comms_campaign",
				"value" => gp_contact_info( 'Campaign', $this->profile['comms']['campaign'], $this->attributes['selectedCampaignCommunicationDetails'] ),
				"label" => "Contact Info (Campaign)",
				"shouldShow" => $this->attributes["showCampaignCommunicationDetails"]
			],
			[
				"key" => "comms_other",
				"value" => gp_contact_other( 'Other', $this->profile['comms']['other'], $this->attributes['selectedOtherCommunicationDetails'] ),
				"label" => "Contact Info (Campaign)",
				"shouldShow" => $this->attributes["showOtherCommunicationDetails"]
			],
			[
				"key" => "more_about",
				"value" => gp_maybe_link( sprintf('More About %s', $this->profile['name']['name']), $this->profile['link'], isset($this->attributes['showProfileLink']) && $this->attributes['showProfileLink']),
				"shouldShow" => (isset($this->attributes['showProfileLink']) && $this->attributes['showProfileLink'])
			],
			[
				"key" => "links",
				"value" => gp_the_profile_links($this->profile, $this->attributes),
				"shouldShow" => $this->show("links")
			]
		];

		return $rows;
	}

	public function show($key){

		if($this->show === null){
			$this->show = $this->populate_show();
		}

		if(!isset($this->show[$key])){
			return false;
		}

		return $this->show[$key];
	}

	public function template() : string {
		return sprintf("blocks/%s", $this->template);
	}

}
