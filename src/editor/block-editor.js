import { dispatch } from "@wordpress/data"

dispatch( 'core' ).addEntities( [ {
	baseURL: '/govpack/v1/profile',
	// The 'post' is not a post type - it's the "post" as in /post above. Also, "kind"
	// and "name" are not documented, so let's assume they form the above baseURL..
	kind: 'govpack',
	name: 'fields',
	label: 'Govpack Profile Fields',
} ] );