<?php 
namespace Govpack;

class RestField {

	public string $object_type;

	public string $attribute;

	protected mixed $schema;
	
	public function __construct() {
	}

	public function type( string $type ): self {
		$this->object_type = $type;
		return $this;
	}

	public function attribute( string $attribute ): self {
		$this->attribute = $attribute;
		return $this;
	}
	
	public function register(): void {

		register_rest_field(
			$this->object_type,
			$this->attribute,
			$this->args()
		);
	}

	public function args(): array {

		$args = [
			'get_callback'    => $this->callback( 'get_callback' ),
			'update_callback' => $this->callback( 'update_callback' ),
			'schema'          => $this->schema(),
		];


		return $args;
	}

	private function in_allowed_callbacks( string $callback ): bool {

		$allowed_callback_names = [
			'get_callback', 
			'update_callback',
		];

		return in_array( $callback, $allowed_callback_names, true );
	}

	public function callback( string $callback ) {

		if ( ! $this->in_allowed_callbacks( $callback ) ) {
			return null;
		}

		if ( ! method_exists( $this, $callback ) ) {
			return null;
		}

		return [ $this, $callback ];
	}

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

	public function get_callback( $response, $field_name, $request, $object_type ): mixed {
		return [ 
			[
				'slug'  => 'name',
				'label' => 'Profile Name',
				'ff'    => 'batr',
			],
		];
	}
}
