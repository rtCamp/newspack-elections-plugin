<?php 
namespace Govpack\Core;

use WP_Error;
use WP_REST_Request;


class Profile_Fields_Endpoint extends \Govpack\Core\Abstracts\Rest_Endpoint {


	public function schema(): array|null {
		
		return [
			'description' => 'Profile Fields',
			'readonly'    => true,
			'items'       => [
				'type'       => 'object',
				'properties' => [
					'slug'  => [
						'type' => 'string',
					],
					'label' => [
						'type' => 'string',
					],
				],
			],
			'context'     => [ 'view', 'edit', 'embed' ],
			
		];
	}

	public function callback( \WP_REST_Request $request ): \WP_REST_Response {

		return rest_ensure_response( [
			[
				'slug'  => 'name',
				'label' => 'Profile Fields',
				'ff'    => 'batr',
			]
		], );
		
	}

	public function validate( \WP_REST_Request $request ): WP_Error | bool {
		return true;
	}

	public function sanitize(string $value, WP_REST_Request $request, string $param): WP_Error|bool {
		return true;
	}

	public function permission( WP_REST_Request $request ): WP_Error|bool {
		return true;
	}

}
